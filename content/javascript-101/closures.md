---
chapter :     js101
section:      12
title:        Closures
attribution:  jQuery Fundamentals
---

Closures are an extension of the concept of scope -- functions have access to
variables that were available in the scope where the function was created. If
that’s confusing, don’t worry: closures are generally best understood by
example.

In the functions section, we saw how functions have access to changing
variable values. The same sort of behavior exists with functions defined within
loops -- the function "sees" the change in the variable's value even after the
function is defined, resulting in all clicks alerting 5.

<div class="example" markdown="1">
How to lock in the value of i?

    /* this won't behave as we want it to; */
    /* every click will alert 5 */
    for (var i=0; i<5; i++) {
      $('<p>click me</p>').appendTo('body').click(function() {
        alert(i);
      });
    }
</div>

<div class="example" markdown="1">
Locking in the value of i with a closure

    /* fix: “close” the value of i inside createFunction, so it won't change */
    var createFunction = function(i) {
      return function() { alert(i); };
    };

    for (var i=0; i<5; i++) {
      $('<p>click me</p>').appendTo('body').click(createFunction(i));
    }
</div>

Closures can also be used to resolve issues with the this keyword, which is
unique to each scope:

<div class="example" markdown="1">
Using a closure to access inner and outer object instances simultaneously

    var outerObj = {
        myName : 'outer',
        outerFunction : function () {
          // provide a reference to outerObj through innerFunction's closure
          var self = this;

          var innerObj = {
            myName : 'inner',
            innerFunction : function () {
              console.log(self.myName, this.myName); // logs 'outer inner'
            }
          };

          innerObj.innerFunction();

          console.log(this.myName); // logs 'outer'
        }
    };

    outerObj.outerFunction();
</div>

This mechanism can be particularly useful when dealing with callbacks, though
in those cases, it is often better to use `Function.bind`, which will avoid any
overhead associated with scope traversal.
