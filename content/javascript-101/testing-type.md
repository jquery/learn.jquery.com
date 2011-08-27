---
chapter :     js101
section:      9
title:        Testing Type
attribution:  jQuery Fundamentals
---

JavaScript offers a way to test the "type" of a variable. However, the result
can be confusing -- for example, the type of an Array is "object".

It's common practice to use the typeof operator when trying to determining the
type of a specific value.

<div class="example" markdown="1">
Testing the type of various variables

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
</div>

jQuery offers utility methods to help you determine the type of an arbitrary
value. These will be covered later.
