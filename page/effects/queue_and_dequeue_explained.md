---
title: Queue & Dequeue Explained
level: intermediate
---

Queues are the foundation for all animations in jQuery, they allow a series functions to be executed asynchronously on an element.  Methods such as `.slideUp()`, `.slideDown()`, `.fadeIn()`, and `.fadeOut()` all use `.animate()`, which leverages *queues* to build up the series of steps that will transition one or more CSS values throughout the duration of the animation.

We can pass a callback function to the `.animate()` method, that will execute once the animation has completed.  

```
$('#box')
  .animate({
    top: '100px',
    left: '100px'     
  }, 1000, function() { // callback for when the animation is complete
    console.log( 'animation complete!' );
  });
```

###Queues as Callbacks

Instead of passing a callback as an argument, we can add another function to the *queue* that will act as our callback.  This will execute after all of the steps in the animation have completed.

```
$('#box')
  .animate({
    top: '100px',
    left: '100px'     
  }, 1000)
  .queue(function() { // callback for when the animation is complete
    console.log( 'animation complete!' );
  });
```

Now, lets take a look at adding multiple callbacks to be executed once our animation has been completed.

```
$('#box')
  .animate({
    top: '100px',
    left: '100px'     
  }, 1000)
  .queue(function() { 
    console.log( 'first callback!' );
  })
  .queue(function() { // this won't execute
    console.log( 'second callback!' );
  })
```

If you ran this, you will notice that **'second callback!'** was not logged to the console.  This is because we have to tell jQuery that we are finished with the current entry and we want to move onto the next entry.  We do this by *dequeuing* the next entry, which we can do in one of two ways.  The first way is by directly calling the `.dequeue()` method.

```
$('#box')
  .animate({
    top: '100px',
    left: '100px'     
  }, 1000)
  .queue(function() {
    console.log( 'first callback!' );
    $(this).dequeue(); // proceed to the next entry
  })
  .queue(function() {
    console.log( 'second callback!' );
    $(this).dequeue(); // always call dequeue() even if it is the last entry
  });
```

The second means of *dequeuing* is to call the function that jQuery passes to our queue handler as an argument.  This function will step down to the next entry in the queue by calling `.dequeue()` for us automatically.

```
$('#box')
  .animate({
    top: '100px',
    left: '100px'     
  }, 1000)
  .queue(function( next ) { // assign named argument of 'next'
    console.log( 'first callback!' );
    next(); // call next() (which calls dequeue)
  })
  .queue(function( next ) {
    console.log( 'second callback!' );
    next(); // always call next() even if it is the last entry
  });
```

###Delaying Animations
Sometimes it may be necessary to delay the start of an animation.  Generally when we thinking of delaying something, `setTimeout()` comes to mind, which will work perfectly fine for delaying the start of an animation.  

```
setTimeout(function(){ // create a timeout for 2000ms
 $('#box')
  .animate({
    top: '100px',
    left: '100px'     
  }, 1000)
 }, 2000);
```

However, jQuery v1.4 introduced the `.delay()` method, which will delay the execution of next entry in the queue for a specified amount of time.  Since we know that all animations are ran via *queues*, we can call the `.delay()` method before calling `.animate()` and achieve the samething as our `setTimeout()` did in the previous example.

```
$('#box')
  .delay(2000) // delay the queue for 2000ms
  .animate({
    top: '100px',
    left: '100px'     
  }, 1000);
```

###Custom Queues
Up to this point all of our animation and queue examples have been using the default queue name which is *fx*.  Elements can have multiple queues attached to them, and we can give each of these queues a different name.  We can specify the custom queue name as the first argument to the `.queue()` method. 

```
$('#box')
  .queue('steps', function( next ) {
    console.log( 'step 1' );
    next();
  })
  .queue('steps', function( next ) {
    console.log( 'step 2' );
    next();
  })
  .queue('steps', function( next ) {
    console.log( 'step 3' );
    next();
  })
  .dequeue('steps'); // start our custom queue
```

Notice that we have to call the `.dequeue()` method to start executing our custom queue.  This is because any queue except for the default *fx* queue, has to be manually kicked off by calling `.dequeue()` and passing it the name of the queue.

Likewise, we can delay custom queues just like we did with animations and the default queues in the earlier examples. We do this by passing `.delay()` an additional parameter telling it the name of the custom queue to delay.

```
$('#box')
  .delay(1000, 'steps')
  .queue('steps', function( next ) {
    console.log( 'step 1' );
    next();
  })
  .delay(1000, 'steps')
  .queue('steps', function( next ) {
    console.log( 'step 2' );
    next();
  })
  .delay(1000, 'steps')
  .queue('steps', function( next ) {
    console.log( 'step 3' );
    next();
  })
  .dequeue('steps'); // start our custom queue
```

Since queues are just a set of ordered operations, our application may have some logic in place that needs to stop the remaining queue entries from executing.  We can do this by calling the `.clearQueue()` method, which will empty the queue and in this example will prevent steps 2 and 3 from executing.  

```
$('#box')
  .queue('steps', function( next ) {
    console.log( 'step 1' );
    if(1 === 1){ // some condition
      $(this).clearQueue('steps');
    }
    next();
  })
  .queue('steps', function( next ) {
    console.log( 'step 2' );
    next();
  })
  .queue('steps', function( next ) {
    console.log( 'step 3' );
    next();
  })
  .dequeue('steps'); 
```

###hoverIntent Plugin
There is a popular jQuery plugin called **hoverIntent**, that aims to determine a users intent when hovering over an element.  It delays the firing of *mouseenter* event by a specified amount of time.  Now that we understand how to use `.delay()` and `.clearQueue()`, we can mimic the functionality of this plugin with just a few lines of code.

```
$('#box').hover(
  function( event ) {
    $(this)
      .delay(200)
      .animate({
        height: '+=50px'
      }, 500);
  },
  function( event ) {
    $(this)
      .clearQueue()
      .animate({
        height: '50px'
      }, 500);
  }
);
```

###Fun with Queues
When creating queues we are not just limited to attaching them to a DOM element, we can also attach them to any jQuery object, in this case an empty object.

```
$({})
  .queue('steps', function( next ) {
    console.log( 'step 1' );
    next();
  })
  .queue('steps', function( next ) {
    console.log( 'step 2' );
    next();
  })
  .dequeue('steps');
```

The easiest way to understand queues is to think of them as an array of functions, because that is exactly what they are.  

```
$('#box')
  .queue('steps', function( next ) {
    console.log( 'step 1' );
    next();
  })
  .queue('steps', function( next ) {
    console.log( 'step 2' );
    next();
  })
  .queue('steps', function( next ) {
    console.log( 'step 3' );
    next();
  });
console.log( $('#box').queue('steps') ); // [function(), function(), function()]
```

Since queues are arrays, we can manipulate them just as we would any other array as well as pass the `.queue()` method an array.

```
theSteps = [ // setup the initial steps
  function( next ) {
    console.log( 'step 1' );
    next();
  },
  function( next ) {
    console.log( 'step 2' );
    next();
  }
];
$('#box').queue('steps', theSteps); // add the initial steps to the queue
theQueue = $('#box').queue('steps'); // get the queue
theQueue.unshift(function( next ) { // prepend a step to the queue
   console.log( 'beginning of the queue' );
   next();   
});
theQueue.push(function( next ) { // append a step to the queue
   console.log( 'end of the queue' );
   next();   
});
$('#box').dequeue('steps'); // run the queue
```

Queues are extremely powerful, as we have seen they are what drives all of the animations in jQuery.  We can leverage custom queues along with jQuery animations, to build a complex series of actions and execute it asynchronously in an ordered manner.  

