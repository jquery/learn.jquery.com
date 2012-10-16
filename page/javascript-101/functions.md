---
title:        Functions
level:        beginner
---

Functions contain blocks of code that need to be executed repeatedly. Functions
can take zero or more arguments, and can optionally return a value.

Functions can be created in a variety of ways:

``` js
// Function Declaration
function foo() { /* do something */ }
```

``` js
// Named Function Expression
var foo = function() { /* do something */ }
```

I prefer the named function expression method of setting a function's name, for
some rather in-depth and technical reasons. You are likely to see both methods
used in others' JavaScript code.

## Using Functions

``` js
// A simple function
var greet = function(person, greeting) {
  var text = greeting + ', ' + person;
  console.log(text);
};

greet('Rebecca', 'Hello');
```

``` js 
// A function that returns a value
var greet = function(person, greeting) {
  var text = greeting + ', ' + person;
  return text;
};

console.log(greet('Rebecca','hello'));
```

``` js
// A function that returns another function
var greet = function(person, greeting) {
  var text = greeting + ', ' + person;
  return function() { console.log(text); };
};

var greeting = greet('Rebecca', 'Hello');
greeting();
```

## Immediately-Invoked Function Expression

A common pattern in JavaScript is the immediately-invoked function expression. This
pattern creates a function expression and then immediately executes the
function. This pattern is extremely useful for cases where you want to avoid
polluting the global namespace with your code &#8212; no variables declared inside of
the function are visible outside of it.

``` js 
// An immediately-invoked function expression
(function(){
  var foo = 'Hello world';
})();

console.log(foo);   // undefined!
```

## Functions as Arguments

In JavaScript, functions are "first-class citizens" - they can be assigned
to variables or passed to other functions as arguments. Passing functions as
arguments is an extremely common idiom in jQuery.

``` js
// Passing an anonymous function as an argument
var myFn = function(fn) {
  var result = fn();
  console.log(result);
};

myFn(function() { return 'hello world'; });   // logs 'hello world'
```

``` js 
// Passing a named function as an argument

    var myFn = function(fn) {
      var result = fn();
      console.log(result);
    };

    var myOtherFn = function() {
      return 'hello world';
    };

    myFn(myOtherFn);   // logs 'hello world'
```
