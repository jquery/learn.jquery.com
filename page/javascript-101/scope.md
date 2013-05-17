---
title: Scope
level: beginner
source: http://jqfundamentals.com/legacy, http://javascriptplayground.com/blog/2012/04/javascript-variable-scope-this
attribution:
  - jQuery Fundamentals
---

"Scope" refers to the variables that are available to a piece of code at a given time. A lack of understanding of scope can lead to frustrating debugging experiences. The idea of scope is that it's where certain functions or variables are accessible from in our code, and the context in which they exist and are executed in.

There are two types of scopes in JavaScript: global and local. Let's talk about each of them in turn.

## Global Scope

The first scope is __Global Scope__. This is very easy to define. If a variable or function is _global_, it can be accessed from anywhere within a program. In a browser, the global scope is the `window` object. If a variable declaration occurs outside of a function, then that variable exists on the global object. For example:

```
var x = 9;
```

Once that variable had been defined, it could be referenced as `window.x`, but because it exists on the global object we can simply refer to it as `x`.

## Local Scope

JavaScript also creates a __Local Scope__ inside each function body. For example:

```
function myFunc() {
	var x = 5;
};

console.log( x ); // ReferenceError: x is not defined
```

Since `x` was initialized within `.myFunc()`, it is only accessible within `.myFunc()`, and we get a reference error if we try to access it outside of `.myFunc()`.

## A Word of Caution

If you declare a variable and forget to use the `var` keyword, that variable is automically made global. So this code would work:

```
function myFunc() {
	x = 5;
};

console.log( x ); // 5
```

This is a bad idea. Any variable that is global can have its value changed by any other parts of a program or any other script. This is undesirable, as it could lead to unforseen side effects.

Secondly, Immediately-Invoked Function Expressions provide a way to avoid global variables. You'll see many libraries such as  jQuery often use these:

```
(function() {
	var jQuery = { /* All my methods go here. */ };
	window.jQuery = jQuery;
})();
```

Wrapping everything in a function which is then immediately invoked means all the variables within that function are bound to the _local scope_. At the very end you can then expose all your methods by binding the `jQuery` object to the `window`, the _global object_. To read more about Immediately-Invoked Functions, check out Ben Alman's [Immediately-Invoked Function Expression](http://benalman.com/news/2010/11/immediately-invoked-function-expression/) article.

Because local scope works through functions, any functions defined within another have access to variables defined in the outer function:

```
function outer() {
	var x = 5;

	function inner() {
		console.log( x );
	}

	inner(); // 5
}
```

But the `.outer()` function doesn't have access to any variables declared within `.inner()`:

```
function outer() {
	var x = 5;

	function inner() {
		console.log( x );
		var y = 10;
	}

	inner(); // 5

	console.log( y ); // ReferenceError: y is not defined
}
```

Furthermore, variables that are declared inside a function without the `var` keyword are not local to the function – JavaScript will traverse the scope chain all the way up to the window scope to find where the variable was previously defined. If the variable wasn't previously defined, it will be defined in the global scope, which can have unexpected consequences.

```
// Functions have access to variables defined in the same scope.

var foo = "hello";

var sayHello = function() {
	console.log( foo );
};

sayHello(); // "hello"

console.log( foo ); // "hello"
```

Variables with the same name can exist in different scopes with different values:

```
var foo = "world";

var sayHello = function() {
	var foo = "hello";
	console.log( foo );
};

sayHello(); // "hello"

console.log( foo ); // "world"
```

When you reference a global variable within a function, that function can see changes to the variable value after the function is defined.

```
var myFunction = function() {
	var foo = "hello";
	var myFn = function() {
		console.log( foo );
	};
	foo = "world";
	return myFn;
};

var f = myFunction();

f(); // "world"
```

Here's a more complex example of scopes at play:

```
(function() {

	var baz = 1;

	var bim = function() {
		console.log( baz );
	};

	bar = function() {
		console.log( baz );
	};

})();
```
In this instance, running:

```
console.log( baz ); // baz is not defined outside of the function
```

Gives us a `ReferenceError`. `baz` was only defined within the function, and was never exposed to the global scope.

```
bar(); //  1
```

`.bar()` may have been defined within the anonymous function, but it was defined without the `var` keyword, which means it wasn't bound to the local scope and was instead created globally. Furthermore, it has access to the `baz` variable because `.bar()` was defined within the same scope as `baz`. This means it has access to it, even though other code outside of the function does not.


```
bim(); // ReferenceError: bim is not defined
```

`.bim()` was only defined within the function, so does not exist on the global object as it was defined locally.
