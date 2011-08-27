---
chapter :     js101
section:      6
title:        Arrays
attribution:  jQuery Fundamentals
---
Arrays are zero-indexed lists of values. They are a handy way to store a set of
related items of the same type (such as strings), though in reality, an array
can include multiple types of items, including other arrays.

<div class="example" markdown="1">
A simple array

    var myArray = [ 'hello', 'world' ];
</div>

<div class="example" markdown="1">
Accessing array items by index

    var myArray = [ 'hello', 'world', 'foo', 'bar' ];
    console.log(myArray[3]);   // logs 'bar'
</div>

<div class="example" markdown="1">
Testing the size of an array

    var myArray = [ 'hello', 'world' ];
    console.log(myArray.length);   // logs 2
</div>

<div class="example" markdown="1">
Changing the value of an array item

    var myArray = [ 'hello', 'world' ];
    myArray[1] = 'changed';
</div>

While it's possible to change the value of an array item as shown in “Changing
the value of an array item”, it's generally not advised.

<div class="example" markdown="1">
Adding elements to an array

    var myArray = [ 'hello', 'world' ];
    myArray.push('new');
</div>

<div class="example" markdown="1">
Working with arrays

    var myArray = [ 'h', 'e', 'l', 'l', 'o' ];
    var myString = myArray.join('');   // 'hello'
    var mySplit = myString.split('');  // [ 'h', 'e', 'l', 'l', 'o' ]
</div>
