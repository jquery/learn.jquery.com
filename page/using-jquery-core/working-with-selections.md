<script>{
	"title": "Working with Selections",
	"level": "beginner"
}</script>

### Getters & Setters

Some jQuery methods can be used to either assign or read some value on a selection. When the method is called with a value as an argument, it's referred to as a setter because it sets (or assigns) that value. When the method is called with no argument, it gets (or reads) the value of the element. Setters affect all elements in a selection, whereas getters return the requested value only for the first element in the selection, with the exception of [`.text()`](http://api.jquery.com/text/), which retrieves the values of all the elements.

```
// The .html() method sets all the h1 elements' html to be "hello world":
$( "h1" ).html( "hello world" );
```

```
// The .html() method returns the html of the first h1 element:
$( "h1" ).html();
// > "hello world"

```

Setters return a jQuery object, allowing you to continue calling jQuery methods on your selection. Getters return whatever they were asked to get, so you can't continue to call jQuery methods on the value returned by the getter.

```
// Attempting to call a jQuery method after calling a getter.
// This will NOT work:
$( "h1" ).html().addClass( "test" );
```

### Chaining

If you call a method on a selection and that method returns a jQuery object, you can continue to call jQuery methods on the object without pausing for a semicolon. This practice is referred to as "chaining":

```
$( "#content" ).find( "h3" ).eq( 2 ).html( "new text for the third h3!" );
```

It may help code readability to break the chain over several lines:

```
$( "#content" )
	.find( "h3" )
	.eq( 2 )
	.html( "new text for the third h3!" );
```

jQuery also provides the `.end()` method to get back to the original selection should you change the selection in the middle of a chain:

```
$( "#content" )
	.find( "h3" )
	.eq( 2 )
		.html( "new text for the third h3!" )
		.end() // Restores the selection to all h3s in #content
	.eq( 0 )
		.html( "new text for the first h3!" );
```

Chaining is extraordinarily powerful, and it's a feature that many libraries have adapted since it was made popular by jQuery. However, it must be used with care – extensive chaining can make code extremely difficult to modify or debug. There is no hard-and-fast rule to how long a chain should be – just know that it's easy to get carried away.
