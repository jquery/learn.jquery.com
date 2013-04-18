---
title:        The "this" Keyword
level:        beginner
source: http://jqfundamentals.com/legacy
attribution:
  - jQuery Fundamentals
---

In JavaScript, as in most object-oriented programming languages, `this` is a special keyword that is used in methods to refer to the object on which a method is being invoked. The value of `this` is determined using a simple series of steps:

- If the function is invoked using `Function.call()` or `Function.apply()`, this will be set to the first argument passed to `.call()`/`.apply()`. If the first argument passed to `.call()`/`.apply()` is `null` or `undefined`, `this` will refer to the global object (which is the `window` object in web browsers).
- If the function being invoked was created using `Function.bind()`, `this` will be the first argument that was passed to `.bind()` at the time the function was created.
- If the function is being invoked as a method of an object, `this` will refer to that object.
- Otherwise, the function is being invoked as a standalone function not attached to any object, and `this` will refer to the global object.

```
// A function invoked using Function.call()

var myObject = {
	sayHello: function() {
		console.log( "Hi! My name is " + this.myName );
	},
	myName: "Rebecca"
};

var secondObject = {
	myName: "Colin"
};

myObject.sayHello();                    // "Hi! My name is Rebecca"
myObject.sayHello.call( secondObject ); // "Hi! My name is Colin"
```

```
// A function created using Function.bind()

var myName = "the global object";
var sayHello = function() {
	console.log( "Hi! My name is " + this.myName );
};
var myObject = {
	myName: "Rebecca"
};
var myObjectHello = sayHello.bind( myObject );

sayHello();      // "Hi! My name is the global object"
myObjectHello(); // "Hi! My name is Rebecca"
```

```
// A function being attached to an object at runtime.

var myName = "the global object";
var sayHello = function() {
	console.log( "Hi! My name is " + this.myName );
};
var myObject = {
	myName: "Rebecca"
};
var secondObject = {
	myName: "Colin"
};

myObject.sayHello = sayHello;
secondObject.sayHello = sayHello;

sayHello();              // "Hi! My name is the global object"
myObject.sayHello();     // "Hi! My name is Rebecca"
secondObject.sayHello(); // "Hi! My name is Colin"
```

When invoking a function deep within a long namespace, it is often tempting to reduce the amount of code you need to type by storing a reference to the actual function as a single, shorter variable. It is important not to do this with instance methods as this will cause the value of `this` within the function to change, leading to incorrect code operation. For instance:

```
var myNamespace = {
	myObject: {
		sayHello: function() {
			console.log( "Hi! My name is " + this.myName );
		},
		myName: "Rebecca"
	}
};

var hello = myNamespace.myObject.sayHello;

hello(); // "Hi! My name is undefined"
```

You can, however, safely reduce everything up to the object on which the method is invoked:

```
var myNamespace = {
	myObject: {
		sayHello: function() {
			console.log( "Hi! My name is " + this.myName );
		},
		myName: "Rebecca"
	}
};

var obj = myNamespace.myObject;

obj.sayHello(); // "Hi! My name is Rebecca"
```
