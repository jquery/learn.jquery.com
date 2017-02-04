<script>{
	"title": "Code Organization Concepts",
	"level": "beginner",
	"source": "http://jqfundamentals.com/legacy",
	"attribution": [ "jQuery Fundamentals" ]
}</script>

When you move beyond adding simple enhancements to your website with jQuery and start developing full-blown client-side applications, you need to consider how to organize your code. In this chapter, we'll take a look at various code organization patterns you can use in your jQuery application and explore the [RequireJS](http://requirejs.org/) dependency management and build system.

## Key Concepts

Before we jump into code organization patterns, it's important to understand some concepts that are common to all good code organization patterns.

* Your code should be divided into units of functionality — modules, services, etc. Avoid the temptation to have all of your code in one huge `$( document ).ready()` block. This concept, loosely, is known as encapsulation.
* Don't repeat yourself. Identify similarities among pieces of functionality, and use inheritance techniques to avoid repetitive code.
* Despite jQuery's DOM-centric nature, JavaScript applications are not all about the DOM. Remember that not all pieces of functionality need to — or should — have a DOM representation.
* Units of functionality should be [loosely coupled](http://en.wikipedia.org/wiki/Loose_coupling), that is, a unit of functionality should be able to exist on its own, and communication between units should be handled via a messaging system such as custom events or pub/sub. Stay away from direct communication between units of functionality whenever possible.

The concept of loose coupling can be especially troublesome to developers making their first foray into complex applications, so be mindful of this as you're getting started.

## Encapsulation

The first step to code organization is separating pieces of your application into distinct pieces; sometimes, even just this effort is sufficient to lend

### The Object Literal

An object literal is perhaps the simplest way to encapsulate related code. It doesn't offer any privacy for properties or methods, but it's useful for eliminating anonymous functions from your code, centralizing configuration options, and easing the path to reuse and refactoring.

```
// An object literal
var myFeature = {
	myProperty: "hello",

	myMethod: function() {
		console.log( myFeature.myProperty );
	},

	init: function( settings ) {
		myFeature.settings = settings;
	},

	readSettings: function() {
		console.log( myFeature.settings );
	}
};

myFeature.myProperty === "hello"; // true

myFeature.myMethod(); // "hello"

myFeature.init({
	foo: "bar"
});

myFeature.readSettings(); // { foo: "bar" }
```

The object literal above is simply an object assigned to a variable. The object has one property and several methods. All of the properties and methods are public, so any part of your application can see the properties and call methods on the object. While there is an init method, there's nothing requiring that it be called before the object is functional.

How would we apply this pattern to jQuery code? Let's say that we had this code written in the traditional jQuery style:

```
// Clicking on a list item loads some content using the
// list item's ID, and hides content in sibling list items
$( document ).ready(function() {
	$( "#myFeature li" ).append( "<div>" ).click(function() {
		var item = $( this );
		var div = item.find( "div" );
		div.load( "foo.php?item=" + item.attr( "id" ), function() {
			div.show();
			item.siblings().find( "div" ).hide();
		});
	});
});
```

If this were the extent of our application, leaving it as-is would be fine. On the other hand, if this was a piece of a larger application, we'd do well to keep this functionality separate from unrelated functionality. We might also want to move the URL out of the code and into a configuration area. Finally, we might want to break up the chain to make it easier to modify pieces of the functionality later.

```
// Using an object literal for a jQuery feature
var myFeature = {
	init: function( settings ) {
		myFeature.config = {
			items: $( "#myFeature li" ),
			container: $( "<div class='container'></div>" ),
			urlBase: "/foo.php?item="
		};

		// Allow overriding the default config
		$.extend( myFeature.config, settings );

		myFeature.setup();
	},

	setup: function() {
		myFeature.config.items
			.each( myFeature.createContainer )
			.click( myFeature.showItem );
	},

	createContainer: function() {
		var item = $( this );
		var container = myFeature.config.container
			.clone()
			.appendTo( item );
		item.data( "container", container );
	},

	buildUrl: function() {
		return myFeature.config.urlBase + myFeature.currentItem.attr( "id" );
	},

	showItem: function() {
		myFeature.currentItem = $( this );
		myFeature.getContent( myFeature.showContent );
	},

	getContent: function( callback ) {
		var url = myFeature.buildUrl();
		myFeature.currentItem.data( "container" ).load( url, callback );
	},

	showContent: function() {
		myFeature.currentItem.data( "container" ).show();
		myFeature.hideContent();
	},

	hideContent: function() {
		myFeature.currentItem.siblings().each(function() {
			$( this ).data( "container" ).hide();
		});
	}
};

$( document ).ready( myFeature.init );
```

The first thing you'll notice is that this approach is obviously far longer than the original — again, if this were the extent of our application, using an object literal would likely be overkill. Assuming it's not the extent of our application, though, we've gained several things:

* We've broken our feature up into tiny methods. In the future, if we want to change how content is shown, it's clear where to change it. In the original code, this step is much harder to locate.
* We've eliminated the use of anonymous functions.
* We've moved configuration options out of the body of the code and put them in a central location.
* We've eliminated the constraints of the chain, making the code easier to refactor, remix, and rearrange.

For non-trivial features, object literals are a clear improvement over a long stretch of code stuffed in a `$( document ).ready()` block, as they get us thinking about the pieces of our functionality. However, they aren't a whole lot more advanced than simply having a bunch of function declarations inside of that `$( document ).ready()` block.

### The Module Pattern

The module pattern overcomes some of the limitations of the object literal, offering privacy for variables and functions while exposing a public API if desired.

```
// The module pattern
var feature = (function() {

	// Private variables and functions
	var privateThing = "secret";
	var publicThing = "not secret";

	var changePrivateThing = function() {
		privateThing = "super secret";
	};

	var sayPrivateThing = function() {
		console.log( privateThing );
		changePrivateThing();
	};

	// Public API
	return {
		publicThing: publicThing,
		sayPrivateThing: sayPrivateThing
	};
})();

feature.publicThing; // "not secret"

// Logs "secret" and changes the value of privateThing
feature.sayPrivateThing();
```

In the example above, we self-execute an anonymous function that returns an object. Inside of the function, we define some variables. Because the variables are defined inside of the function, we don't have access to them outside of the function unless we put them in the return object. This means that no code outside of the function has access to the `privateThing` variable or to the `changePrivateThing` function. However, `sayPrivateThing` does have access to `privateThing` and `changePrivateThing`, because both were defined in the same scope as `sayPrivateThing`.

This pattern is powerful because, as you can gather from the variable names, it can give you private variables and functions while exposing a limited API consisting of the returned object's properties and methods.

Below is a revised version of the previous example, showing how we could create the same feature using the module pattern while only exposing one public method of the module, `showItemByIndex()`.

```
// Using the module pattern for a jQuery feature
$( document ).ready(function() {
	var feature = (function() {
		var items = $( "#myFeature li" );
		var container = $( "<div class='container'></div>" );
		var currentItem = null;
		var urlBase = "/foo.php?item=";

		var createContainer = function() {
			var item = $( this );
			var _container = container.clone().appendTo( item );
			item.data( "container", _container );
		};

		var buildUrl = function() {
			return urlBase + currentItem.attr( "id" );
		};

		var showItem = function() {
			currentItem = $( this );
			getContent( showContent );
		};

		var showItemByIndex = function( idx ) {
			$.proxy( showItem, items.get( idx ) );
		};

		var getContent = function( callback ) {
			currentItem.data( "container" ).load( buildUrl(), callback );
		};

		var showContent = function() {
			currentItem.data( "container" ).show();
			hideContent();
		};

		var hideContent = function() {
			currentItem.siblings().each(function() {
				$( this ).data( "container" ).hide();
			});
		};

		items.each( createContainer ).click( showItem );

		return {
			showItemByIndex: showItemByIndex
		};
	})();

	feature.showItemByIndex( 0 );
});
```
