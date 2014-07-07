<script>{
	"title": "Event Helpers",
	"level": "beginner",
	"source": "http://jqfundamentals.com/legacy",
	"attribution": [ "jQuery Fundamentals" ]
}</script>

jQuery offers two event-related helper functions that save you a few keystrokes.

### `.hover()`

The [`.hover()`](http://api.jquery.com/hover/) method lets you pass one or two functions to be run when the `mouseenter` and `mouseleave` events occur on an element. If you pass one function, it will be run for both events; if you pass two functions, the first will run for `mouseenter`, and the second will run for `mouseleave`.

**Note:** Prior to jQuery 1.4, the `.hover()` method required two functions.

```
// The hover helper function
$( "#menu li" ).hover(function() {
	$( this ).toggleClass( "hover" );
});
```
