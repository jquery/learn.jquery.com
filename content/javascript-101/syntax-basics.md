---
chapter:      js101
section:      1
title:        Syntax Basics
attribution:  jQuery Fundamentals
---
Understanding statements, variable naming, whitespace, and other basic JavaScript syntax.

<javascript caption="A simple variable declaration">
var foo = 'hello world';
</javascript>

<javascript caption="Whitespace has no meaning outside of quotation marks">
var foo =         'hello world';
</javascript>

<javascript caption="Parentheses indicate precedence">
2 * 3 + 5;    // returns 11; multiplication happens first
2 * (3 + 5);  // returns 16; addition happens first
</javascript>

<javascript caption="Identation enhances readability, but does not have any special meaning">
var foo = function() {
  console.log('hello');
};
</javascript>
