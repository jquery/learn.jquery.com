<script>{
	"title": "Queue & Dequeue Explained",
	"level": "advanced",
	"source": "http://jqueryfordesigners.com/api-queue-dequeue/"
}</script>

Queues are the foundation for all animations in jQuery, they allow a series functions to be executed asynchronously on an element.  Methods such as `.slideUp()`, `.slideDown()`, `.fadeIn()`, and `.fadeOut()` all use `.animate()`, which leverages *queues* to build up the series of steps that will transition one or more CSS values throughout the duration of the animation.

We can pass a callback function to the `.animate()` method, which will execute once the animation has completed.

```
$( ".box" )
	.animate( {
		height: 20
	}, "slow", function() {
		$( "#title" ).html( "We're in the animation, baby!" );
	} );
```

## Queues As Callbacks

Instead of passing a callback as an argument, we can add another function to the *queue* that will act as our callback. This will execute after all of the steps in the animation have completed.

```
$( ".box" )
	.animate( {
		height: 20
	}, "slow")
	.queue( function() {
		$( "#title" ).html( "We're in the animation, baby!" );
	} );

```

To add multiple functions to the queue, you can call `.queue()` multiple times.

```
$( ".box" )
	.animate( {
		height: 20
	}, "slow" )
	.queue( function() {
		console.log('I fired!');
	} )
	.animate( {
		height: 50
	}, "fast" )
	.queue( function() {
		console.log('I fired too!');
	} );
```

If you ran this example, you will have seen that the last animation never runs and the last callback doesn't fire. This is because we basically never told jQuery to continue. Inside of the first queued function, you will need to call `.dequeue()` to move forward to the next function in the queue.

```
.queue( function() {
	console.log('I fired!');
	$( this ).dequeue();
} )
```

Another way of *dequeuing* is by calling the function that is passed to your callback. That function will automatically call `.dequeue()` for you.

```
.queue( function(next) {
	console.log('I fired!');
	next();
} )
```

## Custom Queues

Up to this point all of our animation and queue examples have been using the default queue name which is `fx`.  Elements can have multiple queues attached to them, and we can give each of these queues a different name.  We can specify a custom queue name as the first argument to the `.queue()` method.

```
$( ".box" )
	.queue( "steps", function( next ) {
		console.log( "Step 1" );
		next();
	} )
	.queue( "steps", function( next ) {
		console.log( "Step 2" );
		next();
	} )
	.dequeue( "steps" );
```

Notice that we have to call the `.dequeue()` method passing it the name of our custom queue to start the execution. Every queue except for the default, `fx`, has to be manually kicked off by calling `.dequeue()` and passing it the name of the queue.

## Clearing The Queue

Since queues are just a set of ordered operations, our application may have some logic in place that needs to prevent the remaining queue entries from executing. We can do this by calling the `.clearQueue()` method, which will empty the queue.

```
$( ".box" )
	.queue( "steps", function( next ) {
		console.log( "I fired" );
		next();
	} )
  	.clearQueue( "steps" )
	.dequeue( "steps" );
```

In this example, nothing will happen as we removed everything from the `steps` queue.

Another way of clearing the queue is to call `.stop( true )`. That will stop the currently running animations and will clear the queue. 

## Replacing The Queue

When you pass an array of functions as second argument to `.queue()`, that array will replace the queue.

```
$( ".box" )
	.queue( "steps", function( next ) {
		console.log( "I won't fire" );
		next();
	} )
	.queue( "steps", [
		function( next ) {
			console.log( "I fired!" );
			next();
		}
  	] )
  	.dequeue( "steps" );
```

You can also call `.queue()` without passing it functions, which will return the queue of that element as an array.

```
$( ".box" ).queue( "steps", function( next ) {
	console.log( "I fired!" );
	next();
} );

console.log( $( ".box" ).queue( "steps" ) );

$('.box').dequeue( "steps" );
```
