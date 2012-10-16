---
title:        Conditional Code
---
Sometimes you only want to run a block of code under certain conditions. Flow control — via if and else blocks — lets you run code only under certain conditions.

``` js
// Flow control
var foo = true;
var bar = false;

if (bar) {
    // this code will never run
    console.log('hello!');
}

if (bar) {
    // this code won't run
} else {
    if (foo) {
        // this code will run
    } else {
        // this code would run if foo and bar were both false
    }
}
```

<div class="note">
While curly braces aren't strictly required around single-line if statements,
using them consistently, even when they aren't strictly required, makes for
vastly more readable code.

Be mindful not to define functions with the same name multiple times within
separate if/else blocks, as doing so may not have the expected result.
</div>

## Truthy and Falsy Things

In order to use flow control successfully, it's important to understand which
kinds of values are "truthy" and which kinds of values are "falsy." Sometimes,
values that seem like they should evaluate one way actually evaluate another.

``` js
// Values that evaluate to true
'0';
'any string';
[];  // an empty array
{};  // an empty object
1;   // any non-zero number
```

``` js 
// Values that evaluate to false
'';  // an empty string
NaN; // JavaScript's "not-a-number" variable
null;
undefined;  // be careful -- undefined can be redefined!
```

## Conditional Variable Assignment with The Ternary Operator

Sometimes you want to set a variable to a value depending on some condition.
You could use an if/else statement, but in many cases the ternary operator is
more convenient. The ternary operator tests a condition; if the
condition is true, it returns a certain value, otherwise it returns a different
value.

``` js
The ternary operator
// set foo to 1 if bar is true;
// otherwise, set foo to 0
var foo = bar ? 1 : 0;
```

While the ternary operator can be used without assigning the return value to a
variable, this is generally discouraged.

## Switch Statements

Rather than using a series of if/else if/else blocks, sometimes it can be
useful to use a switch statement instead. Switch statements look
at the value of a variable or expression, and run different blocks of code
depending on the value.

``` js 
// A switch statement
switch (foo) {

    case 'bar':
        alert('the value was bar -- yay!');
    break;

    case 'baz':
        alert('boo baz :(');
    break;

    default:
        alert('everything else is just ok');
    break;

}
``` 

Switch statements have somewhat fallen out of favor in JavaScript, because
often the same behavior can be accomplished by creating an object that has more
potential for reuse, testing, etc. For example:

``` js
var stuffToDo = {
    'bar' : function() {
        alert('the value was bar -- yay!');
    },

    'baz' : function() {
        alert('boo baz :(');
    },

    'default' : function() {
        alert('everything else is just ok');
    }
};

if (stuffToDo[foo]) {
    stuffToDo[foo]();
} else {
    stuffToDo['default']();
}
```

We'll look at objects in greater depth later in this chapter.
