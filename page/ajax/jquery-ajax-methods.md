<script>{
	"title": "jQuery's Ajax-Related Methods",
	"level": "beginner",
	"source": "http://jqfundamentals.com/legacy",
	"attribution": [ "jQuery Fundamentals" ]
}</script>

While jQuery does offer many Ajax-related convenience methods, the core `$.ajax()` method is at the heart of all of them, and understanding it is imperative. We'll review it first, and then touch briefly on the convenience methods.

It's often considered good practice to use the `$.ajax()` method over the jQuery provided [convenience methods](#convenience-methods). As you'll see, it offers features that the convenience methods do not, and its syntax allows for the ease of readability.

### `$.ajax()`

jQuery’s core `$.ajax()` method is a powerful and straightforward way of creating Ajax requests. It takes a configuration object that contains all the instructions jQuery requires to complete the request. The `$.ajax()` method is particularly valuable because it offers the ability to specify both success and failure callbacks. Also, its ability to take a configuration object that can be defined separately makes it easier to write reusable code. For complete documentation of the configuration options, visit [http://api.jquery.com/jQuery.ajax/](http://api.jquery.com/jQuery.ajax/).

```
// Using the core $.ajax() method
$.ajax({

	// The URL for the request
	url: "post.php",

	// The data to send (will be converted to a query string)
	data: {
		id: 123
	},

	// Whether this is a POST or GET request
	type: "GET",

	// The type of data we expect back
	dataType : "json",

	// Code to run if the request succeeds;
	// the response is passed to the function
	success: function( json ) {
		$( "<h1>" ).text( json.title ).appendTo( "body" );
		$( "<div class=\"content\">").html( json.html ).appendTo( "body" );
	},

	// Code to run if the request fails; the raw request and
	// status codes are passed to the function
	error: function( xhr, status, errorThrown ) {
		alert( "Sorry, there was a problem!" );
		console.log( "Error: " + errorThrown );
		console.log( "Status: " + status );
		console.dir( xhr );
	},

	// Code to run regardless of success or failure
	complete: function( xhr, status ) {
		alert( "The request is complete!" );
	}
});
```

**Note:** A note about the `dataType` setting: if the server sends back data that is in a different format than you specify, your code may fail, and the reason will not always be clear, because the HTTP response code will not show an error. When working with Ajax requests, make sure your server is sending back the data type you're asking for, and verify that the `Content-type` header is accurate for the data type. For example, for JSON data, the `Content-type` header should be `application/json`.

### `$.ajax()` Options

There are many, many options for the `$.ajax()` method, which is part of its power. For a complete list of options, visit [http://api.jquery.com/jQuery.ajax/](http://api.jquery.com/jQuery.ajax/); here are several that you will use frequently:

#### async

Set to `false` if the request should be sent synchronously. Defaults to `true`. Note that if you set this option to `false`, your request will block execution of other code until the response is received.

#### cache

Whether to use a cached response if available. Defaults to `true` for all `dataType`s except "script" and "jsonp". When set to `false`, the URL will simply have a cachebusting parameter appended to it.

#### complete

A callback function to run when the request is complete, regardless of success or failure. The function receives the raw request object and the text status of the request.

#### context

The scope in which the callback function(s) should run (i.e. what `this` will mean inside the callback function(s)). By default, `this` inside the callback function(s) refers to the object originally passed to `$.ajax()`.

#### data

The data to be sent to the server. This can either be an object or a query string, such as `foo=bar&amp;baz=bim`.

#### dataType

The type of data you expect back from the server. By default, jQuery will look at the MIME type of the response if no `dataType` is specified.

#### error

A callback function to run if the request results in an error. The function receives the raw request object and the text status of the request.

#### jsonp

The callback name to send in a query string when making a JSONP request. Defaults to "callback".

#### success

A callback function to run if the request succeeds. The function receives the response data (converted to a JavaScript object if the `dataType` was JSON), as well as the text status of the request and the raw request object.

#### timeout

The time in milliseconds to wait before considering the request a failure.

#### traditional

Set to `true` to use the param serialization style in use prior to jQuery 1.4. For details, see [http://api.jquery.com/jQuery.param/](http://api.jquery.com/jQuery.param/).

#### type

The type of the request, "POST" or "GET". Defaults to "GET". Other request types, such as "PUT" and "DELETE" can be used, but they may not be supported by all browsers.

#### url

The URL for the request.

The `url` option is the only required property of the `$.ajax()` configuration object; all other properties are optional. This can also be passed as the first argument to `$.ajax()`, and the options object as the second argument.

### Convenience Methods

If you don't need the extensive configurability of `$.ajax()`, and you don't care about handling errors, the Ajax convenience functions provided by jQuery can be useful, terse ways to accomplish Ajax requests. These methods are just "wrappers" around the core `$.ajax()` method, and simply pre-set some of the options on the `$.ajax()` method.

The convenience methods provided by jQuery are:

#### $.get

Perform a GET request to the provided URL.

#### $.post

Perform a POST request to the provided URL.

#### $.getScript

Add a script to the page.

#### $.getJSON

Perform a GET request, and expect JSON to be returned.

In each case, the methods take the following arguments, in order:

#### url

The URL for the request. Required.

#### data

The data to be sent to the server. Optional. This can either be an object or a query string, such as `foo=bar&amp;baz=bim`.

**Note:** This option is not valid for `$.getScript`.

#### success callback

A callback function to run if the request succeeds. Optional. The function receives the response data (converted to a JavaScript object if the data type was JSON), as well as the text status of the request and the raw request object.

#### data type

The type of data you expect back from the server. Optional.

**Note:** This option is only applicable for methods that don't already specify the data type in their name.

```
// Using jQuery's Ajax convenience methods

// Get plain text or HTML
$.get( "/users.php", {
	userId: 1234
}, function( resp ) {
	console.log( resp ); // server response
});

// Add a script to the page, then run a function defined in it
$.getScript( "/static/js/myScript.js", function() {
	functionFromMyScript();
});

// Get JSON-formatted data from the server
$.getJSON( "/details.php", function( resp ) {

	// Log each key in the response data
	$.each( resp, function( key, value ) {
		console.log( key + " : " + value );
	});
});
```

### `$.fn.load`

The `.load()` method is unique among jQuery’s Ajax methods in that it is called on a selection. The `.load()` method fetches HTML from a URL, and uses the returned HTML to populate the selected element(s). In addition to providing a URL to the method, you can optionally provide a selector; jQuery will fetch only the matching content from the returned HTML.

```
// Using .load() to populate an element
$( "#newContent" ).load( "/foo.html" );
```

```
// Using .load() to populate an element based on a selector
$( "#newContent" ).load( "/foo.html #myDiv h1:first", function( html ) {
	alert( "Content updated!" );
});
```
