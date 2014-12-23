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

function contributorAttribution( post, fileName, callback ) {
	var contribs,
		parseRE = /^(.*)<(.*)>$/;

	// Read contributors from git file information
	spawnback( "git", [
		"log",
		"--follow", // Trace history through file rename operations
		"--diff-filter=AM", // Only consider "Add" and "Modify" operations
		"--format=%aN <%aE>",
		fileName
	], function( error, result ) {
		if ( error ) {
			return callback( error );
		}

		contribs = result.trimRight().split( /\r?\n/g )

			// Reduce to a unique list of contributors
			.filter(function( value, index, array ) {
				return array.indexOf( value ) === index;
			})

			// Convert to structured objects
			.map(function( contributor ) {
				var matches = parseRE.exec( contributor );
				return {
					name: matches[ 1 ].trim(),
					email: matches[ 2 ]
				};
			})

			// Alphabetize by 'last name' (relatively crude)
			.sort(function( a, b ) {
				return a.name.split( " " ).pop().toLowerCase() <
					b.name.split( " " ).pop().toLowerCase() ?
					-1 : 1;
			});

		// Handle "legacy" content - content authored outside of the learn site
		// and attributed with metadata in the file,
		// push those contributors to the front of the list
		if ( post.attribution ) {
			post.attribution.forEach(function( contributor ) {
				var contrib, matches;

				if ( contributor === "jQuery Fundamentals" ) {
					contrib = {
						name: "jQuery Fundamentals",
						email: "github@jquery.com"
					};
				} else {
					matches = parseRE.exec( contributor );
					contrib = {
						name: matches[ 1 ].trim(),
						email: matches[ 2 ]
					};
				}

				if ( post.source ) {
					contrib.source = post.source;
				}

				contribs.unshift( contrib );
			});
		}

		post.customFields = post.customFields || [];
		post.customFields.push({
			key: "contributors",
			value: JSON.stringify( contribs )
		});

		callback( null, post );
	});
}

jqueryContent.postPreprocessors.page = (function() {
	var orderMap = getOrderMap();

	return function( post, postPath, callback ) {
		var slug = postPath.replace( /^.+?\/(.+)\.\w+$/, "$1" ),
			menuOrder = orderMap[ slug ];

		if ( menuOrder ) {
			post.menuOrder = menuOrder;
		}

		contributorAttribution( post, postPath, callback );
	};
})();

grunt.registerTask( "build", [ "build-posts", "build-resources" ] );

};
