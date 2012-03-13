---
chapter :     js10
section:      4
title:        Loops
attribution:  jQuery Fundamentals
---
Loops let you run a block of code a certain number of times.

<javascript caption="A for loop">
    // logs 'try 0', 'try 1', ..., 'try 4'
    for (var i=0; i<5; i++) {
        console.log('try ' + i);
    }
</javascript>

<div class="note" markdown="1">
Note that in Loops even though we use the keyword var before
the variable name i, this does not "scope" the variable i to the loop block.
We'll discuss scope in depth later in this chapter.
</div>

## The `for` loop

A `for` loop is made up of four statements and has the following structure:

    for ([initialisation]; [conditional]; [iteration]) {
     [loopBody]
    }

The _initialisation_ statement is executed only once, before the loop starts. It
gives you an opportunity to prepare or declare any variables.

The _conditional_ statement is executed before each iteration, and its return
value decides whether or not the loop is to continue. If the conditional
statement evaluates to a falsey value then the loop stops.

The _iteration_ statement is executed at the end of each iteration and gives you
an opportunity to change the state of important variables. Typically, this will
involve incrementing or decrementing a counter and thus bringing the loop ever
closer to its end.

The _loopBody_ statement is what runs on every iteration. It can contain anything
you want. You'll typically have multiple statements that need to be executed
and so will wrap them in a block ( {...}).

Here's a typical for loop:

<javascript caption="A typical for loop">
    for (var i = 0, limit = 100; i < limit; i++) {
      // This block will be executed 100 times
      console.log('Currently at ' + i);
      // Note: the last log will be "Currently at 99"
    }
</javascript>

## The `while` loop

A while loop is similar to an if statement, except that its body will keep
executing until the condition evaluates to false.

    while ([conditional]) {
      [loopBody]
    }

Here's a typical while loop:

<javascript caption="A typical while loop">
    var i = 0;
    while (i < 100) {
      // This block will be executed 100 times
      console.log('Currently at ' + i);

      i++; // increment i
    }
</javascript>

You'll notice that we're having to increment the counter within the loop's
body. It is possible to combine the conditional and incrementer, like so:

<javascript caption="A while loop with a combined conditional and incrementer">
    var i = -1;
    while (++i < 100) {
      // This block will be executed 100 times
      console.log('Currently at ' + i);
    }
</javascript>

Notice that we're starting at -1 and using the prefix incrementer (++i).

## The `do-while` loop

This is almost exactly the same as the while loop, except for the fact that the
loop's body is executed at least once before the condition is tested.

    do {
      [loopBody]
    } while ([conditional])

Here's a do-while loop:

<javascript caption="A do-while loop">
    do {
      // Even though the condition evaluates to false
      // this loop's body will still execute once.

      alert('Hi there!');

    } while (false);
</javascript>

These types of loops are quite rare since only few situations require a loop
that blindly executes at least once. Regardless, it's good to be aware of it.

## Breaking and continuing

Usually, a loop's termination will result from the conditional statement not
evaluating to true, but it is possible to stop a loop in its tracks from within
the loop's body with the break statement.

<javascript caption="Stopping a loop">
    for (var i = 0; i < 10; i++) {
      if (something) {
        break;
      }
    }
</javascript>

You may also want to continue the loop without executing more of the loop's
body. This is done using the continue statement.


<javascript caption="Skipping to the next iteration of a loop">
    for (var i = 0; i < 10; i++) {
      if (something) {
          continue;
      }

      // The following statement will only be executed
      // if the conditional 'something' has not been met
      console.log('I have been reached');
    }
</javascript>
