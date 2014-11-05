<script>{
	"title": "Data Methods",
	"level": "intermediate",
	"source": "http://jqfundamentals.com/legacy",
	"attribution": [ "jQuery Fundamentals" ]
}</script>

There's often data about an element you want to store with the element. In plain JavaScript, you might do this by adding a property to the DOM element, but you'd have to deal with memory leaks in some browsers. jQuery offers a straightforward way to store data related to an element, and it manages the memory issues for you.

```
// Storing and retrieving data related to an element.

$( "#myDiv" ).data( "keyName", { foo: "bar" } );

$( "#myDiv" ).data( "keyName" ); // Returns { foo: "bar" }
```

Any kind of data can be stored on an element. For the purposes of this article, `.data()` will be used to store references to other elements.

For example, you may want to establish a relationship between a list item and a `<div>` that's inside of it. This relationship could be established every single time the list item is touched, but a better solution would be to establish the relationship once, then store a pointer to the `<div>` on the list item using `.data()`:

```
// Storing a relationship between elements using .data()

$( "#myList li" ).each(function() {

	var li = $( this );
	var div = li.find( "div.content" );

	li.data( "contentDiv", div );

});

// Later, we don't have to find the div again;
// we can just read it from the list item's data
var firstLi = $( "#myList li:first" );

firstLi.data( "contentDiv" ).html( "new content" );
```

In addition to passing `.data()` a single key-value pair to store data, you can also pass an object containing one or more pairs.
