var Step = require("step"),
cp = require( "child_process" )
exec = cp.exec,
spawn = cp.spawn,
fs = require("fs"),
jsdom = require( "jsdom" ),
_ = require( "underscore" ),
config = require("./config"),

OUTPUT_DIR = config.git_dir + "/output",
META_REGEX = /<script id="nanoc_meta".*<\/script>(\\n)*/,

site = {
  articles: [],
  categories: []
};

_.mixin(require('underscore.string').exports());

function compile( continuation ) {
  console.log( "Doing 'nanoc compile' in '" + config.git_dir + "'" );
  exec( "nanoc compile", { cwd: config.git_dir }, function( error, stdout, stderr ) {
    console.log( stdout );
    if ( error !== null ) {
      console.error( error );
      process.exit( error.code );
    }
    continuation( error, stdout );
  });
}

function findFiles( continuation ) {
  var finder = require( "findit" ).find( OUTPUT_DIR ),
  ts = new Date();

  finder.on( "file", function( file ) {
    var locPath = file.replace( OUTPUT_DIR, "" ),
    chunkedPath = locPath.split("/"),
    isHome = chunkedPath.length == 2, 
    isCategory = chunkedPath.length == 3;
    if ( isHome ) {
      // TODO: Deal with home page
    } else if ( isCategory ) {
      site.categories.push({ path: file, isCategory: true, date: ts })
    } else if ( locPath.indexOf("/assets/") !=0 ) {
      site.articles.push({ path: file, isCategory: false, date: ts });
    }
  });

  finder.on( "end", continuation );
}

function processCategories( continuation ) {

  Step(
  function() {
    var group = this.group();
    site.categories.forEach(function( cat ) {
      cat.contents = fs.readFileSync( cat.path, "utf8" );
      jsdom.env( cat.contents, group() );
    });
  },
  function ( err, windows ) {
    windows.forEach( function(win, index) {
      var meta = win.document.getElementById('nanoc_meta'),
      cat = site.categories[ index ];
      if (meta) {
        _.extend( cat, JSON.parse(meta.textContent) )
        cat.contents = _.trim(cat.contents.replace( META_REGEX, ""));
        cat.slug = cat.chapter;
      }
    });
    continuation();
  });
}

function processArticles( continuation ) {
  Step(
  function readFiles() {
    var group = this.group();
    site.articles.forEach(function( file ) {
      var filename_ext = file.path.split( "/" ).slice( -1 )[ 0 ];
      
      file.filename = file.path.replace( OUTPUT_DIR, "" ),
      file.contents = fs.readFileSync( file.path, "utf8" );

      jsdom.env( file.contents, group() );
    });
  },
  function processMeta(err, windows) {
    windows.forEach( function(win, index) {
      var meta = win.document.getElementById('nanoc_meta'),
      file = site.articles[ index ];
      if (meta) {
        _.extend( file, JSON.parse(meta.textContent) )
        file.contents = _.trim(file.contents.replace( META_REGEX, ""));
        file.slug = file.filename.replace( "/"+file.chapter+ "/", "").replace("/index.html", "");
      }
    });
    continuation();
  });
}

var nanoc = module.exports = {
  compile: function( continuation ) {
    console.log( "Doing 'nanoc compile' in '" + config.git_dir + "'" );
    exec( "nanoc compile", { cwd: config.git_dir }, function( error, stdout, stderr ) {
      console.log( stdout );
      if ( error !== null ) {
        console.error( error );
        process.exit( error.code );
      }
      continuation( error, stdout );
    });
  },
  process: function( continuation ) {
    Step(
    function() {
      findFiles( this );
    },
    function() {
      processCategories( this );
    },
    function() {
      processArticles( this );
    },
    function() {
     continuation( null, site );
    })
  }
};
