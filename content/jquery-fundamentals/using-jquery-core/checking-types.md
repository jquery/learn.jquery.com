---
chapter : jquery-core
section : 3
title   : Checking types
attribution:  jQuery Fundamentals
---
## Checking types

As mentioned in the "JavaScript basics" section, jQuery offers a few basic utility methods for determining the type of a specific value.

<div class="example" markdown="1">
Checking the type of an arbitrary value

    var myValue = [1, 2, 3];
    
    // Using JavaScript's typeof operator to test for primative types
    typeof myValue == 'string'; // false
    typeof myValue == 'number'; // false
    typeof myValue == 'undefined'; // false
    typeof myValue == 'boolean'; // false
    
    // Using strict equality operator to check for null
    myValue === null; // false
    
    // Using jQuery's methods to check for non-primative types
    jQuery.isFunction(myValue); // false
    jQuery.isPlainObject(myValue); // false
    jQuery.isArray(myValue); // true
</div>