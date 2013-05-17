---
title:        Functions
level:        beginner
source: http://jqfundamentals.com/legacy
attribution:
  - jQuery Fundamentals
---

Functions contain blocks of code that need to be executed repeatedly. Functions can take zero or more arguments, and can optionally return a value.

Functions can be created in a variety of ways, two of which are shown below:

```
// Function declaration.

function foo() {
	// Do something.
}
```

```
// Named function expression.

var foo = function() {
	// Do something.
};
```

## Using Functions

```
// A simple function.

var greet = function( person, greeting ) {
	var text = greeting + ", " + person;
	console.log( text );
};

greet( "Rebecca", "Hello" ); // "Hello, Rebecca"
```

```
// A function that returns a value.

var greet = function( person, greeting ) {
	var text = greeting + ", " + person;
	return text;
};

console.log( greet( "Rebecca", "Hello" ) ); // "Hello, Rebecca"
```

```
// A function that returns another function.

var greet = function( person, greeting ) {
	var text = greeting + ", " + person;
	return function() {
		console.log( text );
	};
};

var greeting = greet( "Rebecca", "Hello" );

greeting(); // "Hello, Rebecca"
```

## Immediately-Invoked Function Expression (IIFE)

A common pattern in JavaScript is the immediately-invoked function expression. This pattern creates a function expression and then immediately executes the function. This pattern is extremely useful for cases where you want to avoid polluting the global namespace with code – no variables declared inside of the function are visible outside of it.

```
// An immediately-invoked function expression.

(function() {
	var foo = "Hello world";
})();

console.log( foo ); // undefined!
```

## Functions as Arguments

In JavaScript, functions are "first-class citizens" – they can be assigned to variables or passed to other functions as arguments. Passing functions as arguments is an extremely common idiom in jQuery.

```
// Passing an anonymous function as an argument.

var myFn = function( fn ) {
	var result = fn();
	console.log( result );
};

// Logs "hello world"
myFn( function() {
	return "hello world";
});
```

```
// Passing a named function as an argument

var myFn = function( fn ) {
	var result = fn();
	console.log( result );
};

var myOtherFn = function() {
	return "hello world";
};

myFn( myOtherFn ); // "hello world"
```
