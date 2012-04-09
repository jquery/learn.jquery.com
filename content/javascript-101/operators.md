---
title:        Operators
attribution:  jQuery Fundamentals
---
Basic operators allow you to manipulate values.

<javascript caption="Concatenation">
var foo = 'hello';
var bar = 'world';
console.log(foo + ' ' + bar); // 'hello world'
</javascript>

<javascript caption="Multiplication and division">
2 * 3;
2 / 3;
</javascript>

<javascript caption="Incrementing and decrementing">
The pre-increment operator increments the operand before any further processing.
// pre-increment
var i = 1;
console.log(++i); // => 2
console.log(i); // => 2

The post-increment operator increments the operand after processing it.
// post-increment
var i = 1;
console.log(i++); // => 1. This is because i was processed first
console.log(i); // => 2. This is because the operand was incremented after processing in the previous step.
</javascript>

## Operations on Numbers & Strings

In JavaScript, numbers and strings will occasionally behave in ways you might
not expect.

<javascript caption="Addition vs. Concatenation">
var foo = 1;
var bar = '2';
console.log(foo + bar);  // 12. uh oh
</javascript>

<javascript caption="Forcing a string to act as a number">
var foo = 1;
var bar = '2';

// coerce the string to a number
console.log(foo + Number(bar));
</javascript>

The Number constructor, when called as a function (like above) will have the
effect of casting its argument into a number. You could also use the unary plus
operator, which does the same thing:

<javascript caption="Forcing a string to act as a number (using the unary-plus operator)">
console.log(foo + +bar);
</javascript>

## Logical Operators

Logical operators allow you to evaluate a series of operands using AND and OR
operations.

<javascript caption="Logical AND and OR operators">
var foo = 1;
var bar = 0;
var baz = 2;

foo || bar;   // returns 1, which is true
bar || foo;   // returns 1, which is true

foo && bar;   // returns 0, which is false
foo && baz;   // returns 2, which is true
baz && foo;   // returns 1, which is true
</javascript>

Though it may not be clear from the example, the `||` operator returns the value
of the first truthy operand, or, in cases where neither operand is truthy,
it'll return the last operand. The `&&` operator returns the value of
the first false operand, or the value of the last operand if both operands are
truthy.

Be sure to see the section called “Truthy and Falsy Things” for more
details on which values evaluate to true and which evaluate to false.

<div class="note" markdown="1">
You'll sometimes see developers use these logical operators for flow control
instead of using if statements. For example:

    // do something with foo if foo is truthy
    foo && doSomething(foo);

    // set bar to baz if baz is truthy;
    // otherwise, set it to the return
    // value of createBar()
    var bar = baz || createBar();

This style is quite elegant and pleasantly terse; that said, it can be really
hard to read, especially for beginners. I bring it up here so you'll recognize
it in code you read, but I don't recommend using it until you're extremely
comfortable with what it means and how you can expect it to behave.
</div>

## Comparison Operators

Comparison operators allow you to test whether values are equivalent or whether
values are identical.

<javascript caption="Comparison operators">
var foo = 1;
var bar = 0;
var baz = '1';
var bim = 2;

foo == bar;   // returns false
foo != bar;   // returns true
foo == baz;   // returns true; careful!

foo === baz;             // returns false
foo !== baz;             // returns true
foo === parseInt(baz);   // returns true

foo > bim;    // returns false
bim > baz;    // returns true
foo <= baz;   // returns true
</javascript>
