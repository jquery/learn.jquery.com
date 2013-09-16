---
title: Extending Widgets with the Widget Factory
level: intermediate
---

jQuery UI's widget factory makes it easy to build widgets that extend the functionality of existing widgets. Doing so allows you to build powerful widgets on top of an existing base, as well as make small tweaks to an existing widget's functionality.

### Creating Widget Extensions

Creating widgets with the widget factory is done by passing the name of the widget and a prototype object to `$.widget`. The following creates a "myWidget" widget in the "myNamespace" namespace.

```
$.widget( "myNamespace.myWidget", {} );
```

`$.widget` also accepts the constructor of a widget to extend as an optional parameter. For instance, the constructor of [jQuery UI's dialog widget](http://jqueryui.com/dialog/) is `$.ui.dialog`.

When specifying a base widget, pass it as a second argument - after the widget's name, and before the widget's prototype object. The following creates a "superDialog" widget based on the dialog widget in the "my" namespace.

```
$.widget( "my.superDialog", $.ui.dialog, {} );
```

Here superDialog and dialog are essentially equivalent widgets with different names and namepaces. To make our new widget more interesting we can add methods to its prototype.

The prototype object to use for a widget is the final argument passed to `$.widget`. To this point our examples have been using an empty object. Let's add a method to the prototype:

```
$.widget( "my.superDialog", $.ui.dialog, {
	red: function() {
		this.element.css( "color", "red" );
	}
});

// Create a new <div>, convert it into a superDialog, and call the red method.
$( "<div>I am red</div>" )
	.superDialog()
	.superDialog( "red" );
```

Now the `superDialog` has a `red()` method that will change its text red. Note how the widget factory automatically sets `this` equal to the widget's instance. For a full list of the methods and properties available on the instance see [the widget factory's API documentation](http://api.jqueryui.com/jquery.widget/).

### Extending Existing Methods

Sometimes you need to tweak or add to the behavior of existing widget methods. The do this, specify a method with the same name on the prototype object passed to `$.widget`. The following overrides dialog's [`open()` method](http://api.jqueryui.com/dialog/#method-open). Since dialogs automatically open by default, `"open"` will be logged when this code runs.

```
$.widget( "my.superDialog", $.ui.dialog, {
	open: function() {
		console.log( "open" );
	}
});

// Create a new <div>, and convert it into a superDialog
$( "<div>" ).superDialog();
```

While this runs, there's a problem. Since we overrode the default behavior of `open()`, the dialog no longer displays on the screen.

When we place methods on the prototype object we are not actually overriding the original method - rather, we are placing a new method at a higher level in the prototype chain.

The original `show()` method is still available at `$.ui.dialog.prototype.open()`, and can be invoked. To make this easy, the widget factory provides two methods - `_super()` and `superApply()`.

### Using `_super` and `_superApply` to Access Parents

Referencing the parent widget's prototype methods is a bit verbose, therefore [jQuery UI 1.9](http://jqueryui.com/upgrade-guide/1.9/) introduced the [`_super()`](http://api.jqueryui.com/jquery.widget/#method-_super) and [`_superApply()`](http://api.jqueryui.com/jquery.widget/#method-_superApply) methods.

`_super()` and `_superApply()` both invoke the method of the same name from the parent widget. For example the following creates a new widget with an `open()` method that logs `"open"`, then invokes dialog's `open()` method.

```
$.widget( "my.superDialog", $.ui.dialog, {
	open: function() {
		console.log( "open" );
		// Invoke the parent widget's open()
		return this._super();
	}
});

$( "<div>" ).superDialog();
```

`_super()` and `superApply()` were designed to behave like the native `Function.prototype.call()` and `Function.prototype.apply()` methods. Therefore, `_super()` accepts an argument list, and `superApply()` accepts a single array of arguments. This difference is shown in the example below.

```
$.widget( "my.superDialog", $.ui.dialog, {
	_setOption: function( key, value ) {
		// Both invoke dialog's setOption method. _super requires the arguments be
		// passed as an argument list, _superApply as a single array.
		this._super( key, value );
		this._superApply( arguments );
	}
});
```

### Redefining Widgets

Another feature added in jQuery UI 1.9 was the ability for widgets to redefine themselves. Therefore, instead of creating a new widget, we can pass `$.widget` an existing widget's name and constructor. The following example adds the same logging in `open()`, but doesn't create a new widget to do so.

```
$.widget( "ui.dialog", $.ui.dialog, {
	open: function() {
		console.log( "open" );
		return this._super();
	}
});

$( "<div>" ).dialog();
```

Now you can extend an existing widget's method, and still have access to the original methods using `_super()`.

### Widgets and Polymorphism

One word of warning when interacting with widget extensions and their plugins. The parent widget's plugin cannot be used to invoke methods on elements that are child widgets. This is shown in the example below.

```
$.widget( "my.superDialog", $.ui.dialog, {} );

var dialog = $( "<div>" ).superDialog();

// This works
dialog.superDialog( "close" );

// This doesn't
dialog.dialog( "close" );
```

Above, the parent widget's plugin, `dialog()`, cannot invoke the `close()` method on an element that is a superDialog. If you need to access the parent's methods, you need to specify a new method on the prototype and use `_super()` or `_superApply()` to access the parent's method.

For more on the invoking widget methods see [Widget Method Invocation](/jquery-ui/widget-factory/widget-method-invocation/). For more information on the widget plugin bridge see [its documentation](http://api.jqueryui.com/jQuery.widget.bridge/).
