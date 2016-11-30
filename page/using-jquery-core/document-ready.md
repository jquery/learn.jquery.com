<script>{
	"title": "$( document ).ready()",
	"level": "beginner"
}</script>

A page can't be manipulated safely until the document is "ready." jQuery detects this state of readiness for you. Code included inside `$( document ).ready()` will only run once the page Document Object Model (DOM) is ready for JavaScript code to execute. Code included inside `$( window ).on( "load", function() { ... })` will run once the entire page (images or iframes), not just the DOM, is ready.

```
// A $( document ).ready() block.
$( document ).ready(function() {
	console.log( "ready!" );
});
```

Experienced developers sometimes use the shorthand `$()` for `$( document ).ready()`. If you are writing code that people who aren't experienced with jQuery may see, it's best to use the long form.

```
// Shorthand for $( document ).ready()
$(function() {
	console.log( "ready!" );
});
```

You can also pass a named function to `$( document ).ready()` instead of passing an anonymous function.

```
// Passing a named function instead of an anonymous function.

function readyFn( jQuery ) {
	// Code to run when the document is ready.
}

$( document ).ready( readyFn );
// or:
$( window ).on( "load", readyFn );
```

The example below shows `$( document ).ready()` and `$( window ).on( "load" )` in action. The code tries to load a website URL in an `<iframe>` and checks for both events:

```
<html>
<head>
	<script src="https://code.jquery.com/jquery-1.9.1.min.js"></script>
	<script>
	$( document ).ready(function() {
		console.log( "document loaded" );
	});

	$( window ).on( "load", function() {
		console.log( "window loaded" );
	});
	</script>
</head>
<body>
	<iframe src="http://techcrunch.com"></iframe>
</body>
</html>
```
