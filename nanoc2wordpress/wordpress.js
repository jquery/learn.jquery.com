var mysql = require("mysql"),
Step = require("step"),
config = require("./config");

var db, postIds = {}, categoryMap = {}, 
optionsTable = table("options"),
postmetaTable = table("postmeta"),
postsTable = table("posts"),
termsTable = table("terms"),
termRelationshipsTable = table("term_relationships"),
termTaxonomyTable = table("term_taxonomy");

function table(name) {
  return "wp_" + (config.site_id ? config.site_id + "_": "") + name;
}

// TODO: handle connection error
function connect() {
  db = new mysql.createClient({
    host: config.db_host,
    port: config.db_port,
    user: config.db_user,
    password: config.db_password,
    database: config.db_name
  });
}

function auto(fn) {
  return function() {
    if (!db) {
      connect();
    }
    fn.apply(this, arguments);
  };
}

var wordpress = module.exports = {
  createPages: auto(function( pages, continuation ) {
    Step(
    function(){
      var group = this.group();
      pages.forEach(function( page, index ) {
        wordpress.createPage( page, group() )
      });
    },
    function(){
      continuation();
    })
  }),
  createPage: auto(function( page, continuation ) {
    Step(
    function createPost() {
      var date = page.date,
      localDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
      gmtDate = date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + date.getUTCDate() + " " + date.getUTCHours() + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds();
      db.query(
        "INSERT INTO `" + postsTable + "` " + "SET `post_type` = 'page', `post_author` = ?, `post_name` = ?, `post_title` = ?, `post_content` = ?, " + "`post_date` = ?, `post_date_gmt` = ?, `post_modified` = ?, `post_modified_gmt` = ?, `comment_status` = ?, `ping_status` = ?",
        [1, page.slug, page.title, page.contents, localDate, gmtDate, localDate, gmtDate, "closed", "closed"],
        this
      );
    },
    function(error, info) {
        if (error) {
          throw error;
        }

        page.id = info.insertId;
        postIds[page.slug] = info.insertId;
        var guid = "http://" + config.host_name + "/?p=" + page.id;
        db.query(
         "UPDATE " + postsTable + " SET `guid`=? WHERE id=?",
          [ guid, page.id ],
          this
        );

    },
    function setTerm(error, info) {
        if (error) {
          throw error;
        }

        db.query(
          "INSERT INTO `" + termRelationshipsTable + "` " + "SET `object_id` = ?, `term_taxonomy_id` = ?",
          [ page.id, categoryMap[page.chapter] ],
          this
        );
    },
    function(error) {
      if (error) {
        throw error;
      }

      continuation(null);
    })
  }),
  createTerms: auto(function( terms, continuation) {
    Step(
    function(){
      var group = this.group();
      terms.forEach(function( term, index ) {
        wordpress.createTerm( term, group() )
      });
    },
    function(){
      continuation();
    })
  }),
  createTerm: auto(function(term, fn) {
    Step(
    function() {
      db.query("INSERT INTO `" + termsTable + "` SET `name` = ?, `slug` = ? " + "ON DUPLICATE KEY UPDATE `term_id` = LAST_INSERT_ID(`term_id`)", [term.title, term.chapter], this);
    },

    function(error, info) {
      if (error) {
        throw error;
      }

      db.query("INSERT INTO `" + termTaxonomyTable + "` " + "SET `term_id` = ?, `description` = ?, `taxonomy` = 'category' " + "ON DUPLICATE KEY UPDATE `term_taxonomy_id` = LAST_INSERT_ID(`term_taxonomy_id`)", [info.insertId, term.contents], this);
    },

    function(error, info) {
      if (error) {
        throw error;
      }

      categoryMap[ term.chapter ] = info.insertId;
      fn(null, info.insertId);
    });
  }),

  flush: auto(function(fn) {
    db.query("DELETE FROM `" + optionsTable + "` WHERE `option_name` = 'rewrite_rules'", fn);
  }),

  end: function() {
    if (db) {
      db.end();
      db = null;
    }
  },

  reset: auto(function(fn) {
    Step(
    function() {
      var parallel = this.parallel;
      [postmetaTable, postsTable, termsTable, termRelationshipsTable, termTaxonomyTable].forEach(function(table) {
        db.query("TRUNCATE TABLE `" + table + "`", parallel());
      });
      wordpress.flush(parallel());
    },

    function(error) {
      wordpress.end();
      fn(error);
    });
  })
};

