---
title:        Arrays
attribution:  jQuery Fundamentals
---
Arrays are zero-indexed lists of values. They are a handy way to store a set of
related items of the same type (such as strings), though in reality, an array
can include multiple types of items, including other arrays.

<javascript caption="A simple array">
var myArray = [ 'hello', 'world' ];
</javascript>

<javascript caption="Accessing array items by index">
var myArray = [ 'hello', 'world', 'foo', 'bar' ];
console.log(myArray[3]);   // logs 'bar'
</javascript>

<javascript caption="Testing the size of an array">
var myArray = [ 'hello', 'world' ];
console.log(myArray.length);   // logs 2
</javascript>

<javascript caption="Changing the value of an array item">
var myArray = [ 'hello', 'world' ];
myArray[1] = 'changed'; // myArray is now now ['hello', 'changed']
</javascript>

<javascript caption="Adding elements to an array">
var myArray = [ 'hello', 'world' ];
myArray.push('new'); // myArray is now ['hello', 'world', 'new']
</javascript>

<javascript caption="Working with arrays">
var myArray = [ 'h', 'e', 'l', 'l', 'o' ];
var myString = myArray.join(''); 	// myString = 'hello'
var mySplit = myString.split('');	// mySPlit = [ 'h', 'e', 'l', 'l', 'o' ]
</javascript>
