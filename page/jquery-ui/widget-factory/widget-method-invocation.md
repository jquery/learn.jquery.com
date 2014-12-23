<script>{
	"title": "Widget Method Invocation",
	"level": "intermediate"
}</script>

Widgets created with [the widget factory](/jquery-ui/widget-factory/) use methods to change their state and perform actions after initialization. There are two ways widget methods can be invoked - through the plugin created by the widget factory, or by invoking the method on the element's instance object.

### Plugin Invocation

To invoke a method using the widget's plugin, pass the name of the method as a string. For example, here is how you call the [dialog widget's `close()` method](http://api.jqueryui.com/dialog/#method-close).

```
$( ".selector" ).dialog( "close" );
```

If the method requires arguments, pass them as additional parameters to the plugin. Here is how you call [dialog's `option()` method](http://api.jqueryui.com/dialog/#method-option).

```
$( ".selector" ).dialog( "option", "height" );
```

This returns the value of the [dialog's `height` option](http://api.jqueryui.com/dialog/#option-height).

### Instance Invocation

Under the hoods, every instance of every widget is stored on the element using [`jQuery.data()`](http://api.jquery.com/jQuery.data/). To retrieve the instance object, call `jQuery.data()` using the widget's full name as the key. This is shown below.

```
var dialog = $( ".selector" ).data( "ui-dialog" );
```

After you have a reference to the instance object, methods can be invoked on it directly.

```
var dialog = $( ".selector" ).data( "ui-dialog" );
dialog.close();
```

In jQuery UI 1.11, the new `instance()` method will make this process even easier.

```
$( ".selector" ).dialog( "instance" ).close();
```

### Return Types

Most methods invoked through the widget's plugin will return a `jQuery` object so the method call can be chained with additional jQuery methods. This is even true of methods that return `undefined` when invoked on the instance. This is shown in the example below.

```
var dialog = $( ".selector" ).dialog();

// Instance invocation - returns undefined
dialog.data( "ui-dialog" ).close();

// Plugin invocation - returns a jQuery object
dialog.dialog( "close" );

// Therefore, plugin method invocation makes it possible to
// chain method calls with other jQuery functions
dialog.dialog( "close" )
	.css( "color", "red" );
```

The exception to this are methods that return information about the widget. For example [dialog's `isOpen()` method](http://api.jqueryui.com/dialog/#method-isOpen).

```
$( ".selector" )
	.dialog( "isOpen" )
	// This will throw a TypeError
	.css( "color", "red" );
```

This produces a `TypeError` error as `isOpen()` returns a boolean, not a jQuery object.