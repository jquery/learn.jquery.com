var cp = require("child_process");
var config = require("./config.json");

module.exports = function( grunt ) {

grunt.loadNpmTasks( "grunt-clean" );
grunt.loadNpmTasks( "grunt-html" );
grunt.loadNpmTasks( "grunt-wordpress" );
grunt.loadNpmTasks( "grunt-jquery-content" );
grunt.loadNpmTasks( "grunt-wintersmith" );

grunt.initConfig({
	clean: {
		wordpress: "dist/",
		wintersmith: "page/"
	},
	htmllint: {
		resources: "resources/*.html"
	},
	jshint: {
		options: {
			undef: true,
			node: true
		}
	},
	lint: {
		grunt: "grunt.js"
	},
	watch: {
		pages: {
			files: "page/**/*.html",
			tasks: "deploy"
		}
	},
	"build-pages": {
		all: grunt.file.expandFiles( "page/**/*.html" )
	},
	"build-resources": {
		all: grunt.file.expandFiles( "resources/**/*" )
	},
	wordpress: grunt.utils._.extend({
		dir: "dist/wordpress"
        }, grunt.file.readJSON( "config.json" ) ),

        wintersmith: config
});

grunt.registerTask( "default", "wordpress-deploy" );
grunt.registerTask( "build-wordpress", "clean lint wintersmith build-pages build-resources");
grunt.registerTask( "deploy", "wordpress-deploy" );

};
