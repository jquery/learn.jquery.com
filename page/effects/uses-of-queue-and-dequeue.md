---
title:        The uses of jQuery .queue() and .dequeue()
level:        advanced
source:       http://gnarf.net/2010/09/30/the-uses-of-jquery-queue-and-dequeue/
---

Queues in jQuery are used for animations. You can use them for any purpose you
like. They are an array of functions stored on a per element basis, using
`jQuery.data()`. They are First In, First Out (FIFO). You can add a function to the
queue by calling `.queue()`, and you remove (by calling) the functions using
`.dequeue()`.

To understand the internal jQuery queue functions, reading the source and
looking at examples helps me out tremendously. One of the best examples of a
queue function I've seen is `.delay()`:

```
$.fn.delay = function( time, type ) {

	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;

	type = type || "fx";

	return this.queue( type, function() {

		var elem = this;

		setTimeout(function() {

			jQuery.dequeue( elem, type );

		}, time );

	});

};
```

## The default queue – fx

The default queue in jQuery is `fx`. The default queue has some special
properties that are not shared with other queues.

- Auto Start: When calling `$(elem).queue( function() {} );` the fx queue will
  automatically dequeue the next function and run it if the queue hasn't
  started.
- &ldquo;inprogress&rdquo; sentinel: Whenever you `dequeue()` a function from the fx queue,
  it will `unshift()` (push into the first location of the array) the string
  &ldquo;inprogress&rdquo; — which flags that the queue is currently being run.
- It's the default! The fx queue is used by `.animate()` and all functions that
  call it by default.

**Note:** If you are using a custom queue, you must manually `.dequeue()` the functions, they will not auto start!

## Retrieving/Setting the queue

You can retrieve a reference to a jQuery queue by calling `.queue()` without a
function argument. You can use the method if you want to see how many items are
in the queue. You can use `push`, `pop`, `unshift`, and `shift` to manipulate the queue in
place. You can replace the entire queue by passing an array to the `.queue()`
function.

## Quick Examples:

```
// Let's assume elem is a jQuery object that points to some element we are animating.
var queue = elem.queue();

// Remove the last function from the animation queue.
var lastFunc = queue.pop();

// Insert it at the beginning:
queue.unshift( lastFunc );

// Replace queue with the first three items in the queue.
elem.queue( queue.slice( 0, 3 ) );
```

### An animation (fx) queue example:

```
$(function() {
	// Let's do something with Google Maps:
	var canvas = $( "#map_canvas" );

	var myLatlng = new google.maps.LatLng( -34.397, 150.644 );

	var myOptions = {
		zoom: 8,
		center: myLatlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	var geocoder = new google.maps.Geocoder();

	var map = new google.maps.Map( canvas[0], myOptions );

	var resized = function() {
		// simple animation callback - let maps know we resized
		google.maps.event.trigger( map, "resize" );
	};

	canvas.delay( 2000 ); // Wait for two seconds.

	// resize the div:
	canvas.animate({
		width: 250,
		height: 250,
		marginLeft: 250,
		marginTop:250
	}, resized );

	// geocode something
	canvas.queue(function( next ) {
		// find stackoverflow's whois address:
		geocoder.geocode( {
			address: "55 Broadway New York NY 10006"
		}, handleResponse );

		function handleResponse( results, status ) {
			if ( status === google.maps.GeocoderStatus.OK ) {
				var location = results[ 0 ].geometry.location;
				map.setZoom( 13 );
				map.setCenter( location );
				new google.maps.Marker({
					map: map,
					position: location
				});
			}

			// geocoder result returned, continue with animations:
			next();
		}
	});

	// after we find stack overflow, wait 3 more seconds
	canvas.delay( 3000 );

	// and resize the map again
	canvas.animate({
		width: 500,
		height: 500,
		marginLeft:0,
		marginTop: 0
	}, resized );
});
```

### Queueing something like Ajax Calls:

```
// jQuery on an empty object, we are going to use this as our queue
var ajaxQueue = $({});

$.ajaxQueue = function( ajaxOpts ) {
	// Hold the original complete function.
	var oldComplete = ajaxOpts.complete;

	// Queue our ajax request.
	ajaxQueue.queue(function( next ) {
		// Create a complete callback to fire the next event in the queue.
		ajaxOpts.complete = function() {
			// Fire the original complete if it was there.
			if ( oldComplete ) {
				oldComplete.apply( this, arguments );
			}
			// Run the next query in the queue.
			next();
		};

		// Run the query.
		$.ajax( ajaxOpts );
	});
};

// Get each item we want to copy.
$( "#items li" ).each(function( idx ) {
	// Queue up an ajax request.
	$.ajaxQueue({
		url: "/ajax_html_echo/",
		data: {
			html: "[" + idx + "] " + $( this ).html()
		},
		type: "POST",
		success: function( data ) {
			// Write to #output.
			$( "#output" ).append( $( "<li>", {
				html: data
			}));
		}
	});
});
```

### Another custom queue example

```
var theQueue = $({}); // jQuery on an empty object - a perfect queue holder

$.each([ 1, 2, 3 ], function( i, num ) {
	// Let's add some really simple functions to a queue:
	theQueue.queue( "alerts", function( next ) {
		// Show something, and if they hit "yes", run the next function.
		if ( confirm( "index: " + i + " = " + num + "\nRun the next function?" ) ) {
			next();
		}
	});
});

// Create a button to run the queue.
$( "<button>", {
	text: "Run Queue",
	click: function() {
		theQueue.dequeue( "alerts" );
	}
}).appendTo( "body" );

// Create a button to show the length.
$( "<button>", {
	text: "Show Length",
	click: function() {
		alert( theQueue.queue( "alerts" ).length );
	}
}).appendTo( "body" );
```
