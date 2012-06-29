var cp = require("child_process");

module.exports = function( grunt ) {

grunt.loadNpmTasks( "grunt-clean" );
grunt.loadNpmTasks( "grunt-html" );
grunt.loadNpmTasks( "grunt-wordpress" );
grunt.loadNpmTasks( "grunt-jquery-content" );

grunt.registerTask( "nanoc-compile", "compiles nanoc", function () {
	console.log( "Doing 'nanoc compile' in '" + __dirname + "'" );
	var done = this.async();
	cp.exec( "nanoc compile",  function( error, stdout, stderr ) {
		console.log( stdout );
		if ( error !== null ) {
			console.error( error );
			process.exit( error.code );
		}
		done();
	});
});

grunt.initConfig({
	clean: {
		folder: "dist/"
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
	}, grunt.file.readJSON( "config.json" ) )
});

grunt.registerTask( "default", "lint" );
grunt.registerTask( "build-wordpress", "clean lint nanoc-compile build-pages build-resources");
grunt.registerTask( "deploy", "wordpress-deploy" );

};
