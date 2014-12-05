<script>{
	"title": "How do I pull a native DOM element from a jQuery object?"
}</script>

A jQuery object is an array-like wrapper around one or more DOM elements. To get a reference to the actual DOM elements (instead of the jQuery object), you have two options. The first (and fastest) method is to use array notation:

```
$( "#foo" )[ 0 ]; // Equivalent to document.getElementById( "foo" )
```

The second method is to use the [.get()](http://api.jquery.com/get/) function:

```
$( "#foo" ).get( 0 ); // Identical to above, only slower.
```

You can also call [.get()](http://api.jquery.com/get/) without any arguments to retrieve a true array of DOM elements.
