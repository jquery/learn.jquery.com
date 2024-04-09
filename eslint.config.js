const jqueryConfig = require( "eslint-config-jquery" );
const globals = require( "globals" );

module.exports = [
	{
		ignores: [ "dist" ]
	},

	{
		files: [ "eslint.config.js", "Gruntfile.js" ],
		languageOptions: {
			globals: {
				...globals.node
			}
		},
		rules: jqueryConfig.rules
	}
];
