<script>{
	"title": "Custom Effects with .animate()",
	"level": "beginner",
	"source": "http://jqfundamentals.com/legacy",
	"attribution": [ "jQuery Fundamentals" ]
}</script>

jQuery makes it possible to animate arbitrary CSS properties via the `.animate()` method. The `.animate()` method lets you animate to a set value, or to a value relative to the current value.

```
// Custom effects with .animate()
$( "div.funtimes" ).animate(
	{
		left: "+=50",
		opacity: 0.25
	},

	// Duration
	300,

	// Callback to invoke when the animation is finished
	function() {
		console.log( "done!" );
	}
);
```

**Note:** Color-related properties cannot be animated with `.animate()` using jQuery out of the box. Color animations can easily be accomplished by including the [color plugin](http://github.com/jquery/jquery-color). We'll discuss using plugins later in the book.

### Easing

Definition: Easing describes the manner in which an effect occurs — whether the rate of change is steady, or varies over the duration of the animation. jQuery includes only two methods of easing: swing and linear. If you want more natural transitions in your animations, various easing plugins are available.

As of jQuery 1.4, it is possible to do per-property easing when using the `.animate()` method.

```
// Per-property easing
$( "div.funtimes" ).animate({
	left: [ "+=50", "swing" ],
	opacity: [ 0.25, "linear" ]
}, 300 );
```

For more details on easing options, see [Animation documentation on api.jquery.com](http://api.jquery.com/animate/).
