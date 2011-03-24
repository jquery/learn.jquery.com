---
chapter:      js101
section:      1
title:        Syntax Basics
attribution:  jQuery Fundamentals
---
Understanding statements, variable naming, whitespace, and other basic JavaScript syntax.

<div class="example" markdown="1">
A simple variable declaration

    var foo = 'hello world';
</div>

<div class="example" markdown="1">
Whitespace has no meaning outside of quotation marks

    var foo =         'hello world';
</div>

<div class="example" markdown="1">
Parentheses indicate precedence

    2 * 3 + 5;    // returns 11; multiplication happens first
    2 * (3 + 5);  // returns 16; addition happens first
</div>

<div class="example" markdown="1">
Tabs enhance readability, but have no special meaning

    var foo = function() {
        console.log('hello');
    };
</div>
