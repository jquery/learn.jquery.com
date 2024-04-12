<script>{
	"title": "How do I select an element by an ID that has characters used in CSS notation?"
}</script>

Because jQuery uses CSS syntax for selecting elements, some characters are interpreted as CSS notation. In order to tell jQuery to treat these characters literally rather than as CSS notation, they must be escaped by placing two backslashes in front of them. See the [Selector documentation](http://api.jquery.com/category/selectors/) for further details.

```
// Does not work:
$( "#some:id" )

// Works!
$( "#some\\:id" )

// Does not work:
$( "#some.id" )

// Works!
$( "#some\\.id" )
```

On jQuery version 3.0 or later, the function [jQuery.escapeSelector()](https://api.jquery.com/jQuery.escapeSelector/) should be used to escape such selectors.

Otherwise, the following function takes care of escaping these characters and places a "#" at the beginning of the ID string for convenience:

```
function escapeSelector( myid ) {

	return "#" + myid.replace( /(\/|:|\.|\[|\]|,|=|@)/g, "\\$1" );

}
```

The function can be used like so:

```
$( escapeSelector( "some.id" ) )
```
