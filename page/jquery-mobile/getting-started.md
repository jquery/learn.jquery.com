<script>{
	"title": "Getting Started with jQuery Mobile",
	"level": "Beginner"
}</script>

jQuery Mobile provides a set of touch-friendly UI widgets and an Ajax-powered navigation system to support animated page transitions. This guide will show you how you can build your first jQuery Mobile application.

## Create a Basic Page Template

To get started, you can simply paste the template below in your favorite text editor, save, and open the document in a browser.

In the `<head>` of this template, a meta `viewport` tag sets the screen width to the pixel width of the device. References to jQuery, jQuery Mobile, and the mobile theme stylesheet from the CDN add all the styles and scripts. jQuery Mobile 1.2 (1.2.0) works with versions of jQuery core from 1.7.0 to 1.8.2.

In the `<body>`, a div with a `data-role` of `page` is the wrapper used to delineate a page. A header bar (`data-role="header"`), a content region (`data-role="content"`) and a footer bar (`data-role="footer"`) are added inside to create a basic page (all three are optional). These `data-` attributes are HTML5 attributes used throughout jQuery Mobile to transform basic markup into an enhanced and styled widget.

```
<!doctype html>
<html>
<head>
	<title>My Page</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="https://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.css">
	<script src="https://code.jquery.com/jquery-1.8.2.min.js"></script>
	<script src="https://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.js"></script>
</head>
<body>
	<div data-role="page">

		<div data-role="header">
			<h1>My Title</h1>
		</div><!-- /header -->

		<div data-role="content">
			<p>Hello world</p>
		</div><!-- /content -->

		<div data-role="footer">
			<h4>My Footer</h4>
		</div><!-- /footer -->

	</div><!-- /page -->
</body>
</html>
```

### Add Content

The next step is to add content inside the content container. Any standard HTML elements – headings, lists, paragraphs, etc. can be added. You can write your own custom styles to create custom layouts by adding an additional stylesheet to the `<head>` after the jQuery Mobile stylesheet.

### Make a Listview

jQuery Mobile includes a diverse set of common listviews that are coded as lists with a `data-role="listview"` added. Here is a simple linked list that has a role of `listview`. The `data-inset="true"` attribute makes the listview look like an inset module, while `data-filter="true"` adds a dynamic search filter.

```
<ul data-role="listview" data-inset="true" data-filter="true">
	<li><a href="#">Acura</a></li>
	<li><a href="#">Audi</a></li>
	<li><a href="#">BMW</a></li>
	<li><a href="#">Cadillac</a></li>
	<li><a href="#">Ferrari</a></li>
</ul>
```

### Add a Slider

The framework contains a full set of form elements that are automatically enhanced into touch-friendly styled widgets. Here's a slider made with the new HTML5 input type of range, no `data-role` needed. All form elements must always be properly associated with a `<label>` and the group of form elements be wrapped in a `<form>` tag.

```
<form>
	<label for="slider-0">Input slider:</label>
	<input type="range" name="slider" id="slider-0" value="25" min="0" max="100" />
</form>
```

### Make a Button

There are a few ways to make buttons. A common one is to turn a link into a button so it's easy to click. Just start with a link and add a `data-role="button"` attribute to it. You can add an icon with the `data-icon` attribute and optionally set its position with the `data-iconpos` attribute.

```
<a href="#" data-role="button" data-icon="star">Star button</a>
```

### Choose a Theme Swatch

jQuery Mobile has a robust theme framework that supports up to 26 sets of toolbar, content, and button colors, called a "swatch". You can add a `data-theme="e"` attribute to any of the widgets on this page: page, header, list, input for the slider, or button to turn it yellow. Different swatch letters from a-e in the default theme can be used to mix and match swatches.

If you add the theme swatch to the page, all the widgets inside the content will automatically inherit the theme (headers and footers don't inherit and default to swatch "a").

```
<a href="#" data-role="button" data-icon="star" data-theme="a">Button</a>
```

If you would like to create a custom theme, you can use [ThemeRoller](http://jquerymobile.com/themeroller/) that allows users to create their own theme through an easy to use drag and drop interface. You will then be able to download and use your newly created theme.

### Go Forth and Build Something

This guide has provided you with a basic structure for a jQuery Mobile page and a few enhanced elements. You can explore the full [jQuery Mobile documentation](http://jquerymobile.com/demos/1.2.0/) to learn about linking pages, adding animated page transitions, and creating dialogs and popups.

If you're more of the type who prefers actually writing JavaScript to build your apps, and you don't want to use the `data-` attribute configuration system, you can take full control of everything and call plugins directly as these are all standard jQuery plugins built with the UI widget factory. Particularly useful information for such cases can be found in the global configuration, events, and methods sections.

Finally, you can read up on scripting pages, generating dynamic pages, and building PhoneGap apps.
