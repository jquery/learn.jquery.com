---
title:        Objects
level:        beginner
source: http://jqfundamentals.com/legacy
attribution: 
  - jQuery Fundamentals
---
Objects contain one or more key-value pairs. The key portion can be any string. The value portion can be any type of value: a number, a string, an array, a function, or even another object.  When one of these values is a function, it’s called a method of the object. Otherwise, they are called properties.

In comparsion to other programming languages objects in JavaScript are similar to:

* Dictionaries in Python
* Hashes in Perl and Ruby
* Hash tables in C and C++
* HashMaps in Java
* Associative arrays in PHP

As it turns out, nearly everything in JavaScript is an object &#8212; arrays, functions, numbers, even strings &#8212; and they all have properties and methods.

```
// Creating an object literal
var myObject = {
  sayHello : function() {
    console.log("hello");
  },
  myName : "Rebecca"
};

myObject.sayHello(); // "hello"

console.log( myObject.myName ); // "Rebecca"
```

When creating object literals, note that the key portion of each key-value pair can be written as any valid JavaScript identifier, a string (wrapped in quotes), or a number:

```
// test
var myObject = {
	validIdentifier: 123,
	"some string": 456,
	99999: 789
};
```

## Iterating over the enumerable properties of an object:

```
var myObject = {
	validIdentifier: 123,
	"some string": 456,
	99999: 789
};

for ( var prop in myObject ) { 
	console.log("Property : " + prop + " ; value : "+myObject[ prop ]); 
}

# Would log :
# Property : 99999 ; value : 789
# Property : validIdentifier ; value : 123
# Property : some string ; value : 456

```

