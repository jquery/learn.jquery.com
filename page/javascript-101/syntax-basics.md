---
title:        Syntax Basics
level:        beginner
source: http://jqfundamentals.com/legacy
attribution:
  - jQuery Fundamentals
---

### Comments

JavaScript has support for single- and multi-line comments. Comments are ignored by the JavaScript engine and therefore have no side-effects on the outcome of the program. Use comments to document the code for other developers. Libraries like [JSDoc](https://code.google.com/p/jsdoc-toolkit/ "JSDoc Toolkit") are available to help generate project documentation pages based on commenting conventions.

```
// Single- and multi-line comments.

// This is an example of a single-line comment.

/*
 * this is an example
 * of a
 * multi-line
 * comment.
 */
```

### Whitespace

Whitespace is also ignored in JavaScript. There are many tools that will strip out all the whitespace in a program, reducing the overall file size and improving network latency. Given the availability of tools like these, whitespace should be leveraged to make the code as readable as possible.

```
// Whitespace is insignificant.
var hello = "Hello";
var world     =      "World!";
```

```
// Semantic whitespace promotes readability.
// Readable code is good!
var foo = function() {

	for ( var i = 0; i < 10; i++ ) {

		alert( i );

	}

};

foo();

// This is much harder to read!
var foo=function() {for(var i=0;i<10;i++){alert(i);}};foo();
```

### Reserved Words

There are a handful of reserved words that can't be used when declaring user-defined variables and functions. Some of these reserved words are currently implemented, some are saved for future use, and others are reserved for historical reasons. A list of reserved words can be found [here](/javascript-101/reserved-words/), and in-depth explanations for each can be found on the [MDN JavaScript Reference](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Reserved_Words "MDN Reserved Words.") site.

### Identifiers

Identifiers are used to give variables and functions a unique name so they can subsequently be referred to by that name. The name of an identifier must follow a few rules:

* Cannot be a reserved word.
* Can only be composed of letters, numbers, dollar signs, and underscores.
* The first character cannot be a number.

It's a best practice to name identifiers in a way that will make sense to you and other developers later on.

```
// Valid identifier names.
var myAwesomeVariable = "a";
var myAwesomeVariable2 = "b";
var my_awesome_variable = "c";
var $my_AwesomeVariable = "d";
var _my_awesome_variable_$ = "e";
```

### Variable Definition

Variables can be defined using multiple `var` statements, or in a single combined `var` statement.

```
// This works:
var test = 1;
var test2 = function() { ... };
var test3 = test2( test );

// And so does this:
var test4 = 1,
	test5 = function() { ... },
	test6 = test2( test );
```

Variables can be declared without assigning them a value. The value of a variable declared without a value is `undefined`.

```
var x;
x === undefined; // true
```
