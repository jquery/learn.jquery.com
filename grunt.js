var cp = require("child_process");
var config = require("./config.json");

module.exports = function( grunt ) {

grunt.loadNpmTasks( "grunt-clean" );
grunt.loadNpmTasks( "grunt-html" );
grunt.loadNpmTasks( "grunt-wordpress" );
grunt.loadNpmTasks( "grunt-jquery-content" );

grunt.initConfig({
	clean: {
		wordpress: "dist/"
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
			files: "content/**",
			tasks: "deploy"
		}
	},
	"build-pages": {
		all: grunt.file.expandFiles( "content/**" )
	},
	"build-resources": {
		all: grunt.file.expandFiles( "resources/**/*" )
	},
	wordpress: grunt.utils._.extend({
		dir: "dist/wordpress"
        }, grunt.file.readJSON( "config.json" ) )
});

grunt.registerTask( "default", "wordpress-deploy" );
grunt.registerTask( "build-wordpress", "clean lint build-pages build-resources");
grunt.registerTask( "deploy", "wordpress-deploy" );

};
