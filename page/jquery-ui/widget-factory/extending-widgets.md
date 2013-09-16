---
title: Extending Widgets with the Widget Factory
level: intermediate
---

jQuery UI's widget factory makes it easy to build widgets that extend the functionality of existing widgets. Doing so allows you to build powerful widgets on top of an existing base, as well as make small tweaks to an existing widget's functionality.

### Creating Widget Extensions

Creating widgets with the widget factory is done by passing the name of the widget and a prototype object to `$.widget`. The following creats a "myWidget" widget in the "myNamespace" namespace.

```
$.widget( "myNamespace.myWidget" {} );
```

`$.widget` also accepts the constructor of a widget to extend as an optional parameter. For instance, the constructor of [jQuery UI's dialog widget](http://jqueryui.com/dialog/) is `$.ui.dialog`.

When specifying a base widget, pass it as a second argument - after the widget's name, and before the widget's prototype object. The following creates a "superDialog" widget based on the dialog widget in the `"my"` namespace.

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

The original `show()` method is still available at `$.ui.dialog.prototype.open()`, and can be invoked. The following creates a new widget with an `open()` method that logs `"Opened"` then calls dialog's `open()`.

```
$.widget( "my.superDialog", $.ui.dialog, {
	open: function() {
		console.log( "Opened" );
		return $.ui.dialog.prototype.open.apply( this, arguments );
	}
});

$( "#dialog" ).superDialog();
```

### Using _super to Access Parents

Referencing the parent widget's prototype methods is a bit verbose, therefore in [jQuery UI 1.9](http://jqueryui.com/upgrade-guide/1.9/) the [`_super()` method](http://api.jqueryui.com/jquery.widget/#method-_super) was introduced.

`_super()` invokes the method of the same name from the parent widget with the same set of arguments. Therefore we can replace our call to `$.ui.dialog.prototype.open()` with one to `_super()`.

```
$.widget( "my.superDialog", $.ui.dialog, {
	open: function() {
		console.log( "Opened" );
		return this._super();
	}
});

$( "#dialog" ).superDialog();
```

### Redefining Widgets

Another feature added in jQuery UI 1.9 was the ability for widgets to redefine themselves. Therefore, instead of creating a new widget we can pass `$.widget` an existing widget's name and constructor. The following example adds the same logging in `open()`, but doesn't create a new widget to do so.

```
$.widget( "ui.dialog", $.ui.dialog, {
	open: function() {
		console.log( "Opened" );
		return this._super();
	}
});

$( "#dialog" ).dialog();
```

Now you can extend an existing widget's method, and still have access to the original methods using `_super()`.
