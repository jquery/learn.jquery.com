<script>{
	"title": "Plugins",
	"level": "intermediate",
	"customFields": [
		{
			"key": "icon",
			"value": "bolt"
		}
	]
}</script>

A jQuery plugin is simply a new method that we use to extend jQuery's prototype object. By extending the prototype object you enable all jQuery objects to inherit any methods that you add. As established, whenever you call `jQuery()` you're creating a new jQuery object, with all of jQuery's methods inherited.

The idea of a plugin is to do something with a collection of elements. You could consider each method that comes with the jQuery core a plugin, like `.fadeOut()` or `.addClass()`.

You can make your own plugins and use them privately in your code or you can release them into the wild. There are thousands of jQuery plugins available online. The barrier to creating a plugin of your own is so low that you'll want to do it straight away!

While most existing jQuery plugins are stateless – that is, we call them on an element and that is the extent of our interaction with the plugin – there's a large set of functionality that doesn't fit into the basic plugin pattern.

In order to fill this gap, jQuery UI has implemented a more advanced plugin system. The new system manages state, allows multiple functions to be exposed via a single plugin, and provides various extension points. This system is called the Widget Factory and is exposed as `jQuery.widget` as part of jQuery UI 1.8; however, it can be used independently of jQuery UI.

For details on the capabilities of the Widget Factory, see this [How To Use the Widget Factory](/jquery-ui/widget-factory/how-to-use-the-widget-factory/).
