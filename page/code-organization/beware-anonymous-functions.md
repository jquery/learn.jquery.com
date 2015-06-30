<script>{
	"title": "Beware Anonymous Functions",
	"level": "beginner",
	"source": "http://jqfundamentals.com/legacy",
	"attribution": [ "jQuery Fundamentals" ]
}</script>

Anonymous functions bound everywhere are a pain. They're difficult to debug, maintain, test, or reuse. Instead, use an object literal to organize and name your handlers and callbacks.

```
// BAD
$( document ).ready(function() {

	$( "#magic" ).click(function( event ) {
		$( "#yayeffects" ).slideUp(function() {
			// ...
		});
	});

	$( "#happiness" ).load( url + " #unicorns", function() {
		// ...
	});

});

// BETTER
var PI = {

	onReady: function onReady() {
		$( "#magic" ).click( PI.candyMtn );
		$( "#happiness" ).load( PI.url + " #unicorns", PI.unicornCb );
	},

	candyMtn: function candyMtn( event ) {
		$( "#yayeffects" ).slideUp( PI.slideCb );
	},

	slideCb: function slideCb() { ... },

	unicornCb: function unicornCb() { ... }

};

$( document ).ready( PI.onReady );
```
