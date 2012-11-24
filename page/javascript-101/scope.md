---
title: Scope
level: beginner
source: http://jqfundamentals.com/legacy, http://javascriptplayground.com/blog/2012/04/javascript-variable-scope-this
attribution:
  - jQuery Fundamentals
---

"Scope" refers to the variables that are available to a piece of code at a given time. A lack of understanding of scope can lead to frustrating debugging experiences. The idea of "scope" is that it's where certain functions or variables are accessible from in our code, and the context in which they exist & are executed in.

When a variable is declared inside of a function using the `var` keyword, it is only available to code inside of that function &#8212; code outside of that function cannot access the variable. On the other hand, functions defined inside that function will have access to to the declared variable.

There are two types of scopes in JavaScript: Global and local. Lets talk about each of them in turn.

The first scope is __Global Scope__. This is very easy to define. If a variable or function is _global_, it can be got at from anywhere. In a browser, the global scope is the `window` object. So if in your code you simply have:

```
var x = 9;
```

The only other scope we can have is __Local Scope__. JavaScript scopes at a function level. For example:

```
function myFunc() {
  var x = 5;
});
console.log(x); //undefined
```

Since `x` was initialised within `myFunc()`, it is only accessible within `myFunc()`.

__A word of Caution__

If you declare a variable & forget to use the `var` keyword, that variable is automically made global. So this code would work:

```
function myFunc() {
  x = 5;
});
console.log(x); //5
```

This is a __very bad idea__. It's considered bad practise to clutter the global scope. You should add as fewer properties as you possibly can to the global object. That's why you'll see libaries such as jQuery often do this:

```
(function() {
  var jQuery = { /* all my methods go here */ };
  window.jQuery = jQuery.
});
```

Wrapping everything in a function which is then immediately invoked means all the variables within that function are bound to the _local scope_. At the very end you can then expose all your methods by binding the `jQuery` object to the `window`, the _global object_.

Because local scope works through functions, any functions defined within another have access to variables defined in the outer function:

```
function outer() {
  var x = 5;
  function inner() {
    console.log(x); //5
  }
}
```

But the `outer()` function doesn't have access to any variables declared within `inner()`:

```
function outer() {
  var x = 5;
  function inner() {
    console.log(x); //5
    var y = 10;
  }
  console.log(y); //undefined
}
```

Furthermore, variables that are declared inside a function without the `var` keyword are not local to the function &#8212; JavaScript will traverse the scope chain all the way up to the window scope to find where the variable was previously defined. If the variable wasn't previously defined, it will be defined in the global scope, which can have unexpected consequences.

```
// Functions have access to variables defined in the same scope
var foo = "hello";

var sayHello = function() {

  console.log( foo );

};

sayHello();         // "hello"

console.log( foo );   // "hello"
```

```
// Code outside the scope in which a variable was defined does not have access to the variable
var sayHello = function() {

  var foo = "hello";

  console.log( foo );

};

sayHello();         // "hello"

console.log( foo );   // undefined
```

```
// Variables with the same name can exist in different scopes with different values
var foo = "world";

var sayHello = function() {

  var foo = "hello";

  console.log( foo );

};

sayHello();         // "hello"

console.log( foo );   // "world"
```

```
// Functions can see changes in variable values after the function is defined
var myFunction = function() {

    var foo = "hello";

    var myFn = function() {

        console.log( foo );

    };

    foo = "world";

    return myFn;

};

var f = myFunction();

f();  // logs "world" -- uh oh
```

```
// Scope insanity
// a self-executing anonymous function
(function() {

  var baz = 1;

  var bim = function() {

    alert( baz );

  };

  bar = function() {

    alert( baz );

  };

})();

console.log( baz );  // baz is not defined outside of the function

bar();  // bar is defined outside of the anonymous function
        // because it wasn't declared with var; furthermore,
        // because it was defined in the same scope as baz,
        // it has access to baz even though other code
        // outside of the function does not

bim();  // bim is not defined outside of the anonymous function,
        // so this will result in an error
```
