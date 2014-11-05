<script>{
	"title": "How jQuery UI Works",
	"level": "beginner"
}</script>

jQuery UI contains many widgets that maintain [state](http://en.wikipedia.org/wiki/State_%28computer_science%29) and therefore may have a slightly different usage pattern than typical jQuery plugins you are already used to. While the initialization is the same as most jQuery plugins, jQuery UI's widgets are built on top of the [Widget Factory](/jquery-ui/widget-factory/) which provides the same general API to all of them. So if you learn how to use one, then you'll know how to use all of them! This document will walk you through the common functionality, using the [progressbar](http://jqueryui.com/progressbar/) widget for the code examples.

## Initialization

In order to track the state of the widget, we must introduce a full life cycle for the widget. The life cycle starts when the widget is initialized. To initialize a widget, we simply call the plugin on one or more elements.

```
$( "#elem" ).progressbar();
```

This will initialize each element in the jQuery object, in this case the element with an id of "elem". Because we called the `.progressbar()` method with no parameters, the widget is initialized with its default options. We can pass a set of options during initialization in order to override the default options.

```
$( "#elem" ).progressbar({ value: 20 });
```

We can pass as many or as few options as we want during initialization. Any options that we don't pass will just use their default values.

The options are part of the widget's state, so we can set options after initialization as well. We'll see this later with the `option` method.

## Methods

Now that the widget is initialized, we can query its state or perform actions on the widget. All actions after initialization take the form of a method call. To call a method on a widget, we pass the name of the method to the jQuery plugin. For example, to call the `value` method on our progressbar widget, we would use:

```
$( "#elem" ).progressbar( "value" );
```

If the method accepts parameters, we can pass them after the method name. For example, to pass the parameter `40` to the `value` method, we can use:

```
$( "#elem" ).progressbar( "value", 40 );
```

Just like other methods in jQuery, most widget methods return the jQuery object for chaining.

```
$( "#elem" )
	.progressbar( "value", 90 )
	.addClass( "almost-done" );
```

### Common Methods

Each widget will have its own set of methods based on the functionality that the widget provides. However, there are a few methods that exist on all widgets.

#### option

As we mentioned earlier, we can change options after initialization through the `option` method. For example, we can change the progressbar's value to 30 by calling the `option` method.

```
$( "#elem" ).progressbar( "option", "value", 30 );
```

Note that this is different from the previous example where we were calling the `value` method. In this example, we're calling the `option` method and saying that we want to change the value option to 30.

We can also get the current value for an option.

```
$( "#elem" ).progressbar( "option", "value" );
```

In addition, we can update multiple options at once by passing an object to the `option` method.

```
$( "#elem" ).progressbar( "option", {
	value: 100,
	disabled: true
});
```

You may have noticed that the `option` method has the same signature as getters and setters in jQuery core, such as `.css()` and `.attr()`. The only difference is that you have to pass the string "option" as the first parameter.

#### disable

As you might guess, the `disable` method disables the widget. In the case of progressbar, this changes the styling to make the progressbar look disabled.

```
$( "#elem" ).progressbar( "disable" );
```

Calling the `disable` method is equivalent to setting the `disabled` option to `true`.

#### enable

The `enable` method is the opposite of the `disable` method.

```
$( "#elem" ).progressbar( "enable" );
```

Calling the `enable` method is equivalent to setting the `disabled` option to `false`.

#### destroy

If you no longer need the widget, you can destroy it and return back to the original markup. This ends the life cycle of the widget.

```
$( "#elem" ).progressbar( "destroy" );
```

Once you destroy a widget, you can no longer call any methods on it unless you initialize the widget again. If you're removing the element, either directly via `.remove()` or by modifying an ancestor with `.html()` or `.empty()`, the widget will automatically destroy itself.

#### widget

Some widgets generate wrapper elements, or elements disconnected from the original element. In these cases, the `widget` method will return the generated element. In cases like the progressbar, where there is no generated wrapper, the `widget` method returns the original element.

```
$( "#elem" ).progressbar( "widget" );
```

## Events

All widgets have events associated with their various behaviors to notify you when the state is changing. For most widgets, when the events are triggered, the names are prefixed with the widget name. For example, we can bind to progressbar's change event which is triggered whenever the value changes.

```
$( "#elem" ).bind( "progressbarchange", function() {
	alert( "The value has changed!" );
});
```

Each event has a corresponding callback, which is exposed as an option. We can hook into progressbar's `change` callback instead of binding to the `progressbarchange` event, if we wanted to.

```
$( "#elem" ).progressbar({
	change: function() {
		alert( "The value has changed!" );
	}
});
```

### Common Events

While most events will be widget specific, all widgets have a `create` event. This event will be triggered immediately after the widget is created.
