---
title   : Utility Methods
level: beginner
source: http://jqfundamentals.com/legacy
attribution:
  - jQuery Fundamentals
---
jQuery offers several utility methods in the `$` namespace. These methods are helpful for accomplishing routine programming tasks. For a complete reference on jQuery utility methods, visit the [utilities documentation on api.jquery.com](http://api.jquery.com/category/utilities/).

Below are examples of a few of the utility methods:

### `$.trim`

Removes leading and trailing whitespace.

```
// returns "lots of extra whitespace"
$.trim("    lots of extra whitespace    ");
```

### `$.each()`

Iterates over arrays and objects.

```
$.each([ "foo", "bar", "baz" ], function( idx, val ) {
  console.log( "element " + idx + "is " + val );
});

$.each({ foo: "bar", baz: "bim" }, function( k, v ) {
  console.log( k + " : " + v );
});
```

The method `.each()` can be called on a selection to iterate over the
elements contained in the selection. `.each()`, not `$.each()`, should be used
for iterating over elements in a selection.

### `$.inArray()`

Returns a value's index in an array, or -1 if the value is not in the array.
```
var myArray = [ 1, 2, 3, 5 ];

if ( $.inArray( 4, myArray ) !== -1 ) {
  console.log("found it!");
}
```

### `$.extend()`

Changes the properties of the first object using the properties of subsequent objects.
```
var firstObject = { foo: "bar", a: "b" };
var secondObject = { foo: "baz" };

var newObject = $.extend( firstObject, secondObject );

console.log( firstObject.foo ); // "baz"
console.log( newObject.foo );   // "baz"
```

If you don't want to change any of the objects you pass to `$.extend`, pass an empty object as the first argument.

```
var firstObject = { foo: "bar", a: "b" };
var secondObject = { foo: "baz" };

var newObject = $.extend( {}, firstObject, secondObject );

console.log( firstObject.foo ); // "bar"
console.log( newObject.foo ); // "baz"
```

### `$.proxy()`

Returns a function that will always run in the provided scope — that is, sets the meaning of `this` inside the passed function to the second argument.

```
var myFunction = function() {
  console.log( this );
};
var myObject = {
  foo: "bar"
};

myFunction(); // window

var myProxyFunction = $.proxy( myFunction, myObject );

myProxyFunction(); // myObject
```

If you have an object with methods, you can pass the object and the name of a method to return a function that will always run in the scope of the object.

```
var myObject = {
  myFn : function() {
    console.log( this );
  }
};

$("#foo").click( myObject.myFn ); // HTMLElement #foo
$("#foo").click( $.proxy( myObject, "myFn" ) ); // myObject
```
