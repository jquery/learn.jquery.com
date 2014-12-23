<script>{
	"title": "Using jQuery UI with AMD",
	"level": "intermediate"
}</script>

<div class="warning">**Note:** This documentation refers to functionality made available in jQuery UI 1.11.</div>

As of jQuery UI 1.11, all of the library's source files support using AMD. This means that you can manage your jQuery UI dependencies without using [Download Builder](http://jqueryui.com/download/), and load jQuery UI's source files asynchronously using an AMD loader such as [RequireJS](http://requirejs.org/).

In this article we'll walk through the process of using AMD with jQuery UI. Let's start by discussing the files we'll need.

### Requirements

We'll need to download three things to get up and running: jQuery core, jQuery UI, and an AMD loader.

While any AMD loader will work, we'll use RequireJS in this article, which you can download from <http://requirejs.org/docs/download.html>. If you don't have a version of jQuery core handy, you can get it from <http://jquery.com/download/>, and you can download jQuery UI directly from <http://jqueryui.com/>. Alternatively you can [download these libraries using a package manager such as Bower](/jquery-ui/environments/bower/).

### Directory Structure

Now that we have the files we need, we have to discuss where to place them. For this tutorial, we'll build a small application that uses the following directory structure.

<pre>
├── index.html
├── js
│   ├── app.js
│   ├── jquery-ui
│   │   ├── accordion.js
│   │   ├── autocomplete.js
│   │   ├── button.js
│   │   ├── core.js
│   │   ├── datepicker.js
│   │   ├── dialog.js
│   │   └── ...
│   ├── jquery.js
│   └── require.js
</pre>

As you can see, we're placing all JavaScript files in a `js` directory. `jquery.js` and `require.js` are direct children of `js`, and all of jQuery UI's files are within a `jquery-ui` directory. `app.js` will contain our application code.

With RequireJS you're free to use any directory structure you'd like, but with alternative structures you'll have to [change some configuration](http://requirejs.org/docs/api.html#config) so RequireJS knows how to find your dependencies.

### Loading the Application

Now that we have the files in place, let's use them. Here are the contents of our app's `index.html` file.

```
<!doctype html>
<html lang="en">
<head>
	...
</head>
<body>

<script src="js/require.js" data-main="js/app"></script>

</body>
</html>
```

`require.js` is loaded in a `<script>` tag, which [by convention](http://requirejs.org/docs/start.html) asynchronously loads and executes the file specified in the `data-main` attribute - in this case `js/app.js`. If you put a `console.log()` statement in `app.js`, you can verify that it loads appropriately.

```
/* app.js */
console.log( "loaded" );
```

Our boilerplate is now in place. Next, we have to load jQuery and jQuery UI.

### Requiring jQuery and jQuery UI

The `require()` function is AMD's mechanism for specifying and loading dependencies; therefore, we can add one to our `app.js` file to load the necessary files. The following loads jQuery UI's autocomplete widget.

```
require([ "jquery-ui/autocomplete" ], function( autocomplete ) {
	...
});
```

When this code executes, RequireJS asynchronously loads `jquery-ui/autocomplete.js` as well as its dependencies: jQuery core (`jquery.js`), jQuery UI core (`jquery-ui/core.js`), the widget factory (`jquery-ui/widget.js`), the position utility (`jquery-ui/position.js`), and the menu widget (`jquery-ui/menu.js`).

When all dependencies are resolved and loaded, RequireJS invokes the callback function.

### Using jQuery UI's Files

All widgets built with the widget factory expose their constructor function when required with AMD; therefore we can use them to instantiate widgets on elements. The following creates a new `<input>`, initializes an autocomplete widget on it, then appends it to the `<body>`.

```
require([ "jquery-ui/autocomplete" ], function( autocomplete ) {
	autocomplete({ source: [ "One", "Two", "Three" ] }, "<input>" )
		.element
		.appendTo( "body" );
});
```

Each widget's constructor function takes two arguments: the widget's options, and the element to initialize the widget on. Each widget has a default element that is used if no element is provided, which is stored at `$.namespace.widgetName.prototype.defaultElement`. Because `$.ui.autocomplete.prototype.defaultElement` is `<input>`, we can omit the second argument in our autocomplete example.

```
require([ "jquery-ui/autocomplete" ], function( autocomplete ) {
	autocomplete({ source: [ "One", "Two", "Three" ] })
		.element
		.appendTo( "body" );
});
```

Even though we're loading jQuery UI's files with AMD, the files' plugins are still added to the global `jQuery` and `$` objects; therefore you can alternatively use the plugins to instantiate widgets. The following also creates the same autocomplete.

```
require([ "jquery", "jquery-ui/autocomplete" ], function( $ ) {
	$( "<input>" )
		.autocomplete({ source: [ "One", "Two", "Three" ]})
		.appendTo( "body" );
});
```

### Datepicker

Since jQuery UI's datepicker widget is the only jQuery UI widget not built with the widget factory, it does not return a constructor function when required with AMD. Because of this, it's best to stick with datepicker's plugin to instantiate datepicker instances. The following requires datepicker, then uses its plugin to instantiate a datepicker instance on a newly created `<input>`.

```
require([ "jquery", "jquery-ui/datepicker" ], function( $ ) {
	$( "<input>" )
		.appendTo( "body" )
		.datepicker();
});
```
