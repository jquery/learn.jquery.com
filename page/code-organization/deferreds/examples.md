<script>{
	"title": "Deferred examples",
	"level": "advanced",
	"source": "http://msdn.microsoft.com/en-us/magazine/gg723713.aspx",
	"attribution": [
		"Julian Aubourg <j@ubourg.net>",
		"Addy Osmani <addyosmani@gmail.com>",
		"Andree Hansson <peolanha@gmail.com>"
	]
}</script>

## Further Deferreds examples

Deferreds are used behind the hood in Ajax but it doesn't mean they can't also be used elsewhere. This section describes situations where deferreds will help abstract away asynchronous behaviour and decouple our code.

### Caching

#### Asynchronous cache

When it comes to asynchronous tasks, caching can be a bit demanding since you have to make sure a task is only performed once for a given key. As a consequence, the code has to somehow keep track of inbound tasks.

```
$.cachedGetScript( url, callback1 );
$.cachedGetScript( url, callback2 );
```

The caching mechanism has to make sure the URL is only requested once even if the script isn't in cache yet. This shows some logic to keep track of callbacks bound to a given URL in order for the cache system to properly handle both complete and inbound requests.

```
var cachedScriptPromises = {};

$.cachedGetScript = function( url, callback ) {
	if ( !cachedScriptPromises[ url ] ) {
		cachedScriptPromises[ url ] = $.Deferred(function( defer ) {
			$.getScript( url ).then( defer.resolve, defer.reject );
		}).promise();
	}
	return cachedScriptPromises[ url ].done( callback );
};
```

One promise is cached per URL. If there is no promise for the given URL yet, then a deferred is created and the request is issued. If it already exists, however, the callback is attached to the existing deferred. The big advantage of this solution is that it will handle both complete and inbound requests transparently. Another advantage is that a deferred-based cache will deal with failure gracefully. The promise will end up rejected which can be tested for by providing an error callback:

```
$.cachedGetScript( url ).then( successCallback, errorCallback );
```

#### Generic asynchronous cache

It is also possible to make the code completely generic and build a cache factory that will abstract out the actual task to be performed when a key isn't in the cache yet:

```
$.createCache = function( requestFunction ) {
	var cache = {};
	return function( key, callback ) {
		if ( !cache[ key ] ) {
			cache[ key ] = $.Deferred(function( defer ) {
				requestFunction( defer, key );
			}).promise();
		}
		return cache[ key ].done( callback );
	};
};
```

Now that the request logic is abstracted away, `$.cachedGetScript()` can be rewritten as follows:

```
$.cachedGetScript = $.createCache(function( defer, url ) {
	$.getScript( url ).then( defer.resolve, defer.reject );
});
```

This will work because every call to `$.createCache()` will create a new cache repository and return a new cache-retrieval function.

#### Image loading

A cache can be used to ensure that the same image is not loaded multiple times.

```
$.loadImage = $.createCache(function( defer, url ) {
	var image = new Image();
	function cleanUp() {
		image.onload = image.onerror = null;
	}
	defer.then( cleanUp, cleanUp );
	image.onload = function() {
		defer.resolve( url );
	};
	image.onerror = defer.reject;
	image.src = url;
});
```

Again, the following snippet:

```
$.loadImage( "my-image.png" ).done( callback1 );
$.loadImage( "my-image.png" ).done( callback2 );
```

will work regardless of whether `my-image.png` has already been loaded or not, or if it is actually in the process of being loaded.

#### Caching Data API responses

API requests that are considered immutable during the lifetime of your page are also perfect candidates. For instance, the following:

```
$.searchTwitter = $.createCache(function( defer, query ) {
	$.ajax({
		url: "http://search.twitter.com/search.json",
		data: {
			q: query
		},
		dataType: "jsonp",
		success: defer.resolve,
		error: defer.reject
	});
});
```

will allow you to perform searches on Twitter and cache them at the same time:

```
$.searchTwitter( "jQuery Deferred", callback1 );
$.searchTwitter( "jQuery Deferred", callback2 );
```

#### Timing

This deferred-based cache is not limited to network requests; it can also be used for timing purposes.

For instance, you may need to perform an action on the page after a given amount of time so as to attract the user's attention to a specific feature they may not be aware of or deal with a timeout (for a quiz question for instance). While `setTimeout()` is good for most use-cases it doesn't handle the situation when the timer is asked for later, even after it has theoretically expired. We can handle that with the following caching system:

```
var readyTime;

$(function() {
	readyTime = jQuery.now();
});

$.afterDOMReady = $.createCache(function( defer, delay ) {
	delay = delay || 0;
	$(function() {
		var delta = $.now() - readyTime;
		if ( delta >= delay ) {
			defer.resolve();
		} else {
			setTimeout( defer.resolve, delay - delta );
		}
	});
});
```

The new `$.afterDOMReady()` helper method provides proper timing after the DOM is ready while ensuring the bare minimum of timers will be used. If the delay is already expired, any callback will be called right away.

### One-time event

While jQuery offers all the event binding one may need, it can become a bit cumbersome to handle events that are only supposed to be dealt with once.

For instance, you may wish to have a button that will open a panel the first time it is clicked and leave it open afterwards or take special initialization actions the first time said button is clicked. When dealing with such a situation, one usually end up with code like this:

```
var buttonClicked = false;

$( "#myButton" ).click(function() {
	if ( !buttonClicked ) {
		buttonClicked = true;
		initializeData();
		showPanel();
	}
});
```

then, later on, you may wish to take actions, but only if the panel is opened:

```
if ( buttonClicked ) {

	// Perform specific action

}
```

This is a very coupled solution. If you want to add some other action, you have to edit the bind code or just duplicate it all. If you don't, your only option is to test for `buttonClicked` and you may lose that new action because the `buttonClicked` variable may be `false` and your new code may never be executed.

We can do much better using deferreds (for simplification sake, the following code will only work for a single element and a single event type, but it can be easily generalized for full-fledged collections with multiple event types):

```
$.fn.bindOnce = function( event, callback ) {
	var element = $( this[ 0 ] ),
		defer = element.data( "bind_once_defer_" + event );

	if ( !defer ) {
		defer = $.Deferred();
		function deferCallback() {
			element.unbind( event, deferCallback );
			defer.resolveWith( this, arguments );
		}
		element.bind( event, deferCallback )
		element.data( "bind_once_defer_" + event , defer );
	}

	return defer.done( callback ).promise();
};
```

The code works as follows:

* Check if the element already has a deferred attached for the given event
* if not, create it and make it so it is resolved when the event is fired the first time around
* then attach the given callback to the deferred and return the promise

While the code is definitely more verbose, it makes dealing with the problem at hand much simpler in a compartmentalized and decoupled way. But let's define a helper method first:

```
$.fn.firstClick = function( callback ) {
	return this.bindOnce( "click", callback );
};
```

Then the logic can be re-factored as follows:

```
var openPanel = $( "#myButton" ).firstClick();

openPanel.done( initializeData );
openPanel.done( showPanel );
```

If an action should be performed only when a panel is opened later on:

```
openPanel.done(function() {

	// Perform specific action

});
```

Nothing is lost if the panel isn't opened yet, the action will just get deferred until the button is clicked.

### Combining helpers

All of the samples above can seem a bit limited when looked at separately. However, the true power of promises comes into play when you mix them together.

#### Requesting panel content on first click and opening said panel

Following is the code for a button that, when clicked, opens a panel. It requests its content over the wire and then fades the content in. Using the helpers defined earlier, it could be defined as:

```
$( "#myButton" ).firstClick(function() {
	var panel = $( "#myPanel" );
	$.when(
		$.get( "panel.html" ),
		panel.slideDownPromise()
	).done(function( ajaxResponse ) {
		panel.html( ajaxResponse[ 0 ] ).fadeIn();
	});
});
```

#### Loading images in a panel on first click and opening said panel

Another possible goal is to have the panel fade in, only after the button has been clicked and after all of the images have been loaded.

The HTML code for this would look something like:

```
<div id="myPanel">
	<img data-src="image1.png" alt="">
	<img data-src="image2.png" alt="">
	<img data-src="image3.png" alt="">
	<img data-src="image4.png" alt="">
</div>
```

We use the `data-src` attribute to keep track of the real image location. The code to handle our use case using our promise helpers is as follows:

```
$( "#myButton" ).firstClick(function() {
	var panel = $( "#myPanel" ),
		promises = [];

	panel.find( "img" ).each(function() {
		var image = $( this ),
			src = element.attr( "data-src" );
		if ( src ) {
			promises.push(
				$.loadImage( src ).then(function() {
					image.attr( "src", src );
				}, function() {
					image.attr( "src", "error.png" );
				})
			);
		}
	});

	promises.push( panel.slideDownPromise() );

	$.when.apply( null, promises ).done(function() {
		panel.fadeIn();
	});
});
```

The trick here is to keep track of all the `$.loadImage()` promises. We later join them with the panel `.slideDown()` animation using `$.when()`. So when the button is first clicked, the panel will slide down and the images will start loading. Once the panel has finished sliding down and all the images have been loaded, then, and only then, will the panel fade in.

#### Loading images on the page after a specific delay

In order to implement deferred image display on the entire page, the following format in HTML can be used.

```
<img data-src="image1.png" data-after="1000" src="placeholder.png" alt="">
<img data-src="image2.png" data-after="1000" src="placeholder.png" alt="">
<img data-src="image1.png" src="placeholder.png" alt="">
<img data-src="image2.png" data-after="2000" src="placeholder.png" alt="">
```

What it says is pretty straight-forward:

* Load `image1.png` and show it immediately for the third image and after one second for the first one
* Load `image2.png` and show it after one second for the second image and after two seconds for the fourth image

```
$( "img" ).each(function() {
	var element = $( this ),
		src = element.attr( "data-src" ),
		after = element.attr( "data-after" );
	if ( src ) {
		$.when(
			$.loadImage( src ),
			$.afterDOMReady( after )
		).then(function() {
			element.attr( "src", src );
		}, function() {
			element.attr( "src", "error.png" );
		}).done(function() {
			element.fadeIn();
		});
	}
});
```

In order to delay the loading of the images themselves:

```
$( "img" ).each(function() {
	var element = $( this ),
		src = element.attr( "data-src" ),
		after = element.attr( "data-after" );
	if ( src ) {
		$.afterDOMReady( after, function() {
			$.loadImage( src ).then(function() {
				element.attr( "src", src );
			}, function() {
				element.attr( "src", "error.png" );
			}).done(function() {
				element.fadeIn();
			});
		});
	}
});
```

Here, after the delay to be fulfilled then the image is loaded. It can make a lot of sense when you want to limit the number or network requests on page load.
