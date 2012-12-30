---
title:        Scope
level:        beginner
source: http://jqfundamentals.com/legacy
attribution: 
  - jQuery Fundamentals
---

"Scope" refers to the variables that are available to a piece of code at a given time. A lack of understanding of scope can lead to frustrating debugging experiences.

When a variable is declared inside of a function using the `var` keyword, it is only available to code inside of that function &#8212; code outside of that function cannot access the variable. On the other hand, functions defined inside that function will have access to to the declared variable.

Furthermore, variables that are declared inside a function without the `var` keyword are not local to the function &#8212; JavaScript will traverse the scope chain all the way up to the window scope to find where the variable was previously defined. If the variable wasn't previously defined, it will be defined in the global scope, which can have unexpected consequences.

```
// Functions have access to variables defined in the same scope
var foo = "hello";
var sayHello = function() {
  console.log( foo );
};

sayHello(); // "hello"
console.log( foo ); // "hello"
```

```
// Code outside the scope in which a variable was defined does not have access to the variable
var sayHello = function() {
  var foo = "hello";
  console.log( foo );
};

sayHello(); // hello

console.log( foo ); // undefined
```

```
// Variables with the same name can exist in different scopes with different values
var foo = "world";

var sayHello = function() {
  var foo = "hello";
  console.log( foo );
};

sayHello();         // logs "hello"
console.log( foo ); // logs "world"
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
f(); // "world"
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

// baz is not defined outside of the function
console.log( baz );

// bar is defined outside of the anonymous function
// because it wasn't declared with var; furthermore,
// because it was defined in the same scope as baz,
// it has access to baz even though other code
// outside of the function does not
bar();

// bim is not defined outside of the anonymous function,
// so this will result in an error
bim();
```
