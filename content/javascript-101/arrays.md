---
chapter :     js101
section:      6
title:        Arrays
attribution:  
- jQuery Fundamentals
- Stefan Baumgartner
github: ddprrt
---
Arrays are zero-indexed, ordered lists of values. They are a handy way to store a set of
related items of the same type (such as strings), though in reality, an array
can include multiple types of items, including other arrays.

To create an array you can either use the object constructor or the literal declaration,
by assigning your variable a list of values right after the declaration.

<javascript caption="A simple array">
var myArray1 = new Array( 'hello', 'world' ); // with constructor
var myArray2 = [ 'hello', 'world' ]; // literal declaration, the preferred way
</javascript>

The literal declaration is preferred, see the 
[Google Coding Guidelines](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml#Array_and_Object_literals)
for more information.

If you don't know your values yet, it is also possible to declare an empty Array, and
add elements either through functions or through accessing by index:

<javascript caption="Creating empty arrays and adding values">
var myArray = [];

myArray.push('hello'); // adds 'hello' on index 0
myArray.push('world'); // adds 'world' on index 1
myArray[2] = '!';	   // adds '!' on index 2
</javascript>

'push' is a function which adds an element on the end of the array and expands the array
respectively. You also can directly add items by index. Missing indices will be filled
with 'undefined';

<javascript caption="Leaving indices">
var myArray = [];

myArray[0] = 'hello'; 
myArray[1] = 'world'; 
myArray[3] = '!';

console.log(myArray); // logs ['hello', 'world', undefined, '!'];
</javascript>

So 'push' is far more safe, especially if you don't know the size of your
array yet. With the index you not only assign values to array items, but also
access those.

<javascript caption="Accessing array items by index">
var myArray = [ 'hello', 'world', '!'];
console.log(myArray[2]);   // logs '!'
</javascript>

### Array methods and properties

## length

The 'length' property is used to know the amount of items in your array.

<javascript caption="Length of an array">
var myArray = [ 'hello', 'world', '!'];
console.log(myArray.length);   // logs 3
</javascript>

<javascript caption="For loops and arrays - a classic">
var myArray = ['hello', 'world', '!'];
for(var i = 0; i < myArray.length; i = i + 1) {
	console.log(myArray[i]);
}
</javascript>

## concat

With 'concat', you can concatenate two or more arrays

<javascript caption="Concatenating Arrays">
var myArray = [2, 3, 4];
var myOtherArray = [5, 6, 7];
var wholeArray = myArray.concat(myOtherArray); // [2, 3, 4, 5, 6, 7]
</javascript>

## join

'join' creates a string representation of your array. It's parameter is as string
which works as a seperator between elements (default is a comma);

<javascript caption="Joining elements">
var myArray = ['hello', 'world', '!'];
console.log(myArray.join(' ')); // logs "hello world !";
console.log(myArray.join()); 	// logs "hello,world,!"
console.log(myArray.join('')); 	// logs "helloworld!"
console.log(myArray.join('!!')) // logs "hello!!world!!!!!";
</javascript>

## pop

'pop' removes the last element of an array. It is the opposite method to 'push'

<javascript caption="pushing and popping">
var myArray = [];
myArray.push(0); // [ 0 ]
myArray.push(2); // [ 0 , 2 ]
myArray.push(7); // [ 0 , 2 , 7 ]
myArray.pop();   // [ 0 , 2 ]
</javascript>

## reverse 

As the name suggests, the elements of the array are in reverse order after calling
this method

<javascript caption="reverse">
var myArray = [ 'world' , 'hello' ];
myArray.reverse(); // [ 'hello', 'world' ]
</javascript>

## shift

Removes the first element of an array. With 'pop' and 'shift' you can recreate the
method of a [queue](http://en.wikipedia.org/wiki/Queue_(data_structure))

<javascript caption="queue with shift() and pop()">
var myArray = [];
myArray.push(0); // [ 0 ]
myArray.push(2); // [ 0 , 2 ]
myArray.push(7); // [ 0 , 2 , 7 ]
myArray.shift(); // [ 2 , 7 ]
</javascript>

## slice

Extracts a part of the array and returns them in a new one. This method takes one
parameter, which is the starting index.

<javascript caption="slicing">
var myArray = [1, 2, 3, 4, 5, 6, 7, 8];
var newArray = myArray.slice(3);

console.log(myArray);  // [1, 2, 3, 4, 5, 6, 7, 8]
console.log(newArray); // [4, 5, 6, 7, 8]
</javascript>

## splice

Removes a certain amount of elements and adds new ones at the given index. It takes
at least 3 parameters

<javascript caption="splice method">
myArray.splice(idx, len, values, ...);
</javascript>

* idx = the starting index
* len = the number of elements to remove
* values = the values which should be inserted at idx

For example:

<javascript caption="splice example">
var myArray = [0, 7, 8, 5];
myArray.splice(1, 2, 1, 2, 3, 4);
console.log(myArray); // [0, 1, 2, 3, 4, 5]
</javascript>

## sort

Sorts an array. It takes one parameter, which is a comparing function. If this function is not
given, the array is sorted ascending

<javascript caption="sorting without comparing function">
var myArray = [3, 4, 6, 1];
myArray.sort(); // 1, 3, 4, 6
</javascript>

<javascript caption="sorting with comparing function">
function descending(a, b) {
	return b - a;
}
var myArray = [3, 4, 6, 1];
myArray.sort(descending); // [6, 4, 3, 1]
</javascript>

The return value of descending (for this example) is important. If the return value is
less than zero, the index of a is before b, and if it is greater than zero it's vice-versa.
If the return value is zero, the elements index is equal.

## unshift

Inserts an element at the first position of the array

<javascript caption="unshift">
var myArray = [];
myArray.unshift(0); // [ 0 ]
myArray.unshift(2); // [ 2 , 0 ]
myArray.unshift(7); // [ 7 , 2 , 0 ]
</javascript>