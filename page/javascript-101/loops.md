---
title:        Loops
level:        beginner
source: http://jqfundamentals.com/legacy
attribution:
  - jQuery Fundamentals
---

Loops let a block of code run a certain number of times:

```
for ( var i = 0; i < 5; i++ ) {
	// Logs "try 0", "try 1", ..., "try 4".
	console.log( "try " + i );
}
```

Note that in loops, the variable `i` is not "scoped" to the loop block even though the keyword `var` is used before the variable name. Scope is covered in more depth in the [Scope](/scope/) section.

## The `for` Loop

A `for` loop is made up of four statements and has the following structure:

```
for ( [initialisation]; [conditional]; [iteration] ) {

	[loopBody]

}
```

The _initialisation_ statement is executed only once, before the loop starts. It gives you an opportunity to prepare or declare any variables.

The _conditional_ statement is executed before each iteration, and its return value decides whether the loop is to continue. If the conditional statement evaluates to a falsy value, then the loop stops.

The _iteration_ statement is executed at the end of each iteration and gives you an opportunity to change the state of important variables. Typically, this will involve incrementing or decrementing a counter and thus bringing the loop closer to its end.

The _loopBody_ statement is what runs on every iteration. It can contain anything. Typically, there will be multiple statements that need to be executed, and should be wrapped in a block (`{...}`).

Here's a typical `for` loop:

```
for (var i = 0, limit = 100; i < limit; i++) {
	// This block will be executed 100 times.
	console.log( "Currently at " + i );
	// Note: The last log will be "Currently at 99".
}
```

## The `while` loop

A while loop is similar to an `if` statement, except that its body will keep executing until the condition evaluates to a falsy value.

```
while ( [conditional] ) {

	[loopBody]

}
```

Here's a typical `while` loop:

```
var i = 0;
while ( i < 100 ) {
	// This block will be executed 100 times.
	console.log( "Currently at " + i );
	i++; // Increment i
}
```

Notice that the counter is incrementing within the loop's body. It's possible to combine the conditional and incrementer, like so:

```
var i = -1;
while ( ++i < 100 ) {
	// This block will be executed 100 times.
	console.log( "Currently at " + i );
}
```

Notice that the counter starts at -1 and uses the prefix incrementer (`++i`).

## The `do-while` Loop

This is almost exactly the same as the `while` loop, except for the fact that the loop's body is executed at least once before the condition is tested.

```
do {

	[loopBody]

} while ( [conditional] )
```

Here's a `do-while` loop:

```
do {
	// Even though the condition evaluates to false
	// this loop's body will still execute once.
	alert( "Hi there!" );

} while ( false );
```

These types of loops are quite rare since only few situations require a loop that blindly executes at least once. Regardless, it's good to be aware of it.

## Breaking and Continuing

Usually, a loop's termination will result from the conditional statement not evaluating to a truthy value, but it is possible to stop a loop in its tracks from within the loop's body with the `break` statement:

```
// Stopping a loop
for ( var i = 0; i < 10; i++ ) {
	if ( something ) {
		break;
	}
}
```

You may also want to continue the loop without executing more of the loop's body. This is done using the `continue` statement:

```
// Skipping to the next iteration of a loop
for ( var i = 0; i < 10; i++ ) {
	if ( something ) {
		continue;
	}

	// The following statement will only be executed
	// if the conditional "something" has not been met
	console.log( "I have been reached" );

}
```
