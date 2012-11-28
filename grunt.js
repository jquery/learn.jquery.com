var yaml = require( "js-yaml" ),
	config = require("./config.json");

module.exports = function( grunt ) {

"use strict";

grunt.loadNpmTasks( "grunt-clean" );
grunt.loadNpmTasks( "grunt-html" );
grunt.loadNpmTasks( "grunt-wordpress" );
grunt.loadNpmTasks( "grunt-jquery-content" );
grunt.loadNpmTasks( "grunt-check-modules" );

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
			files: "page/**",
			tasks: "deploy"
		}
	},
	"build-pages": {
		all: grunt.file.expandFiles( "page/**" )
	},
	"build-resources": {
		all: grunt.file.expandFiles( "resources/**/*" )
	},
	wordpress: grunt.utils._.extend({
		dir: "dist/wordpress",
		order: "order.yml"
	}, grunt.file.readJSON( "config.json" ) )
});



// Process a YAML order file and return an object of page slugs and their ordinal indices
grunt.registerHelper( "read-order", function( orderFile ) {
	var order,
		map = {},
		index = 0;

	try {
		order = yaml.load( grunt.file.read( orderFile ) );
	} catch( error ) {
		grunt.warn( "Invalid order file: " + orderFile );
		return null;
	}


	function flatten( item, folder ) {
		var title,
		path = folder ? [ folder ] : [];

		if ( grunt.utils._.isObject( item ) ) {
			title = Object.keys( item )[ 0 ];
			path.push( title );
			path = path.join( "/" );
			map[ path ] = ++index;

			item[ title ].forEach(function( item ) {
				flatten( item, path );
			});
		} else {
			path.push( item );
			map[ path.join( "/" ) ] = ++index;
		}
	}
	order.forEach(function( item ) {
		flatten( item );
	});
	return map;
});

grunt.registerHelper( "build-pages-preprocess", (function() {
	var orderMap = grunt.helper( "read-order", "order.yml" );

	return function( post, fileName ) {
		var slug = fileName.replace( /^.+?\/(.+)\.\w+$/, "$1" ),
			menuOrder = orderMap[ slug ];
		if ( menuOrder ) {
			post.menuOrder = menuOrder;
		}
	};
})());



grunt.registerTask( "default", "wordpress-deploy" );
grunt.registerTask( "build-wordpress", "check-modules clean lint build-pages build-resources");
grunt.registerTask( "deploy", "wordpress-deploy" );

};



