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
overhead associated with scope traversal. In case you haven't used this before, let
us now explore a brief introduction.

`Function.bind` is used to create a new function, which when called, itself then
calls this function in the context of the supplied 'this' value, using a given set
of arguments which will precede any arguments provided when the new function was 
initially called.

As `bind` is a recent addition to ECMAScript 5, it may not be present in all browsers,
which is something to be wary of when deciding whether to use it or not. It is however
possible to work around support by using the following shim, which whilst a partial 
implementation only, may be sufficient as a temporary bridge until `bind` is widely 
adopted according to the specification.

<div class="example" markdown="1">
if ( !Function.prototype.bind ) {
  Function.prototype.bind = function( obj ) {
    var slice = [].slice,
        args = slice.call(arguments, 1), 
        self = this, 
        nop = function () {}, 
        bound = function () {
          return self.apply( this instanceof nop ? this : ( obj || {} ), 
                              args.concat( slice.call(arguments) ) );    
        };

    nop.prototype = self.prototype;
    bound.prototype = new nop();
    return bound;
  };
}
</div>

One of the simplest uses of `bind` is making a function, which regardless of how it's 
called, is called with a particular value for `this`. A common mistake made is 
attempting to extract a method from an object, then later calling that function and 
expecting it to the use the origin object as it's `this`. This however can be solved 
by creating a bound function using the original object as demonstrated below.

<div class="example" markdown="1">
//lets manipulate "this" with a basic example
var user = "johnsmith",
    module = {
        getUser: function(){
            return this.user;
        },
        user: "janedoe"
    };

//module.getUser() is called where "module" is "this" and "module.user" is returned.
module.getUser();
//janedoe

//let's now store a reference in the global version of "this"
var getUser = module.getUser;

//getUser() called, "this" is global, "user" is returned
getUser();
//johnsmith

//store a ref with "module" bound as "this"
var boundGetUser = getUser.bind(module);  

//boundGetUser() called, "module" is "this" again, "module.user" returned.
boundGetUser();
//janedoe
</div>