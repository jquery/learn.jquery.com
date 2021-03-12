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

If you need to understand if element is present in main DOM tree, or if you're previously stored selector set in variable, use [jQuery.contains](https://api.jquery.com/jQuery.contains/)

```
var elements = $('#myDiv');
if ($.contains(document, elements)) {
  elements.show();
}
```

Because modern browsers detaching elements in [DocumentFragment](https://developer.mozilla.org/ru/docs/Web/API/Document/createDocumentFragment), `.length` will always return constant value, even if element already removed from page.
