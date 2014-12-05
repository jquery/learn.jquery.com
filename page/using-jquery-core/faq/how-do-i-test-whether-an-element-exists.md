<script>{
	"title": "How do I test whether an element exists?"
}</script>

Use the [.length](http://api.jquery.com/length/) property of the jQuery collection returned by your selector:

```
if ( $( "#myDiv" ).length ) {

	$( "#myDiv" ).show();

}
```

Note that it isn't always necessary to test whether an element exists. The following code will show the element if it exists, and do nothing (with no errors) if it does not:

```
$( "#myDiv" ).show();
```
