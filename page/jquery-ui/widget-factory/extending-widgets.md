<script>{
	"title": "Extending Widgets with the Widget Factory",
	"level": "advanced"
}</script>

jQuery UI's widget factory makes it easy to build widgets that extend the functionality of existing widgets. Doing so allows you to build powerful widgets on top of an existing base, as well as make small tweaks to an existing widget's functionality.

**Note:** This article assumes some basic knowledge of what the widget factory is and how it works. If you're unfamiliar with this, read up on [how to use the widget factory](/jquery-ui/widget-factory/how-to-use-the-widget-factory/) first.

### Creating Widget Extensions

Creating widgets with the widget factory is done by passing the name of the widget and a prototype object to `$.widget()`. The following creates a "superDialog" widget in the "custom" namespace.

```
$.widget( "custom.superDialog", {} );
```

To allow for extension, `$.widget()` optionally accepts the constructor of a widget to use as a parent. When specifying a parent widget, pass it as the second argument - after the widget's name, and before the widget's prototype object.

Like the previous example, the following also creates a "superDialog" widget in the "custom" namespace. However, this time the constructor of [jQuery UI's dialog widget](http://jqueryui.com/dialog/) (`$.ui.dialog`) is passed, indicating that the superDialog widget should use jQuery UI's dialog widget as a parent.

```
$.widget( "custom.superDialog", $.ui.dialog, {} );
```

Here superDialog and dialog are essentially equivalent widgets with different names and namepaces. To make our new widget more interesting we can add methods to its prototype object.

A widget's prototype object is the final argument passed to `$.widget()`. So far, our examples have been using an empty object. Let's add a method to this object:

```
$.widget( "custom.superDialog", $.ui.dialog, {
	red: function() {
		this.element.css( "color", "red" );
	}
});

// Create a new <div>, convert it into a superDialog, and call the red() method.
$( "<div>I am red</div>" )
	.superDialog()
	.superDialog( "red" );
```

Now the `superDialog` has a `red()` method that will change the color of its text to red. Note how the widget factory automatically sets `this` to the widget's instance object. For a full list of the methods and properties available on the instance, see [the widget factory's API documentation](http://api.jqueryui.com/jquery.widget/).

### Extending Existing Methods

Sometimes you need to tweak or add to the behavior of existing widget methods. The do this, specify a method with the same name as the method you want to override on the prototype object. The following example overrides dialog's [`open()` method](http://api.jqueryui.com/dialog/#method-open). Since dialogs automatically open by default, `"open"` will be logged when this code runs.

```
$.widget( "custom.superDialog", $.ui.dialog, {
	open: function() {
		console.log( "open" );
	}
});

// Create a new <div>, and convert it into a superDialog.
$( "<div>" ).superDialog();
```

While this runs, there's a problem. Since we overrode the default behavior of `open()`, the dialog no longer displays on the screen.

When we place methods on the prototype object, we are not actually overriding the original method - rather, we are placing a new method at a higher level in the prototype chain.

To make the parent's methods available, the widget factory provides two methods - `_super()` and `_superApply()`.

### Using `_super()` and `_superApply()` to Access Parents

[`_super()`](http://api.jqueryui.com/jquery.widget/#method-_super) and [`_superApply()`](http://api.jqueryui.com/jquery.widget/#method-_superApply) invoke methods of the same name in the parent widget. Refer to the following example. Like the previous one, this example also overrides the `open()` method to log `"open"`. However, this time `_super()` is run to invoke dialog's `open()` and open the dialog.

```
$.widget( "custom.superDialog", $.ui.dialog, {
	open: function() {
		console.log( "open" );

		// Invoke the parent widget's open().
		return this._super();
	}
});

$( "<div>" ).superDialog();
```

`_super()` and `_superApply()` were designed to behave like the native `Function.prototype.call()` and `Function.prototype.apply()` methods. Therefore, `_super()` accepts an argument list, and `_superApply()` accepts a single array of arguments. This difference is shown in the example below.

```
$.widget( "custom.superDialog", $.ui.dialog, {
	_setOption: function( key, value ) {

		// Both invoke dialog's setOption() method. _super() requires the arguments
		// be passed as an argument list, _superApply() as a single array.
		this._super( key, value );
		this._superApply( arguments );
	}
});
```

### Redefining Widgets

jQuery UI 1.9 added the ability for widgets to redefine themselves. Therefore, instead of creating a new widget, we can pass `$.widget()` an existing widget's name and constructor. The following example adds the same logging in `open()`, but doesn't create a new widget to do so.

```
$.widget( "ui.dialog", $.ui.dialog, {
	open: function() {
		console.log( "open" );
		return this._super();
	}
});

$( "<div>" ).dialog();
```

With this approach you can extend an existing widget's method and still have access to the original methods using `_super()` - all without creating a new widget.

### Widgets and Polymorphism

One word of warning when interacting with widget extensions and their plugins. The parent widget's plugin cannot be used to invoke methods on elements that are child widgets. This is shown in the example below.

```
$.widget( "custom.superDialog", $.ui.dialog, {} );

var dialog = $( "<div>" ).superDialog();

// This works.
dialog.superDialog( "close" );

// This doesn't.
dialog.dialog( "close" );
```

Above, the parent widget's plugin, `dialog()`, cannot invoke the `close()` method on an element that is a superDialog. For more on the invoking widget methods see [Widget Method Invocation](/jquery-ui/widget-factory/widget-method-invocation/).

### Customizing Individual Instances

All the examples we have looked at so far have extended methods on the widget's prototype. Methods overridden on the prototype affect all instances of the widget.

To show this, refer to the example below; both instances of the dialog use the same `open()` method.

```
$.widget( "ui.dialog", $.ui.dialog, {
	open: function() {
		console.log( "open" );
		return this._super();
	}
});

// Create two dialogs, both use the same open(), therefore "open" is logged twice.
$( "<div>" ).dialog();
$( "<div>" ).dialog();
```

While this is powerful, sometimes you only need to change the behavior for a single instance of the widget.  To do this, obtain a reference to the instance and override the method using normal JavaScript property assignment. The example below shows this.

```
var dialogInstance = $( "<div>" )
	.dialog()

	// Retrieve the dialog's instance and store it.
	.data( "ui-dialog" );

// Override the close() method for this dialog
dialogInstance.close = function() {
	console.log( "close" );
};

// Create a second dialog
$( "<div>" ).dialog();

// Select both dialogs and call close() on each of them.
// "close" will only be logged once.
$( ":data(ui-dialog)" ).dialog( "close" );
```

This technique of overriding methods for individual instances is perfect for one-off customizations.
