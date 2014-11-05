<script>{
	"title": "Queue & Dequeue Explained",
	"level": "advanced",
	"source": "http://jqueryfordesigners.com/api-queue-dequeue/"
}</script>

When you use the `.animate()`, `.show()`, `.hide()`, `.slideUp()`, etc. effect methods, you're adding a job to the effects queue. By default, using `.queue()` and passing a function, will add it to the effects queue. So we're creating our own bespoke animation step:

```
$( ".box" )
	.animate({
		height: 20
	}, "slow" )
	.queue(function() {
		$( "#title" ).html( "We're in the animation, baby!" );
	});
```

As I said though, these methods come in pairs, so anything you add using `.queue()`, you need to dequeue to allow the process to continue. In the code above, if I chained more animations on, until I call `$( this ).dequeue()`, the subsequent animations wouldn't run:

```
$( ".box" )
	.animate({
		height: 20
	}, "slow" )
	.queue(function() {
		$( "#title" ).html( "We're in the animation, baby!" );
		$( this ).dequeue();
	}).animate({
		height: 150
	});
```

Keeping in mind that the animation won't continue until we've explicitly called `.dequeue()`, we can easily create a pausing plugin, by adding a step in the queue that sets a timer and triggers after `delay` milliseconds, at which time, it dequeues the element:

```
$.fn.pause = function( delay ) {
	return this.queue(function() {
		var elem = this;
		setTimeout(function() {
			return $( elem ).dequeue();
		}, delay );
	});
};

$( ".box" )
	.animate({
		height: 20
	}, "slow" )
	.pause( 1000 )
	.animate({
		height: 150
	});
```

Remember that the first argument for `.queue()` and `.dequeue()` is `fx`, and that in all of these examples I'm not including it because jQuery sets the argument to `fx` by default — so I don't have to specify it.
