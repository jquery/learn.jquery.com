<script>{
	"title": "How do I select elements when I already have a DOM element?"
}</script>

If you have a variable containing a DOM element, and want to select elements related to that DOM element, simply wrap it in a jQuery object.

```
var myDomElement = document.getElementById( "foo" ); // A plain DOM element.

$( myDomElement ).find( "a" ); // Finds all anchors inside the DOM element.
```

Many people try to concatenate a DOM element or jQuery object with a CSS selector, like so:

```
$( myDomElement + ".bar" ); // This is equivalent to $( "[object HTMLElement].bar" );
```

Unfortunately, you cannot concatenate strings to objects.

### Related Articles

* [The jQuery Object](/using-jquery-core/jquery-object/)
