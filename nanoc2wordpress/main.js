#!/usr/bin/env node

var Step = require("step"),
exec = require( "child_process" ).exec,
UserError = require("./user-error"),
wordpress = require("./wordpress"),
nanoc = require("./nanoc"),
config = require("./config"),
options = require("optimist").default({ compile: true, pull: true }).argv,
site;

process.on( "uncaughtException", function( error ) {
  // TODO: log error to file
  console.error( "uncaught exception" );
  console.error( error );
  console.error( error.stack );
  process.exit();
});

function gitPull( continuation ) {
  console.log( "Doing 'git pull' in '" + config.git_dir + "'" );
  exec( "git pull", { cwd: config.config.git_dir }, function( error, stdout, stderr ) {
    console.log(error, stdout, stderr)
    if ( error !== null ) {
      console.error( error );
      process.exit( error.code );
    }
    continuation();
  });
}

function processSite( finish ) {
	Step(
    // Step 1: Optionally do a git pull
	function() {
    options.pull ? gitPull( this ) : this();
	},
  // Step 2: Optionally compile the site with nanoc
	function() {
		options.compile ? nanoc.compile( this ) : this();
  },
  // Step 3: Process the nanoc output into a data structure
  function() {
    nanoc.process( this );
  },
  // Step 4: Save processed data and truncate wordpress tables
  function( err, data ) {
    site = data;
    console.log( "Truncating wordpress tables" )
    wordpress.reset( this );
  },
  // Step 5: Create Wordpress Taxonomy
  function() {
    console.log( "Creating WordPress Taxonomy" )
    wordpress.createTerms( site.categories, this )
  },
  // Step 6: Create articles in WordPress
  function(){
    console.log( "Creating WordPress Pages" );
    wordpress.createPages( site.articles, this )
  },
  // Step 7: Flush WordPress rewrite rules
  function(){
    console.log( "Flushing WordPress rewrites" )
    wordpress.flush( this )
  },
  function(){
    finish();
  })
}

processSite(function(error, data) {
	wordpress.end()
  console.log("All done!");
	// TODO: log error to file
	if (error) {
		console.log(error, error.stack);
	}
  process.exit();
});

