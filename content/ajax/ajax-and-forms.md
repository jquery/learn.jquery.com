- Right now we're really not covering the fundamentals of how Ajax works with forms. Traditional form handling vs the new. $.ajax has the power to greatly change everything from validation (e.g 'sorry, your username is taken') through to prefiltering but we've giving a very very minor summary of what is possible. I think we need to somehow address this. A first attempt might at least bring over more examples from the docs.
- Locate articles that cover this well and see if we can borrow from them. As per the other sections, I do not think we want to end up in another situation (as with the old site) where we're linking to articles that end up outdated with time, so borrow or write this out ourselves.

c: Addy, I'm planning on adjusting the ajax-and-forms section. One quick question, though - do we want to promote using the plugin, or teach how to go about doing the things we can with $.ajax sans-plugin?

I think the best way to approach that section in particular is to explain what serialize and serializeArray do and why they're important/useful, and then go in to giving specific examples as to the things you mentioned above (validation, prefiltering, etc).

a: @connormontgomery imo, we should approach it without using the plugin. I agree with serialize()/serializeArray() being explained first and then reviewing the other examples.

---
chapter : ajax
section : 4
title   : Ajax and Forms
attribution:  jQuery Fundamentals

---

jQuery’s ajax capabilities can be especially useful when dealing with forms. There are several advantages, which can range from serialization, to simple client-side validation (e.g. "Sorry, that username is taken"), to [prefilters](http://api.jquery.com/extending-ajax/#Prefilters) (explained below), and even more!

### Serialization
Serializing form inputs in jQuery is extremely easy. Two methods come supported natively - `$.fn.serialize` and `$.fn.serializeArray`. While the names are fairly self-explanatory, there are many advantages to using them.

The `serialize` method serializes a form's data into a query string. For the element's value to be serialized, it **must** have a `name` attribute. Please noted that values from inputs with a type of `checkbox` or `radio` are included only if they are checked.


<javascript caption="Turning form data into a query string">
$('#myForm').serialize(); // creates a query string like this: field_1=something&field2=somethingElse
</javascript>

While plain old serialization is great, sometimes your application would work better if you sent over an array of objects, instead of just the query string. For that, jQuery has the `serializeArray` method. It's very similar to the `serialize` method listed above, except it produces an array of objects, instead of a string.

<javascript caption="Creating an array of objects containing form data">
$('#myForm').serializeArray();

// creates a structure like this:
[
  { name : 'field_1', value : 'something' },
  { name : 'field_2', value : 'somethingElse' }
]
</javascript>


### Client-side validation
Client-side validation is, much like many other things, extremely easy using jQuery. While there are several cases developers can test for, some of the most common ones are: presence of a required input, valid usernames/emails, or checking an "I agree..." box. 

Please note that it is advisable that you also perform server-side validation for your inputs. However, it typically makes for a better user experience to be able to validate some things without submitting the form.

With that being said, let's jump on in to some examples:




### Prefiltering
A prefilter is a way to modify the ajax options before each request is sent (hence, the name `prefilter`).

For example, say we would like to modify all crossDomain requests through a proxy. To do so with a prefilter is quite simple:

<javascript caption="Using a proxy with a prefilter">
$.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
	if ( options.crossDomain ) {
		options.url = "http://mydomain.net/proxy/" + encodeURIComponent(options.url );
		options.crossDomain = false;
	}
});
</javascript>

You can pass in an optional argument before the callback function that specifies which `dataTypes` you'd like the prefilter to be applied to. For example, if we want our prefilter to only apply to `JSON` and `script` requests, we'd do:

<javascript caption="using the optional dataTypes argument">
$.ajaxPrefilter( "json script", function( options, originalOptions, jqXHR ) {
	// do all of the prefiltering here, but only for requests that indicate a dataType of "JSON" or "script"
})
</javascript>

As you can see, prefiltering with jQuery is a simple, yet quite under-utilized, way to modify your requests to your liking.