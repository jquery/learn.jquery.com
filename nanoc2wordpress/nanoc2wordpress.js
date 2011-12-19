var config = require("./config"),

  exec = require( "child_process" ).exec,
  Futures = require( "futures" ),
  jsdom = require( "jsdom" ),
  _ = require( "underscore" ),
  mysql = new require( "mysql" ).createClient(),

  articles = [],
  categories = [],
  category_map = {},

  OUTPUT_DIR = config.git_dir + "/output",
  META_REGEX = /<script id="nanoc_meta".*<\/script>(\\n)*/;

  mysql.user = config.db_user;
  mysql.password = config.db_password;
  mysql.useDatabase( config.db_name );

  _.mixin(require('underscore.string').exports());

Futures.sequence()
//  .then( git_pull )
//  .then( nanoc_compile );
  .then( find_files )
  .then( truncate_data )
  .then( process_categories )
  .then( create_categories )
  .then( process_articles )
  .then( create_articles );

function git_pull( next ) {
  console.log( "Doing 'git pull' in '" + config.config.git_dir + "'" );
  exec( "git pull", { cwd: config.config.git_dir }, function( error, stdout, stderr ) {
    console.log( stdout );
    if ( error !== null ) {
      console.error( error );
      process.exit( error.code );
    }
    next();
  });
}

function nanoc_compile( next ) {
  console.log( "Doing 'nanoc compile' in '" + config.git_dir + "'" );
  exec( "nanoc compile", { cwd: config.git_dir }, function( error, stdout, stderr ) {
    console.log( stdout );
    if ( error !== null ) {
      console.error( error );
      process.exit( error.code );
    }
    next();
  });
}
function find_files( next ) {
  var finder = require( "findit" ).find( OUTPUT_DIR );

  finder.on( "file", function( file ) {
    var locPath = file.replace( OUTPUT_DIR, "" ),
    chunkedPath = locPath.split("/"),
    isHome = chunkedPath.length == 2, 
    isCategory = chunkedPath.length == 3;
    if ( isHome ) {
      // TODO: Deal with home page
    } else if ( isCategory ) {
      categories.push({ path: file })
    } else if ( locPath.indexOf("/assets/") !=0 ) {
      articles.push({ path: file });
    }
  });

  finder.on( "end", next );
}

function process_categories( next ) {
  var fs = require( "fs" ),
    join = Futures.join();

  categories.forEach(function( cat ) {
    var future = Futures.future(),
        contents = fs.readFileSync( cat.path, "utf8" );

      join.add( future );
      jsdom.env( contents, function(errors, win) {
        var meta = win.document.getElementById('nanoc_meta');
        if (meta) {
          try {
            _.extend( cat, JSON.parse(meta.textContent) )
            cat.contents = _.trim(contents.replace( META_REGEX, ""));
            future.deliver( cat );
          } catch (excp) {
            future.deliver( excp );
          }
        }
      });
  });
  console.log("Categories processed");
  join.when( next );
}

function truncate_data( next ) {
  Futures.sequence()
    .then(function(n) {
      console.log("Clearing categories");
      mysql.query( 'truncate table wp_' + config.site_id + '_terms', n );
    })
    .then(function(n) {
      console.log("Clearing category taxonomies");
      mysql.query( 'truncate table wp_' + config.site_id + '_term_taxonomy', n );
    })
    .then(function(n) {
      console.log("Clearing posts")
      mysql.query( 'truncate table wp_' + config.site_id + '_posts', n );
    })
    .then(function(n) {
      console.log("Clearing post-category relationships");
      mysql.query( 'truncate table wp_' + config.site_id + '_term_relationships', next );
    });
}
function create_categories( next ) {
  var join = Futures.join();

  categories.forEach(function( cat ) {
    console.log("Creating category:", cat.title);
    var defer = join.add();
    Futures.sequence()
      .then(function( next, err, results, fields ) {
        mysql.query( 'INSERT INTO wp_' + config.site_id + '_terms (name, slug) '
          + ' VALUES (?, ?)',
          [ cat.title, cat.chapter ],
          next);
      })
      .then(function( next, err, results, fields ) {
        var id = results.insertId || results[0].id;

        if ( !id ) { return defer(); }

        mysql.query( 'INSERT INTO wp_' + config.site_id + '_term_taxonomy (term_id, description, taxonomy) '
          + ' VALUES (?, ?, "category")',
          [ id, cat.contents],
          next);
      })
      .then(function( next, err, results, fields ) {
        var id = results.insertId || results[0].id;

        if ( !id ) { return defer(); }
        category_map[ cat.chapter ] = id;
        defer();
      });
  });

  join.when(function() {
    next();
  });
}

function process_articles( next ) {
  var fs = require( "fs" ),
    join = Futures.join();

  articles.forEach(function( file ) {
    var filename_ext = file.path.split( "/" ).slice( -1 )[ 0 ],
      filename = file.path.replace( OUTPUT_DIR, "" ),
      future = Futures.future(),
      contents = fs.readFileSync( file.path, "utf8" );

      join.add( future );
      jsdom.env( contents, function(errors, win) {
        var meta = win.document.getElementById('nanoc_meta');
        if (meta) {
          try {
            _.extend( file, JSON.parse(meta.textContent) )
            file.contents = _.trim(contents.replace( META_REGEX, ""));
            file.slug = filename.replace( "/"+file.chapter+ "/", "").replace("/index.html", "");
            exec( "git log -1 --format=%ci " + file.path, { cwd: config.git_dir }, function( error, stdout, stderr ) {
              file.commitdate = stdout.split( "\n" )[ 0 ] || (new Date()).toISOString();
              next();
            });
          } catch (excp) {
            future.deliver( excp );
          }
        }
      });
  });

  join.when( next );
}

function create_articles( next ) {
  var join = Futures.join();

  articles.forEach(function( file ) {
    console.log("Processing into MySQL: ", file.title)
    var defer = join.add();
    Futures.sequence()
      .then(function( next ) {
        mysql.query( 'INSERT INTO wp_' + config.site_id + '_posts (post_author, post_title, post_name, comment_status, ping_status) '
          + ' VALUES (?, ?, ?, "closed", "closed")',
          [ 1, file.title, file.slug ],
          next);
      })
      .then(function( next, err, results, fields ) {
        if (err) {
          console.log("---Insert failed for", file.title, " :", err);
          return defer();
        }
        var id = results.insertId || results[0].id,
          guid = "http://" + config.host_name + "/?p=" + id;

          if ( !id ) { 
            return defer();
          }
          file.post_id = id;
//          console.log("---Insert succeeded, updating with content");

        mysql.query( 'UPDATE wp_' + config.site_id + '_posts SET `post_title`=?, `post_modified`=?, `post_modified_gmt`=?, '
          + '`post_date`=?, `post_date_gmt`=?,'
          + '`post_content`=?, `guid`=? WHERE id=?',
          [ file.title, file.commitdate, file.commitdate, file.commitdate, file.commitdate, file.contents, guid, id ],
          next);
      })
      .then(function( next, err, results, fields){
//        console.log("---Update succeeded, setting category information");
        mysql.query( 'INSERT INTO wp_' + config.site_id + '_term_relationships (object_id, term_taxonomy_id)'
          + ' VALUES (?, ?)',
          [ file.post_id, category_map[file.chapter] ],
          defer);
      });
  });

  join.when(function() {
    mysql.end();
    next();
  });
}
