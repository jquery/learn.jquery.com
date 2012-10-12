---
title:        Objects
attribution:  jQuery Fundamentals
---
Objects contain one or more key-value pairs. The key portion can be any string.
The value portion can be any type of value: a number, a string, an array, a
function, or even another object.  When one of these values is a function, it’s
called a method of the object. Otherwise, they are called properties.

As it turns out, nearly everything in JavaScript is an object -- arrays,
functions, numbers, even strings -- and they all have properties and methods.

<javascript caption="Creating an object literal">
    var myObject = {
      sayHello : function() {
          console.log('hello');
      },
      myName : 'Rebecca'
    };
    
    myObject.sayHello();            // logs 'hello'
    
    console.log(myObject.myName);   // logs 'Rebecca'
</javascript>


When creating object literals, you should note that the key portion of each
key-value pair can be written as any valid JavaScript identifier, a string
(wrapped in quotes) or a number:

<javascript caption="test">
    var myObject = {
      validIdentifier : 123,
      'some string' : 456,
      99999 : 789
    };
</javascript>
