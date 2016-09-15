<script>{
	"title": "Using the classes Option",
	"level": "advanced"
}</script>

As of the 1.12 release, the jQuery UI widget factory includes a means of managing CSS class names through the [`classes` option](http://api.jqueryui.com/jquery.widget/#option-classes). This article will give you an overview of how the `classes` option works, and discuss what you can do with it.

## Syntax overview

The `classes` option is used to map structural class names to theme-related class names that you define. To see what this means let's look at an example. The code below uses the `classes` option to create a red dialog:

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

Here, the presentational `custom-red` class name is associated with the structural `ui-dialog` class name. Now, whenever the dialog applies the `ui-dialog` class name, it will also add a `custom-red` class name. However, something other than adding the `custom-red` class has happened here, which isn't immediately obvious. This code also *removes* the existing default value which was `"ui-corner-all"`. You can associate multiple class names by including multiple space-delimited class names in the object's value. For instance the following code creates a dialog that is red and still has rounded corners:

```
<style>
	.custom-red { background: red; }
</style>
<script>
	var dialog = $( "<div>Big and red</div>" ).dialog({
		classes: {
			"ui-dialog": "ui-corner-all custom-red"
		}
	});
</script>
```

*Note: To get a full list of the class names you can use with the `classes` option, check the API documentation for the jQuery UI widget you're interested in. For example, here's the list of classes for the dialog width: <http://api.jqueryui.com/dialog/#theming>.*

The `classes` option works like any other widget factory option, which means all the widget factory option mechanisms still apply. For instance, the following code uses the [`option()` method](http://api.jqueryui.com/jquery.widget/#method-option) to remove all class names currently associated with the `ui-dialog` class name:

```
dialog.dialog( "option", "classes.ui-dialog", null );
```

And the following creates a [widget extension](http://learn.jquery.com/jquery-ui/widget-factory/extending-widgets/) that automatically associates the `custom-red` class with the `ui-dialog` class:

```
<style>
	.custom-red { background: red; }
</style>
<script>
	$.widget( "custom.dialog", $.ui.dialog, {
		options: {
			classes: {
				"ui-dialog": "ui-corner-all custom-red custom-big"
			}
		}
	});
	$( "<div>Big and red</div>" ).dialog();
</script>
```

As an added benefit, the widget factory also removes any class names specified in the `classes` option when the widget is destroyed.

## Theming

As the previous examples show, the `classes` option provides a quick way to associate theme-related class names with the structural class names used within a widget. This approach works for simple cases, but it can also be used to adapt third-party themes to work with widget-factory-built widgets. For example, if you're using [Bootstrap](http://getbootstrap.com/) and jQuery UI together, you can use the following code to create a jQuery UI dialog that uses Bootstrap's theming:

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

## Conclusion

The introduction of the `classes` option takes us one step further in the split between structural and theme-related classes, making it easier than ever to make jQuery UI widgets match the look and feel of your existing site. At the same time, this allows jQuery UI to be used alongside other CSS frameworks, just like jQuery can be used alongside other JavaScript frameworks.
