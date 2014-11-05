<script>{
	"title": "How To Use the Widget Factory",
	"level": "beginner"
}</script>

To start, we'll create a progress bar that just lets us set the progress once. As we can see below, this is done by calling `jQuery.widget()` with two parameters: the name of the plugin to create, and an object literal containing functions to support our plugin. When our plugin gets called, it will create a new plugin instance and all functions will be executed within the context of that instance. This is different from a standard jQuery plugin in two important ways. First, the context is an object, not a DOM element. Second, the context is always a single object, never a collection.

```
$.widget( "custom.progressbar", {
	_create: function() {
		var progress = this.options.value + "%";
		this.element
			.addClass( "progressbar" )
			.text( progress );
	}
});
```

The name of the plugin must contain a namespace, in this case we've used the `custom` namespace. You can only create namespaces that are one level deep, therefore, `custom.progressbar` is a valid plugin name whereas `very.custom.progressbar` is not.

We can also see that the widget factory has provided two properties for us. `this.element` is a jQuery object containing exactly one element. If our plugin is called on a jQuery object containing multiple elements, a separate plugin instance will be created for each element, and each instance will have its own `this.element`. The second property, `this.options`, is a hash containing key/value pairs for all of our plugin's options. These options can be passed to our plugin as shown here.

```
$( "<div></div>" )
	.appendTo( "body" )
	.progressbar({ value: 20 });
```

When we call `jQuery.widget()` it extends jQuery by adding a function to `jQuery.fn` (the system for creating a standard plugin). The name of the function it adds is based on the name you pass to `jQuery.widget()`, without the namespace - in our case "progressbar". The options passed to our plugin are the values that get set in `this.options` inside of our plugin instance. As shown below, we can specify default values for any of our options. When designing your API, you should figure out the most common use case for your plugin so that you can set appropriate default values and make all options truly optional.

```
$.widget( "custom.progressbar", {

	// Default options.
	options: {
		value: 0
	},
	_create: function() {
		var progress = this.options.value + "%";
		this.element
			.addClass( "progressbar" )
			.text( progress );
	}
});
```

### Calling Plugin Methods

Now that we can initialize our progress bar, we'll add the ability to perform actions by calling methods on our plugin instance. To define a plugin method, we just include the function in the object literal that we pass to `jQuery.widget()`. We can also define "private" methods by prepending an underscore to the function name.

```
$.widget( "custom.progressbar", {

	options: {
		value: 0
	},

	_create: function() {
		var progress = this.options.value + "%";
		this.element
			.addClass( "progressbar" )
			.text( progress );
	},

	// Create a public method.
	value: function( value ) {

		// No value passed, act as a getter.
		if ( value === undefined ) {
			return this.options.value;
		}

		// Value passed, act as a setter.
		this.options.value = this._constrain( value );
		var progress = this.options.value + "%";
		this.element.text( progress );
	},

	// Create a private method.
	_constrain: function( value ) {
		if ( value > 100 ) {
			value = 100;
		}
		if ( value < 0 ) {
			value = 0;
		}
		return value;
	}
});
```

To call a method on a plugin instance, you pass the name of the method to the jQuery plugin. If you are calling a method that accepts parameters, you simply pass those parameters after the method name.

**Note:** Executing methods by passing the method name to the same jQuery function that was used to initialize the plugin may seem odd. This is done to prevent pollution of the jQuery namespace while maintaining the ability to chain method calls. Later in this article we'll see alternative uses that may feel more natural.

```
var bar = $( "<div></div>" )
	.appendTo( "body" )
	.progressbar({ value: 20 });

// Get the current value.
alert( bar.progressbar( "value" ) );

// Update the value.
bar.progressbar( "value", 50 );

// Get the current value again.
alert( bar.progressbar( "value" ) );
```

### Working with Options

One of the methods that are automatically available to our plugin is the `option()` method. The `option()` method allows you to get and set options after initialization. This method works exactly like jQuery's `.css()` and `.attr()` methods: You can pass just a name to use it as a getter, a name and value to use it as a single setter, or a hash of name/value pairs to set multiple values. When used as a getter, the plugin will return the current value of the option that corresponds to the name that was passed in. When used as a setter, the plugin's `_setOption` method will be called for each option that is being set. We can specify a `_setOption` method in our plugin to react to option changes. For actions to perform independent of the number of options changed, we can override `_setOptions()`.

```
$.widget( "custom.progressbar", {
	options: {
		value: 0
	},
	_create: function() {
		this.options.value = this._constrain(this.options.value);
		this.element.addClass( "progressbar" );
		this.refresh();
	},
	_setOption: function( key, value ) {
		if ( key === "value" ) {
			value = this._constrain( value );
		}
		this._super( key, value );
	},
	_setOptions: function( options ) {
		this._super( options );
		this.refresh();
	},
	refresh: function() {
		var progress = this.options.value + "%";
		this.element.text( progress );
	},
	_constrain: function( value ) {
		if ( value > 100 ) {
			value = 100;
		}
		if ( value < 0 ) {
			value = 0;
		}
		return value;
	}
});
```

### Adding Callbacks

One of the easiest ways to make your plugin extensible is to add callbacks so users can react when the state of your plugin changes. We can see below how to add a callback to our progress bar to signify when the progress has reached 100%. The `_trigger()` method takes three parameters: the name of the callback, a jQuery event object that initiated the callback, and a hash of data relevant to the event. The callback name is the only required parameter, but the others can be very useful for users who want to implement custom functionality on top of your plugin. For example, if we were building a draggable plugin, we could pass the mousemove event when triggering a drag callback; this would allow users to react to the drag based on the x/y coordinates provided by the event object. Note that the original event passed to `_trigger()` must be a jQuery event, not a native browser event.

```
$.widget( "custom.progressbar", {
	options: {
		value: 0
	},
	_create: function() {
		this.options.value = this._constrain(this.options.value);
		this.element.addClass( "progressbar" );
		this.refresh();
	},
	_setOption: function( key, value ) {
		if ( key === "value" ) {
			value = this._constrain( value );
		}
		this._super( key, value );
	},
	_setOptions: function( options ) {
		this._super( options );
		this.refresh();
	},
	refresh: function() {
		var progress = this.options.value + "%";
		this.element.text( progress );
		if ( this.options.value == 100 ) {
			this._trigger( "complete", null, { value: 100 } );
		}
	},
	_constrain: function( value ) {
		if ( value > 100 ) {
			value = 100;
		}
		if ( value < 0 ) {
			value = 0;
		}
		return value;
	}
});
```

Callback functions are essentially just additional options, so you can get and set them just like any other option. Whenever a callback is executed, a corresponding event is triggered as well. The event type is determined by concatenating the plugin name and the callback name. The callback and event both receive the same two parameters: an event object and a hash of data relevant to the event, as we'll see below. Your plugin may have functionality that you want to allow the user to prevent. The best way to support this is by creating cancelable callbacks. Users can cancel a callback, or its associated event, the same way they cancel any native event, by calling `event.preventDefault()` or returning `false`. If the user cancels the callback, the `_trigger()` method will return `false` so you can implement the appropriate functionality within your plugin.

```
var bar = $( "<div></div>" )
	.appendTo( "body" )
	.progressbar({
		complete: function( event, data ) {
			alert( "Callbacks are great!" );
		}
	})
	.bind( "progressbarcomplete", function( event, data ) {
		alert( "Events bubble and support many handlers for extreme flexibility." );
		alert( "The progress bar value is " + data.value );
	});

bar.progressbar( "option", "value", 100 );
```

## Looking Under the Hood

Now that we've seen how to build a plugin using the widget factory, let's take a look at how it actually works. When you call `jQuery.widget()`, it creates a constructor for your plugin and sets the object literal that you pass in as the prototype for your plugin instances. All of the functionality that automatically gets added to your plugin comes from a base widget prototype, which is defined as `jQuery.Widget.prototype`. When a plugin instance is created, it is stored on the original DOM element using `jQuery.data`, with the plugin name as the key.

Because the plugin instance is directly linked to the DOM element, you can access the plugin instance directly instead of going through the exposed plugin method if you want. This will allow you to call methods directly on the plugin instance instead of passing method names as strings and will also give you direct access to the plugin's properties.

```
var bar = $( "<div></div>" )
	.appendTo( "body" )
	.progressbar()
	.data( "custom-progressbar" );

// Call a method directly on the plugin instance.
bar.option( "value", 50 );

// Access properties on the plugin instance.
alert( bar.options.value );
```

You can also create an instance without going through the plugin method, by calling the constructor directly, with the options and element arguments:

```
var bar = $.custom.progressbar( {}, $( "<div></div>" ).appendTo( "body") );

// Same result as before.
alert( bar.options.value );
```

### Extending a Plugin's Prototype

One of the biggest benefits of having a constructor and prototype for a plugin is the ease of extending the plugin. By adding or modifying methods on the plugin's prototype, we can modify the behavior of all instances of our plugin. For example, if we wanted to add a method to our progress bar to reset the progress to 0% we could add this method to the prototype and it would instantly be available to be called on any plugin instance.

```
$.custom.progressbar.prototype.reset = function() {
	this._setOption( "value", 0 );
};
```

For more information on extending widgets, including how to build entirely new widgets on top of existing ones, see [Extending Widgets with the Widget Factory](/jquery-ui/widget-factory/extending-widgets/).

### Cleaning Up

In some cases, it will make sense to allow users to apply and then later unapply your plugin. You can accomplish this via the `_destroy()` method. Within the `_destroy()` method, you should undo anything your plugin may have done during initialization or later use. `_destroy()` is called by the `destroy()` method, which is automatically called if the element that your plugin instance is tied to is removed from the DOM, so this can be used for garbage collection as well. That base `destroy()` method also handles some general cleanup operations, like removing the instance reference from the widget's DOM element, unbinding all events in the widget's namespace from the element, and unbinding generally all events that were added using `_bind()`.

```
$.widget( "custom.progressbar", {
	options: {
		value: 0
	},
	_create: function() {
		this.options.value = this._constrain(this.options.value);
		this.element.addClass( "progressbar" );
		this.refresh();
	},
	_setOption: function( key, value ) {
		if ( key === "value" ) {
			value = this._constrain( value );
		}
		this._super( key, value );
	},
	_setOptions: function( options ) {
		this._super( options );
		this.refresh();
	},
	refresh: function() {
		var progress = this.options.value + "%";
		this.element.text( progress );
		if ( this.options.value == 100 ) {
			this._trigger( "complete", null, { value: 100 } );
		}
	},
	_constrain: function( value ) {
		if ( value > 100 ) {
			value = 100;
		}
		if ( value < 0 ) {
			value = 0;
		}
		return value;
	},
	_destroy: function() {
		this.element
			.removeClass( "progressbar" )
			.text( "" );
	}
});
```

## Closing Comments

The widget factory is only one way of creating stateful plugins. There are a few different models that can be used and each have their own advantages and disadvantages. The widget factory solves lots of common problems for you and can greatly improve productivity, it also greatly improves code reuse, making it a great fit for jQuery UI as well as many other stateful plugins.

You may have noticed that in this article we used the `custom` namespace. The `ui` namespace is reserved for official jQuery UI plugins. When building your own plugins, you should create your own namespace. This makes it clear where the plugin came from and if it is part of a larger collection.
