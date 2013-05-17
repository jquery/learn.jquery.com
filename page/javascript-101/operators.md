---
title:        Operators
level:        beginner
source: http://jqfundamentals.com/legacy
attribution:
  - jQuery Fundamentals
---

Basic operators allow you to manipulate values.

```
// Concatenation
var foo = "hello";
var bar = "world";

console.log( foo + " " + bar ); // "hello world"
```

```
// Multiplication and division
2 * 3;
2 / 3;
```

```
// Incrementing and decrementing
// The pre-increment operator increments the operand before any further processing.
var i = 1;
console.log( ++i ); // 2 - because i was incremented before evaluation
console.log( i );   // 2

// The post-increment operator increments the operand after processing it.
var i = 1;
console.log( i++ ); // 1 - because i was evaluated to 1 and _then_ incremented
console.log( i );   // 2 - incremented after using it
```

## Operations on Numbers & Strings

In JavaScript, numbers and strings will occasionally behave in unexpected ways.

```
// Addition vs. Concatenation
var foo = 1;
var bar = "2";

console.log( foo + bar ); // 12
```

```
// Coercing a string to act as a number.
var foo = 1;
var bar = "2";

console.log( foo + Number(bar) ); // 3
```

The `Number` constructor, when called as a function (as in the above example), will have the effect of casting its argument into a number. The unary plus operator also does the same thing:

```
// Forcing a string to act as a number (using the unary plus operator).
console.log( foo + +bar ); // 3
```

## Logical Operators

Logical operators allow evaluation of a series of operands using AND (`&&`) and OR (`||`) operations.

```
// Logical AND and OR operators

var foo = 1;
var bar = 0;
var baz = 2;

// returns 1, which is true
foo || bar;

// returns 1, which is true
bar || foo;

// returns 0, which is false
foo && bar;

// returns 2, which is true
foo && baz;

// returns 1, which is true
baz && foo;
```

In the above example, the `||` operator returns the value of the first truthy operand, or in cases where neither operand is truthy, it returns the last operand. The `&&` operator returns the value of the first false operand, or the value of the last operand if both operands are truthy.

You'll sometimes see developers use these logical operators for flow control instead of using `if` statements. For example:

```
// Do something with foo if foo is truthy.
foo && doSomething( foo );

// Set bar to baz if baz is truthy;
// otherwise, set it to the return value of createBar()
var bar = baz || createBar();
```

This style is quite elegant and pleasantly terse; that said, it can be really hard to read or use, especially for beginners. See the section on truthy and falsy things in the [Conditional Code](/conditional-code/) article for more about evaluating truthiness.

## Comparison Operators

Comparison operators allow you to test whether values are equivalent or whether values are identical.

```
// Comparison operators

var foo = 1;
var bar = 0;
var baz = "1";
var bim = 2;

foo == bar; // false
foo != bar; // true
foo == baz; // true; but note that the types are different

foo === baz;             // false
foo !== baz;             // true
foo === parseInt( baz ); // true

foo > bim;  // false
bim > baz;  // true
foo <= baz; // true
```

For more information about comparison operators, visit the [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Operators/Comparison_Operators "MDN - Comparison Operators").
