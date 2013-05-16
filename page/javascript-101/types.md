---
title:        Types
level:        beginner
source: http://jqfundamentals.com/legacy
attribution:
  - jQuery Fundamentals
---

Types in JavaScript fall into two categories: primitives or objects. Primitive types include:

* String
* Number
* Boolean
* null
* undefined

### String

Strings are text wrapped in single or double quotation marks. It is best practice to consistently use one or the other. There may be times when the string contains quotation marks that collide with the ones used to create the string. In this case, either escape the characters using a `\` backslash or use different quotes around the string.

```
// Strings can be created with double or single quotes.
var a = "I am a string";
var b = 'So am I!';
alert( a );
alert( b );
```

```
// Sometimes a string may contain quotation marks.
var statement1 = 'He said "JavaScript is awesome!"';
var statement2 = "He said \"JavaScript is awesome!\"";
```

### Number

Number types are any positive or negative numeric value. There is no distinction between integer and floating point values.

```
// Numbers are any whole or floating point integer.
var num1 = 100;
var num2 = 100.10;
var num3 = 0.10;
```

### Boolean
Boolean types are either `true` or `false`.

```
// Boolean values.
var okay = true;
var fail = false;
```

### null and undefined

`null` and `undefined` are special types in JavaScript. Null types are values that represent the absence of a value, similar to many other programming languages. Undefined types represent a state in which no value has been assigned at all. This type is created in two ways: by using the `undefined` keyword or by not defining a value at all.

```
// Define a null value.
var foo = null;

// Two ways to achieve an undefined value.
var bar1 = undefined;
var bar2;
```

## Objects

Everything else in JavaScript is considered an Object. While there are [numerous built-in objects](https://developer.mozilla.org/en/JavaScript/Reference#Global_Objects, "MDN - Global Object Reference"), this chapter will cover:

* Object
* Array
* Function

The simplest way to create an object is either through the Object constructor or the shorthand syntax known as object literal. These simple objects are unordered key/value pairs. The key is formally known as a property and the value can be any valid JavaScript type, even another object. To create or access a property on an object, we use what is known as "dot notation" or "bracket notation."

```
// Creating an object with the constructor:
var person1 = new Object;

person1.firstName = "John";
person1.lastName = "Doe";

alert( person1.firstName + " " + person1.lastName );

// Creating an object with the object literal syntax:
var person2 = {
	firstName: "Jane",
	lastName: "Doe"
};

alert( person2.firstName + " " + person2.lastName );
```

```
// As mentioned, objects can also have objects as a property.
var people = {};

people[ "person1" ] = person1;
people[ "person2" ] = person2;

alert( people[ "person1" ].firstName );
alert( people[ "person2" ].firstName );
```

If a property is accessed that has not been defined, it will return a type of `undefined`.

```
// Properties that have not been created are undefined.
var person = { name: "John Doe" };
alert( person.email ); // => undefined
```

Objects are covered further in the [Objects](/objects/) section.

### Array

Arrays are a type of object that are ordered by the index of each item it contains. The index starts at zero and extends to however many items have been added, which is a property of the array known as the `length` of the array. Similar to a basic object, an array can be created with the array constructor or the shorthand syntax known as array literal.

```
// Creating an array with the constructor:
var foo = new Array;

// Creating an array with the array literal syntax:
var bar = [];
```

There is an important distinction to be made between the two. Both an array constructor and an array literal can contain items to be added to the array upon creating it. However, if just a single numeric item is passed in, the array constructor will assume its length to be that value.

```
// The array literal returns a foo.length value of 1:
var foo = [ 100 ];
alert( foo[0] ); // => 100
alert( foo.length ); // => 1

// The array constructor returns a bar.length value of 100:
var bar = new Array( 100 );
alert( bar[0] ); // => undefined
alert( bar.length ); // => 100
```

An array can be manipulated through methods that are available on the instance of the array. Items in the array can be accessed using bracket notation with a given index. If the index does not exist or contains no value, the return type will be `undefined`.

A few common array methods are shown below:

```
// Using the push(), pop(), unshift() and shift() methods on an array
var foo = [];

foo.push( "a" );
foo.push( "b" );

alert( foo[ 0 ] ); // => a
alert( foo[ 1 ] ); // => b

alert( foo.length ); // => 2

foo.pop();

alert( foo[ 0 ] ); // => a
alert( foo[ 1 ] ); // => undefined

alert( foo.length ); // => 1

foo.unshift( "z" );

alert( foo[ 0 ] ); // => z
alert( foo[ 1 ] ); // => a

alert( foo.length ); // => 2

foo.shift();

alert( foo[ 0 ] ); // => a
alert( foo[ 1 ] ); // => undefined

alert( foo.length ); // => 1
```

There are many more methods for manipulating arrays, some of which are covered further in the [Arrays](/arrays/) section. Details can be found on the [Mozilla Developer Network](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array "MDN - Array Reference").

## Type Checking with jQuery

jQuery offers a few basic utility methods for determining the type of a specific value. Type checking is covered further in the [Testing Type](/testing-type/) section, but here are some examples:

```
// Checking the type of an arbitrary value
var myValue = [ 1, 2, 3 ];

// Using JavaScript's typeof operator to test for primitive types:

typeof myValue === "string"; // false
typeof myValue === "number"; // false
typeof myValue === "undefined"; // false
typeof myValue === "boolean"; // false

// Using strict equality operator to check for null

myValue === null; // false

// Using jQuery's methods to check for non-primitive types

jQuery.isFunction( myValue ); // false
jQuery.isPlainObject( myValue ); // false
jQuery.isArray( myValue ); // true
```
