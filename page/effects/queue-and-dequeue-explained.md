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
		$( "#title" ).html( "We're in the callback, baby!" );
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

		// This tells jQuery to continue to the next item in the queue
		$( this ).dequeue();
	} );

```

In this example, the queued function will execute right after the animation.

jQuery does not have any insight into how the queue items function, so we need to call `.dequeue()`, which tells jQuery when to move to the next item in the queue.

Another way of *dequeuing* is by calling the function that is passed to your callback. That function will automatically call `.dequeue()` for you.

```
.queue( function( next ) {
	console.log( "I fired!" );
	next();
} );
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
		console.log( "Will never log because we clear the queue" );
		next();
	} )
	.clearQueue( "steps" )
	.dequeue( "steps" );
```

In this example, nothing will happen as we removed everything from the `steps` queue.

Another way of clearing the queue is to call `.stop( true )`. That will stop the currently running animations and will clear the queue.

## Replacing The Queue

When you pass an array of functions as the second argument to `.queue()`, that array will replace the queue.

```
$( ".box" )
	.queue( "steps", function( next ) {
		console.log( "I will never fire as we totally replace the queue" );
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

$( ".box" ).dequeue( "steps" );
```
