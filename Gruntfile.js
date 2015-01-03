var spawnback = require( "spawnback" ),
	jqueryContent = require( "grunt-jquery-content" );

module.exports = function( grunt ) {

grunt.loadNpmTasks( "grunt-jquery-content" );

grunt.initConfig({
	"build-posts": {
		page: "page/**"
	},
	"build-resources": {
		all: "resources/**"
	},
	wordpress: (function() {
		var config = require( "./config" );
		config.dir = "dist/wordpress";
		return config;
	})()
});

function getOrderMap() {
	var map = {},
		index = 0;

	function walk( items, prefix ) {
		items.forEach(function( item ) {
			if ( typeof item === "object" ) {
				var page = Object.keys( item )[ 0 ];
				map[ prefix + page ] = ++index;
				walk( item[ page ], prefix + page + "/" );
			} else {
				map[ prefix + item ] = ++index;
			}
		});
	}

	walk( require( "./order" ), "" );

	return map;
}

jqueryContent.postPreprocessors.page = (function() {
	var orderMap = getOrderMap();

	return function( post, postPath, callback ) {
		var slug = postPath.replace( /^.+?\/(.+)\.\w+$/, "$1" ),
			menuOrder = orderMap[ slug ];

		if ( menuOrder ) {
			post.menuOrder = menuOrder;
		}

		callback( null, post );
	};
})();

grunt.registerTask( "build", [ "build-posts", "build-resources" ] );

};
