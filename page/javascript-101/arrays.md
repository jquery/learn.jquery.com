---
title:        Arrays
level:        beginner
source: http://jqfundamentals.com/legacy
attribution:
  - jQuery Fundamentals
---

Arrays are zero-indexed, ordered lists of values. They are a handy way to store a set of related items of the same type (such as strings), though in reality, an array can include multiple types of items, including other arrays.

To create an array, either use the object constructor or the literal declaration, by assigning the variable a list of values after the declaration.

```
// A simple array with constructor.
var myArray1 = new Array( "hello", "world" );

// Literal declaration, the preferred way.
var myArray2 = [ "hello", "world" ];
```

The literal declaration is generally preferred. See the [Google Coding Guidelines](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml#Array_and_Object_literals) for more information.

If the values are unknown, it is also possible to declare an empty array, and add elements either through functions or through accessing by index:

```
// Creating empty arrays and adding values

var myArray = [];

// Adds "hello" on index 0
myArray.push( "hello" );

// Adds "world" on index 1
myArray.push( "world" );

// Adds "!" on index 2
myArray[ 2 ] = "!";
```

`.push()` is a function that adds an element on the end of the array and expands the array respectively. You also can directly add items by index. Missing indices will be filled with `undefined`.

```
// Leaving indices

var myArray = [];

myArray[ 0 ] = "hello";
myArray[ 1 ] = "world";
myArray[ 3 ] = "!";

console.log( myArray ); // [ "hello", "world", undefined, "!" ];
```

If the size of the array is unknown, `.push()` is far more safe. You can both access and assign values to array items with the index.

```
// Accessing array items by index

var myArray = [ "hello", "world", "!" ];

console.log( myArray[ 2 ] ); // "!"
```

## Array Methods and Properties

### .length

The `.length` property is used to determine the amount of items in an array.

```
// Length of an array

var myArray = [ "hello", "world", "!" ];

console.log( myArray.length ); // 3
```

You will need the `.length` property for looping through an array:

```
// For loops and arrays - a classic

var myArray = [ "hello", "world", "!" ];

for ( var i = 0; i < myArray.length; i = i + 1 ) {

	console.log( myArray[ i ] );

}
```

Except when using `for`/`in` loops:

```
// For loops and arrays - alternate method

var myArray = [ "hello", "world", "!" ];

for ( var i in myArray ) {

	console.log( myArray[ i ] );

}
```

### .concat()

Concatenate two or more arrays with `.concat()`:

```
var myArray = [ 2, 3, 4 ];
var myOtherArray = [ 5, 6, 7 ];
var wholeArray = myArray.concat( myOtherArray ); // [ 2, 3, 4, 5, 6, 7 ]
```

### .join()

`.join()` creates a string representation of an array by joining all of its elements using a separator string. If no separator is supplied (e.g. `.join()` is called without arguments) the array will be joined using a comma.

```
// Joining elements

var myArray = [ "hello", "world", "!" ];

// The default separator is a comma.
console.log( myArray.join() );     // "hello,world,!"

// Any string can be used as separator...
console.log( myArray.join( " " ) );  // "hello world !";
console.log( myArray.join( "!!" ) ); // "hello!!world!!!";

// ...including an empty one.
console.log( myArray.join( "" ) );   // "helloworld!"

```

### .pop()

`.pop()` removes the last element of an array. It is the opposite method of `.push()`:

```
// Pushing and popping

var myArray = [];

myArray.push( 0 ); // [ 0 ]
myArray.push( 2 ); // [ 0 , 2 ]
myArray.push( 7 ); // [ 0 , 2 , 7 ]
myArray.pop();     // [ 0 , 2 ]
```

### .reverse()

As the name suggests, the elements of the array are in reverse order after calling this method:

```
var myArray = [ "world" , "hello" ];
myArray.reverse(); // [ "hello", "world" ]
```

### .shift()

Removes the first element of an array. With `.push()` and `.shift()`, you can recreate the method of a [queue](http://en.wikipedia.org/wiki/Queue_(abstract_data_type%29):

```
// Queue with shift() and push()

var myArray = [];

myArray.push( 0 ); // [ 0 ]
myArray.push( 2 ); // [ 0 , 2 ]
myArray.push( 7 ); // [ 0 , 2 , 7 ]
myArray.shift();   // [ 2 , 7 ]
```

### .slice()

Extracts a part of the array and returns that part in a new array. This method takes one parameter, which is the starting index:

```
// Slicing

var myArray = [ 1, 2, 3, 4, 5, 6, 7, 8 ];
var newArray = myArray.slice( 3 );

console.log( myArray );  // [ 1, 2, 3, 4, 5, 6, 7, 8 ]
console.log( newArray ); // [ 4, 5, 6, 7, 8 ]
```

### .splice()

Removes a certain amount of elements and adds new ones at the given index. It takes at least three parameters:

```
myArray.splice( index, length, values, ... );
```

* *Index* – The starting index.
* *Length* – The number of elements to remove.
* *Values* – The values to be inserted at the index position.

For example:

```
var myArray = [ 0, 7, 8, 5 ];
myArray.splice( 1, 2, 1, 2, 3, 4 );

console.log( myArray ); // [ 0, 1, 2, 3, 4, 5 ]
```

### .sort()

Sorts an array. It takes one parameter, which is a comparing function. If this function is not given, the array is sorted ascending:

```
// Sorting without comparing function.

var myArray = [ 3, 4, 6, 1 ];

myArray.sort(); // 1, 3, 4, 6
```

```
// Sorting with comparing function.

function descending( a, b ) {
	return b - a;
}

var myArray = [ 3, 4, 6, 1 ];

myArray.sort( descending ); // [ 6, 4, 3, 1 ]
```

The return value of descending (for this example) is important. If the return value is less than zero, the index of `a` is before `b`, and if it is greater than zero it's vice-versa. If the return value is zero, the elements' index is equal.

### .unshift()

Inserts an element at the first position of the array:

```
var myArray = [];

myArray.unshift( 0 ); // [ 0 ]
myArray.unshift( 2 ); // [ 2 , 0 ]
myArray.unshift( 7 ); // [ 7 , 2 , 0 ]
```

### .forEach()

In modern browsers it is possible to traverse through arrays with a `.forEach()` method, where you pass a function that is called for each element in the array.

The function takes up to three arguments:

* *Element* – The element itself.
* *Index* – The index of this element in the array.
* *Array* – The array itself.

All of these are optional, but you will need at least the *Element* parameter in most cases.

```
// Native .forEach()

function printElement( elem ) {
	console.log( elem );
}

function printElementAndIndex( elem, index ) {
	console.log( "Index " + index + ": " + elem );
}

function negateElement( elem, index, array ) {
	array[ index ] = -elem;
}

myArray = [ 1, 2, 3, 4, 5 ];

// Prints all elements to the console
myArray.forEach( printElement );

// Prints "Index 0: 1", "Index 1: 2", "Index 2: 3", ...
myArray.forEach( printElementAndIndex );

// myArray is now [ -1, -2, -3, -4, -5 ]
myArray.forEach( negateElement );
```
