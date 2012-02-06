---
chapter:      javascript-101
section:      2
title:        Types
attribution:  jQuery Fundamentals
github: jquery
---

The types in JavaScript fall into two categories; primitives and objects. The primitive types include:

* string
* number
* boolean
* null
* undefined

### String

String types are text wrapped in single or double quotation marks, but it is best practice to stick with a consistent variation. There may be times when the string contains quotation marks that collide with the ones used to create the string; in this case we must either escape the characters using a `\` backslash or use different quotes around the string.

<javascript caption="Strings can created with double or single quotes.">
var a = "I am a string";
var b = 'So am I!';

alert(a);
alert(b);
</javascript>

<javascript caption="Sometimes a string may contain quotation marks.">
var statement1 = 'He said "JavaScript is awesome!"';
var statement2 = "He said \"JavaScript is awesome!\"";
</javascript>

### Number

Number types are just any positive or negative numeric value, there is no distinction between integer and floating point values.

<javascript caption="Numbers are any whole or floating point integer.">
var num1 = 100;
var num2 = 100.10;
var num3 = 0.10;
</javascript>

### Boolean
Boolean types are just simply true or false. 

<javascript caption="Boolean values.">
var okay = true;
var fail = false;
</javascript>

### Undefined and Null

Undefined and null are special types in JavaScript. Null types are a value that represent the absence of a value, this is similar to many other programming languages. Undefined types represent a state in which no value has been assigned at all, you can achieve this type in two ways; by using the undefined keyword or by just not defining a value at all.

<javascript caption="Two ways to acheive an undefined value.">
var foo = null;

var bar1 = undefined;
var bar2;
</javascript>

### Objects

Everything else is in JavaScript is considered an Object. While there are [numerous built-in objects](https://developer.mozilla.org/en/JavaScript/Reference#Global_Objects, "MDN - Global Object Reference"), the ones we will focus on in this chapter are:

* Object
* Array
* Function

The simplist way to create an object is either through the Object constructor or the short hand syntax other wise known as an object literal. These simple objects are unordered key/value pairs; the key is formally known as a property and the value can be any valid JavaScript type, even another object. To create or access a property on an object, we use what is known as "dot notation" or "bracket notation". 

<javascript caption="Simple objects using the constructor or the literal syntax.">
var person1 = new Object;

person1.firstName = "John";
person1.lastName = "Doe";

alert(person1.firstName + " " + person1.lastName);

var person2 = {
    firstName: "Jane",
    lastName: "Doe"
};

alert(person2.firstName + " " + person2.lastName);
</javascript>

<javascript caption="As mentioned, objects can also have objects as a property.">
var people = {};

people['person1'] = person1;
people['person2'] = person2;

alert(people['person1'].firstName);
alert(people['person2'].firstName);
</javascript>

What happens if a property is accessed which has not been *defined* yet? Well, it will be a type of undefined.

<javascript caption="Properties that have not been created are undefined.">
var person = { name: "John Doe" };
alert(person.email); // => undefined
</javascript>

### Array

Arrays are a type of object which are ordered by the index of each item that it contains; this index starts at zero and extends to however many items have been added, also known as the "length" of the array which happens to be a property as well. Similar to a basic object, an array can be created with the Array Constructor or the short hand syntax known as an array literal.

<javascript caption="Creating an array with initial items">
var foo = new Array;
var bar = [];
</javascript>

There is an important distinction to be made between the two though. An array literal can contain items to be added to the array upon creating it, the same is possisble for the Array Constructor. However, if just a single numeric item is passed in, the Array Constructor will assume its length to be that value.

<javascript caption="">
var foo = [100];
alert(foo[0]);
alert(foo.length);

var bar = new Array(100);
alert(bar[0]);
alert(bar.length);  
</javascript>

An array can be manipulated through the methods that are avaiable on the instance and items can be accessed using bracket notation with a given index, the value will be undefined if the index does not exists or contains no value.

<javascript caption="Using the push(), pop(), unshift() and shift() methods.">
var foo = [];

foo.push('a');
foo.push('b');

alert(foo[0]);
alert(foo[1]);

alert(foo.length);

foo.pop();

alert(foo[0]);
alert(foo[1]);

alert(foo.length);

foo.unshift('z');

alert(foo[0]);
alert(foo[1]);

alert(foo.length);

foo.shift();

alert(foo[0]);
alert(foo[1]);

alert(foo.length);
</javascript>

There are many more methods for manipulating arrays, details can be found on the [MDN Document](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array "MDN - Array Reference")









