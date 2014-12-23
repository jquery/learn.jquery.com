<script>{
	"title": "Ajax and Forms",
	"level": "beginner",
	"source": "http://jqfundamentals.com/legacy",
	"attribution": [ "jQuery Fundamentals" ]
}</script>

jQuery's ajax capabilities can be especially useful when dealing with forms. There are several advantages, which can range from serialization, to simple client-side validation (e.g. "Sorry, that username is taken"), to [prefilters](http://api.jquery.com/jQuery.ajaxPrefilter/) (explained below), and even more!

### Serialization

Serializing form inputs in jQuery is extremely easy. Two methods come supported natively: `.serialize()` and `.serializeArray()`. While the names are fairly self-explanatory, there are many advantages to using them.

The `.serialize()` method serializes a form's data into a query string. For the element's value to be serialized, it **must** have a `name` attribute. Please note that values from inputs with a type of `checkbox` or `radio` are included only if they are checked.

```
// Turning form data into a query string
$( "#myForm" ).serialize();

// Creates a query string like this:
// field_1=something&field2=somethingElse
```

While plain old serialization is great, sometimes your application would work better if you sent over an array of objects, instead of just the query string. For that, jQuery has the `.serializeArray()` method. It's very similar to the `.serialize()` method listed above, except it produces an array of objects, instead of a string.

```
// Creating an array of objects containing form data
$( "#myForm" ).serializeArray();

// Creates a structure like this:
// [
//   {
//     name : "field_1",
//     value : "something"
//   },
//   {
//     name : "field_2",
//     value : "somethingElse"
//   }
// ]
```

### Client-side validation

Client-side validation is, much like many other things, extremely easy using jQuery. While there are several cases developers can test for, some of the most common ones are: presence of a required input, valid usernames/emails/phone numbers/etc&hellip;, or checking an "I agree&hellip;" box.

Please note that it is advisable that you also perform server-side validation for your inputs. However, it typically makes for a better user experience to be able to validate some things without submitting the form.

With that being said, let's jump on in to some examples! First, we'll see how easy it is to check if a required field doesn't have anything in it. If it doesn't, then we'll `return false`, and prevent the form from processing.

```
// Using validation to check for the presence of an input
$( "#form" ).submit(function( event ) {

	// If .required's value's length is zero
	if ( $( ".required" ).val().length === 0 ) {

		// Usually show some kind of error message here

		// Prevent the form from submitting
		event.preventDefault();
	} else {

		// Run $.ajax() here
	}
});
```

Let's see how easy it is to check for invalid characters in a phone number:

```
// Validate a phone number field
$( "#form" ).submit(function( event ) {
	var inputtedPhoneNumber = $( "#phone" ).val();

	// Match only numbers
	var phoneNumberRegex = /^\d*$/;

	// If the phone number doesn't match the regex
	if ( !phoneNumberRegex.test( inputtedPhoneNumber ) ) {

		// Usually show some kind of error message here

		// Prevent the form from submitting
		event.preventDefault();
	} else {

		// Run $.ajax() here
	}
});
```

### Prefiltering

A prefilter is a way to modify the ajax options before each request is sent (hence, the name `prefilter`).

For example, say we would like to modify all cross-domain requests through a proxy. To do so with a prefilter is quite simple:

```
// Using a proxy with a prefilter
$.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
	if ( options.crossDomain ) {
		options.url = "http://mydomain.net/proxy/" + encodeURIComponent( options.url );
		options.crossDomain = false;
	}
});
```

You can pass in an optional argument before the callback function that specifies which `dataTypes` you'd like the prefilter to be applied to. For example, if we want our prefilter to only apply to `JSON` and `script` requests, we'd do:

```
// Using the optional dataTypes argument
$.ajaxPrefilter( "json script", function( options, originalOptions, jqXHR ) {

	// Do all of the prefiltering here, but only for
	// requests that indicate a dataType of "JSON" or "script"
});
```
