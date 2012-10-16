---
title:        Arrays
---
Arrays are zero-indexed, ordered lists of values. They are a handy way to store a set of
related items of the same type (such as strings), though in reality, an array
can include multiple types of items, including other arrays.

To create an array you can either use the object constructor or the literal declaration,
by assigning your variable a list of values right after the declaration.

``` js
// A simple array
var myArray1 = new Array( 'hello', 'world' ); // with constructor
var myArray2 = [ 'hello', 'world' ]; // literal declaration, the preferred way
```

The literal declaration is preferred, see the 
[Google Coding Guidelines](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml#Array_and_Object_literals)
for more information.

If you don't know your values yet, it is also possible to declare an empty Array, and
add elements either through functions or through accessing by index:


``` js
// Creating empty arrays and adding values
var myArray = [];

myArray.push('hello'); // adds 'hello' on index 0
myArray.push('world'); // adds 'world' on index 1
myArray[2] = '!';	   // adds '!' on index 2
```

'push' is a function which adds an element on the end of the array and expands the array
respectively. You also can directly add items by index. Missing indices will be filled
with 'undefined';

``` js
// Leaving indices
var myArray = [];

myArray[0] = 'hello'; 
myArray[1] = 'world'; 
myArray[3] = '!';

console.log(myArray); // logs ['hello', 'world', undefined, '!'];
```

So 'push' is far more safe, especially if you don't know the size of your
array yet. With the index you not only assign values to array items, but also
access those.

``` js
// Accessing array items by index
var myArray = [ 'hello', 'world', '!'];
console.log(myArray[2]);   // logs '!'
```

### Array methods and properties

## length

The 'length' property is used to know the amount of items in your array.

``` js
// Length of an array
var myArray = [ 'hello', 'world', '!'];
console.log(myArray.length);   // logs 3
```

You will need the length property for looping through an array:

``` js
// For loops and arrays - a classic
var myArray = ['hello', 'world', '!'];
for(var i = 0; i < myArray.length; i = i + 1) {
	console.log(myArray[i]);
}
```

Except when you are using for ... in loops:

``` js
// For loops and arrays - alternate method
var myArray = ['hello', 'world', '!'];
for(var i in myArray) {
	console.log(myArray[i]);
}
```

## concat

With 'concat', you can concatenate two or more arrays

``` js
// Concatenating Arrays
var myArray = [2, 3, 4];
var myOtherArray = [5, 6, 7];
var wholeArray = myArray.concat(myOtherArray); // [2, 3, 4, 5, 6, 7]
```

## join

'join' creates a string representation of your array. It's parameter is as string
which works as a separator between elements (default is a comma);

``` js
// Joining elements
var myArray = ['hello', 'world', '!'];
console.log(myArray.join(' ')); // logs "hello world !";
console.log(myArray.join()); 	// logs "hello,world,!"
console.log(myArray.join('')); 	// logs "helloworld!"
console.log(myArray.join('!!')) // logs "hello!!world!!!!!";
```

## pop

'pop' removes the last element of an array. It is the opposite method to 'push'

``` js
// pushing and popping
var myArray = [];
myArray.push(0); // [ 0 ]
myArray.push(2); // [ 0 , 2 ]
myArray.push(7); // [ 0 , 2 , 7 ]
myArray.pop();   // [ 0 , 2 ]
```

## reverse 

As the name suggests, the elements of the array are in reverse order after calling
this method

``` js 
// reverse
var myArray = [ 'world' , 'hello' ];
myArray.reverse(); // [ 'hello', 'world' ]
```

## shift

Removes the first element of an array. With 'pop' and 'shift' you can recreate the
method of a [queue](http://en.wikipedia.org/wiki/Queue_(data_structure))

``` js 
// queue with shift() and pop()
var myArray = [];
myArray.push(0); // [ 0 ]
myArray.push(2); // [ 0 , 2 ]
myArray.push(7); // [ 0 , 2 , 7 ]
myArray.shift(); // [ 2 , 7 ]
```

## slice

Extracts a part of the array and returns them in a new one. This method takes one
parameter, which is the starting index.

``` js
// slicing
var myArray = [1, 2, 3, 4, 5, 6, 7, 8];
var newArray = myArray.slice(3);

console.log(myArray);  // [1, 2, 3, 4, 5, 6, 7, 8]
console.log(newArray); // [4, 5, 6, 7, 8]
```

## splice

Removes a certain amount of elements and adds new ones at the given index. It takes
at least 3 parameters

``` js
// splice method
myArray.splice(idx, len, values, ...);
```

* idx = the starting index
* len = the number of elements to remove
* values = the values which should be inserted at idx

For example:

``` js
// splice example
var myArray = [0, 7, 8, 5];
myArray.splice(1, 2, 1, 2, 3, 4);
console.log(myArray); // [0, 1, 2, 3, 4, 5]
```

## sort

Sorts an array. It takes one parameter, which is a comparing function. If this function is not
given, the array is sorted ascending

``` js
// sorting without comparing function
var myArray = [3, 4, 6, 1];
myArray.sort(); // 1, 3, 4, 6
```

``` js
// sorting with comparing function
function descending(a, b) {
	return b - a;
}
var myArray = [3, 4, 6, 1];
myArray.sort(descending); // [6, 4, 3, 1]
```

The return value of descending (for this example) is important. If the return value is
less than zero, the index of a is before b, and if it is greater than zero it's vice-versa.
If the return value is zero, the elements index is equal.

## unshift

Inserts an element at the first position of the array

``` js
// unshift
var myArray = [];
myArray.unshift(0); // [ 0 ]
myArray.unshift(2); // [ 2 , 0 ]
myArray.unshift(7); // [ 7 , 2 , 0 ]
```

## forEach

In modern browsers, like Chrome, Firefox and Internet Explorer 9 it is possible to traverse 
through arrays by a so called 'forEach' method, where you pass a function which is called
for each element in your array.

The function takes up to three arguments:
* element - The element itself
* index - The index of this element in the array
* array - The array itself

All of the are optional, but you will need at least the 'element' parameter in most cases.

``` js 
// native forEach
function printElement(elem) {
	console.log(elem);
}

function printElementAndIndex(elem, index) {
	console.log("Index " + index + ": " + elem);
}

function negateElement(elem, index, array) {
	array[index] = -elem;
}

myArray = [1, 2, 3, 4, 5];
myArray.forEach(printElement); //prints all elements to the console
myArray.forEach(printElementAndIndex); //prints "Index 0: 1" "Index 1: 2" "Index 2: 3" ...
myArray.forEach(negateElement); // myArray is now [-1, -2, -3, -4, -5]
```
