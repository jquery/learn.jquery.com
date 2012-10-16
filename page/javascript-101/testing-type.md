---
title:        Testing Type
level:        beginner
---

JavaScript offers a way to test the "type" of a variable. However, the result
can be confusing -- for example, the type of an Array is "object".

It's common practice to use the typeof operator when trying to determining the
type of a specific value.

``` js 
// Testing the type of various variables
var myFunction = function() {
  console.log('hello');
};

var myObject = {
	foo : 'bar'
};

var myArray = [ 'a', 'b', 'c' ];

var myString = 'hello';

var myNumber = 3;

typeof myFunction;   // returns 'function'
typeof myObject;     // returns 'object'
typeof myArray;      // returns 'object' -- careful!
typeof myString;     // returns 'string';
typeof myNumber;     // returns 'number'

typeof null;         // returns 'object' -- careful!

if (myArray.push && myArray.slice && myArray.join) {
  // probably an array
  // (this is called "duck typing")
}

if (Object.prototype.toString.call(myArray) === '[object Array]') {
  // Definitely an array!
  // This is widely considered as the most robust way
  // to determine if a specific value is an Array.
}
```

The added importance of returning a variable's type is that for obscure variable names or those further down the tree, it isn't always obvious what type you're working with.

For example:

``` js 
// If we have the following variables
var myNum,
	myNumVal,
	myNumInt;

// And we initialize them at different points in the script...

myNumVal = 5;

myNumVal += ' forty five';

myNumInt = myNum;

// Now, returning typeof may not return what you think...

typeof myNumInt;	// returns 'string' (it's value is '5 forty five')

jQuery offers utility methods to help you determine the type of an arbitrary
value. These will be covered later.
