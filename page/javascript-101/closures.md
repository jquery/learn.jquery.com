---
title:        Closures
level:        beginner
source: http://jqfundamentals.com/legacy
attribution:
  - jQuery Fundamentals
---

Closures are an extension of the concept of scope. With closures, functions have access to variables that were available in the scope where the function was created. If that seems confusing, don’t worry: closures are generally best understood by example.

As shown in the [Functions](/functions/) section, functions have access to changing variable values. The same sort of behavior exists with functions defined within loops – the function "sees" the change in the variable's value even after the function is defined, resulting in each function referencing the last value stored in the variable.

```
// Each function executed within the loop will reference
// the last value stored in i (5).
// This won't behave as we want it to - every 100 milliseconds, 5 will alert
for ( var i = 0; i < 5; i++ ) {
	setTimeout(function() {
		alert( i );
	}, i * 100 );
}
```

Closures can be used to prevent this by creating a unique scope for each iteration – storing each unique value of the variable within its scope.

```
// Using a closure to create a new private scope
// fix: “close” the value of i inside createFunction, so it won't change
var createFunction = function( i ) {
	return function() {
		alert( i );
	};
};

for ( var i = 0; i < 5; i++ ) {
	setTimeout( createFunction( i ), i * 100 );
}
```

Closures can also be used to resolve issues with the `this` keyword, which is unique to each scope:

```
// Using a closure to access inner and outer object instances simultaneously.
var outerObj = {
	myName: "outer",
	outerFunction: function() {
		// provide a reference to outerObj through innerFunction"s closure
		var self = this;
		var innerObj = {
			myName: "inner",
			innerFunction: function() {
				console.log( self.myName, this.myName ); // "outer inner"
			}
		};

		innerObj.innerFunction();

		console.log( this.myName ); // "outer"
	}
};

outerObj.outerFunction();
```

## Function.bind

Closures can be particularly useful when dealing with callbacks. However, it is often better to use `Function.bind`, which will avoid any overhead associated with scope traversal.

`Function.bind` is used to create a new function. When called, the new function then calls itself in the context of the supplied `this` value, using a given set of arguments that will precede any arguments provided when the new function was initially called.

As `.bind()` is a recent addition to ECMAScript 5, it may not be present in all browsers, which is something to be wary of when deciding whether to use it. However, it's possible to work around support by using [this shim](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/bind) from MDN:

```
// Shim from MDN
if (!Function.prototype.bind) {

	Function.prototype.bind = function( oThis ) {

		if (typeof this !== "function") {
			// closest thing possible to the ECMAScript 5 internal
			// IsCallable function
			throw new TypeError( "Function.prototype.bind - what is trying to be bound is not callable" );
		}

		var fSlice = Array.prototype.slice,
			aArgs = fSlice.call( arguments, 1 ),
			fToBind = this,
			fNOP = function() {},
			fBound = function() {
				return fToBind.apply( this instanceof fNOP
					? this
					: oThis || window,
					aArgs.concat( fSlice.call( arguments ) ) );
			};

		fNOP.prototype = this.prototype;

		fBound.prototype = new fNOP();

		return fBound;
	};
}
```

One of the simplest uses of `.bind()` is making a function that is called with a particular value for `this`, regardless of how it's called. A common mistake developers make is attempting to extract a method from an object, then later calling that method and expecting it to the use the origin object as its `this`. However, this can be solved by creating a bound function using the original object as demonstrated below:

```
// Let's manipulate "this" with a basic example.
var user = "johnsmith";
var module = {
	getUser: function() {
		return this.user;
	},
	user: "janedoe"
};

// module.getUser() is called where "module" is "this"
// and "module.user" is returned.

// janedoe
module.getUser();

// let's now store a reference in the global version of "this"
var getUser = module.getUser;

// getUser() called, "this" is global, "user" is returned

// johnsmith
getUser();

// store a ref with "module" bound as "this"
var boundGetUser = getUser.bind( module );

// boundGetUser() called, "module" is "this" again, "module.user" returned.

// janedoe
boundGetUser();
```
