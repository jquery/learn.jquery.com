<script>{
	"title": "Using the classes Option",
	"level": "advanced"
}</script>

As of the 1.12 release, the jQuery UI widget factory includes a means of managing CSS class names through the [`classes` option](http://api.jqueryui.com/jquery.widget/#option-classes). This article will give you an overview of how the `classes` option works, and discuss what you can do with it.

## Syntax overview

The `classes` option is used to map structural class names to custom class names that you define. To see what this means let's look at an example. The code below uses the `classes` option to create a red dialog:

```
<style>
	.custom-red { background: red; }
</style>
<script>
	var dialog = $( "<div>Red</div>" ).dialog({
		classes: {
			"ui-dialog": "custom-red"
		}
	});
</script>
```

Here, the presentational `custom-red` class name is associated with the structural `ui-dialog` class name. Now, whenever the dialog applies the `ui-dialog` class name, it will also add a `custom-red` class name. You can associate multiple class names by including multiple space-delimited class names in the object's value. For instance the following code creates a dialog that is big and red:

```
<style>
	.custom-red { background: red; }
	.custom-big { font-size: 3em; }
</style>
<script>
	var dialog = $( "<div>Big and red</div>" ).dialog({
		classes: {
			"ui-dialog": "custom-red custom-big"
		}
	});
</script>
```

*Note: To get a full list of the class names you can use with the `classes` option, you can log the default values stored at `$.namespace.wigetName.prototype.options.classes`. For instance, the dialog widget's default values are available at `$.ui.dialog.prototype.options.classes`. Additionally, the API documentation for all jQuery UI widgets list the class names they use; here are dialog's: <http://api.jqueryui.com/dialog/#theming>.*

The `classes` option works like any other widget factory option, which means all the widget factory option mechanisms still apply. For instance, the following code uses the [`option()` method](http://api.jqueryui.com/jquery.widget/#method-option) to remove all class names currently associated with the `ui-dialog` class name:

```
dialog.dialog( "option", "classes.ui-dialog", "" );
```

And the following creates a [widget extension](http://learn.jquery.com/jquery-ui/widget-factory/extending-widgets/) that automatically associates the `custom-red` and `custom-big` class names with the `ui-dialog` class name:

```
<style>
	.custom-red { background: red; }
	.custom-big { font-size: 3em; }
</style>
<script>
	$.widget( "custom.dialog", $.ui.dialog, {
		options: {
			classes: {
				"ui-dialog": "custom-red custom-big"
			}
		}
	});
	$( "<div>Big and red</div>" ).dialog();
</script>
```

As an added benefit, the widget factory also removes any class names specified in the `classes` option when the widget is destroyed.

## Theming

As the previous examples show, the `classes` option provides a quick way to associate custom class names with class names used within a widget. This approach works for simple cases, but it can also be used to adapt third-party themes to work with widget-factory-built widgets. For example, if you're using [Bootstrap](http://getbootstrap.com/) and jQuery UI together, you can use the following code to create a jQuery UI dialog that uses Bootstrap's theming:

```
$.extend( $.ui.dialog.prototype.options.classes, {
	"ui-dialog": "modal-content",
	"ui-dialog-titlebar": "modal-header",
	"ui-dialog-title": "modal-title",
	"ui-dialog-titlebar-close": "close",
	"ui-dialog-content": "modal-body",
	"ui-dialog-buttonpane": "modal-footer"
});
```

For more examples of this approach, check out [Alexander Schmitz's repo](https://github.com/arschmitz/jqueryui-bootstrap-adapter) that adapts jQuery UI to work with Boostrap using the `classes` option.

## Using the `classes` option in your own widgets

Custom widgets can take advantage of the `classes` option just like the jQuery UI widgets do. In fact, the widget factory provides a number of new helper methods to make implementing your own `classes` option relatively easy. As an example consider the following custom redBox widget, *before* the `classes` option:

```
<style>
	.custom-red-box { background: red; }
</style>
<script>
	$.widget( "custom.redBox", {
		_create: function() {
			this.element.addClass( "custom-red-box ui-corner-all" );
		},
		_destroy: function() {
			this.element.removeClass( "custom-red-box ui-corner-all" );
		}
	});
</script>
```

Adding the `classes` option to this widget allows users to do two things: associate new class names with the `custom-red-box` class name, as well as control how the `ui-corner-all` class name is used. The code below shows an updated implementation of the `redBox` widget that makes these use cases possible:

```
<style>
	.custom-red-box { background: red; }
</style>
<script>
	$.widget( "custom.redBox", {
		options: {
			classes: {
				"custom-red-box": "ui-corner-all"
			}
		},
		_create: function() {
			this._addClass( "custom-red-box" );
		},
		_destroy: function() {
			this._removeClass( "custom-red-box" );
		}
	});
</script>
```

There are two changes to note here. The first is the specification of the `classes` property in the `options` object. This configures the default mapping of structural class names to presentational class names. Here the structural `custom-red-box` class name is mapped to a presentational `ui-corner-all` class name.

The second thing to note is the use of the widget factory's new `_addClass()` and `_removeClass()` methods. The methods are shorthands that accept a structural class name and apply it, and its associated presentational class names, to an element. You can specify the element by passing it as the first argument of `_addClass()`/`_removeClass()` (or `_toggleClass()`, which hasn't been mentioned yet, but it also available), or you can omit the element as this example does, in which case the classes are applied to or removed from the widget's main element (`this.element`). For more examples of how these methods work, refer to the API documentation of [`_addClass()`]((http://api.jqueryui.com/jquery.widget/#method-_addClass), [`_removeClass()`]((http://api.jqueryui.com/jquery.widget/#method-_removeClass), and [`_toggleClass()`]((http://api.jqueryui.com/jquery.widget/#method-_toggleClass).

In general, using the `classes` options in your widgets gives your widgets' users flexibility in how your widgets' class names are managed, and lets them adapt to a wide variety of themes.
