---
title   : Working with Selections
level: beginner
---

### Getters & Setters

jQuery "overloads" its methods, so the method used to set a value generally has the same name as the method used to get a value. When a method is used to set a value, it's called a setter. When a method is used to get (or read) a value, it's called a getter. Setters affect all elements in a selection. Getters get the requested value only for the first element in the selection.

```
// The .html() method used as a setter:
$( "h1" ).html( "hello world" );
```

```
// The .html() method used as a getter:
$( "h1" ).html();
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
