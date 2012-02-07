---
chapter:      javascript-101
section:      2
title:        Syntax Basics
attribution:  jQuery Fundamentals
github: jquery
---

### Comments

JavaScript has support for single and multi line comments. Comments are ignored by the JavaScript engine, therefore have no side-effects on the outcome of the program. They should be used to document the code for future developers (including yourself!). There are libraries available that can generate project documentation pages based on commenting conventions used, [JSDoc](http://code.google.com/p/jsdoc-toolkit/, "JSDoc Toolkit") is one of the more popular ones.

<javascript caption="Single and multi line comments.">
// this is an example of a single line comment.

/*
 * this is an example
 * of a 
 * multi line
 * comment.
 */
</javascript>

### Whitespace

Whitespace is also ignored in JavaScript. There are many tools that will actully strip out all the whitespace in a program reducing the overall file size in order to improve network latency. Given the availability of tools like these, whitespace should be leveraged to make the code as readible as possible.

<javascript caption="Whitespace is insignifigant.">
var hello = "Hello";
var world     =      "World!"; 
</javascript>

<javascript caption="Semantic whitespace promotes readibility.">
// readible code is good!
var foo = function() {
  for (var i = 0; i < 10; i++) {
    alert(i);
  }
};

foo();

// not so much!
var foo=function(){for(var i=0;i<10;++){alert(i);}};foo();
</javascript>

### Reserved Words

There is a handfull of reserved words that cannot be used when declaring user defined variables and functions. Some of these are currently implemented, some for future use, and others for historical reasons. A list of words and in depth explaination can be found on the [MDN JavaScript Reference](https://developer.mozilla.org/en/JavaScript/Reference/Reserved_Words, "MDN Reserved Words.")

### Identifiers

Identifiers are used to name variables and functions with a unique name so they can subsequently be refererred to by that name; variables and functions will be discussed in a later chapter. The name of an identifier must follow a few rules:

* Cannot be a reserved word.
* Can only be composed of letters, numbers, dollar signs, and underscores.
* The first character cannot be a number.

It is best practice to name these identifiers to something that will make sense to other developers and to you later on.

<javascript caption="Valid identifier names.">
var myAwesomeVariable = 'a';
var myAwesomeVariable2 = 'b';
var my_awesome_variable = 'c';
var $my_AwesomeVariable = 'd';
var _my_awesome_variable_$ = 'e';  
</javascript>

While it is possible to run JavaScript in server-side environments, that is out of the scope for this section. 








