---
title:        Conditional Code
level:        beginner
source: http://jqfundamentals.com/legacy
attribution:
  - jQuery Fundamentals
---

Sometimes a block of code should only be run under certain conditions. Flow control – via `if` and `else` blocks – lets you run code if certain conditions have been met.

```
// Flow control

var foo = true;
var bar = false;

if ( bar ) {
	// This code will never run.
	console.log( "hello!" );
}

if ( bar ) {

	// This code won't run.

} else {

	if ( foo ) {
		// This code will run.
	} else {
		// This code would run if foo and bar were both false.
	}

}
```

While curly braces aren't strictly required around single-line `if` statements, using them consistently, even when they aren't strictly required, makes for vastly more readable code.

Be mindful not to define functions with the same name multiple times within separate `if`/`else` blocks, as doing so may not have the expected result.

## Truthy and Falsy Things

In order to use flow control successfully, it's important to understand which kinds of values are "truthy" and which kinds of values are "falsy." Sometimes, values that seem like they should evaluate one way actually evaluate another.

```
// Values that evaluate to true:
"0";
"any string";
[]; // An empty array.
{}; // An empty object.
1; // Any non-zero number.
```

```
// Values that evaluate to false:
""; // An empty string.
NaN; // JavaScript's "not-a-number" variable.
null;
undefined; // Be careful -- undefined can be redefined!
0; // The number zero.
```

## Conditional Variable Assignment with the Ternary Operator

Sometimes a variable should be set depending on some condition. An `if`/`else` statement works, but in many cases the ternary operator is more convenient. The ternary operator tests a condition; if the condition is true, it returns a certain value, otherwise it returns a different value.

The ternary operator:

```
// Set foo to 1 if bar is true; otherwise, set foo to 0:
var foo = bar ? 1 : 0;
```

While the ternary operator can be used without assigning the return value to a variable, this is generally discouraged.

## Switch Statements

Rather than using a series of `if`/`else` blocks, sometimes it can be useful to use a `switch` statement instead. `switch` statements look at the value of a variable or expression, and run different blocks of code depending on the value.

```
// A switch statement

switch ( foo ) {

	case "bar":
		alert( "the value was bar -- yay!" );
		break;

	case "baz":
		alert( "boo baz :(" );
		break;

	default:
		alert( "everything else is just ok" );

}
```

Switch statements have somewhat fallen out of favor in JavaScript, because often the same behavior can be accomplished by creating an object that has more potential for reuse or testing. For example:

```
var stuffToDo = {

	"bar": function() {
		alert( "the value was bar -- yay!" );
	},

	"baz": function() {
		alert( "boo baz :(" );
	},

	"default": function() {
		alert( "everything else is just ok" );
	}

};

if ( stuffToDo[ foo ] ) {

	stuffToDo[ foo ]();

} else {

	stuffToDo[ "default" ]();

}
```

Objects are covered further in the [Types](/types/) and [Objects](/objects/) sections.
