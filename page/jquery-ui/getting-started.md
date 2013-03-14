---
title: Getting Started with jQuery UI
level: beginner
---

### What is jQuery UI?
jQuery UI is a widget and interaction library built on top of the jQuery JavaScript Library that you can use to build highly interactive web applications.  This guide is designed to get you up to speed on how jQuery UI works. Follow along below to get started.

### Start by checking out the demos
To get a feel for what jQuery UI is capable of, check out the [UI Demos](http://jqueryui.com/demos/).

In the demos section, the navigation lists all of the interactions and widgets that jQuery UI offers. Choose an interaction or widget and you'll be presented with several demo configurations for that particular plugin. Each demo allows you to view source code, change themes, and the URL can always be bookmarked. For example, check out the [accordion widget's fill space demo page](http://jqueryui.com/accordion/#fillspace).

### Build your custom jQuery UI download
Once you have a basic understanding of what jQuery UI is and what it does, you're ready to try it out! It's time to head over to the [Download Builder](http://jqueryui.com/download/) on the jQuery UI website to download a copy of jQuery UI. jQuery UI's download builder allows you to choose the components you would like to download and get a custom version of the library for your project. There are 3 easy steps to building your custom jQuery UI download:

#### Step 1: Choose which components you need
The main column of the Download Builder lists all of the javascript components in jQuery UI categorized into groups: core, interations, widgets, and effects. Some components in jQuery UI depend on other components. Just check the boxes for the widgets you'd like to download and any required dependencies will automatically be checked as well. The components you select will all be combined into a custom jQuery UI javascript file.

![Configuring a download](/resources/jquery-ui/configure.png)

#### Step 2: Select a theme (or roll your own custom theme)
In the right column of the download builder, you'll find a field where you can choose from a number of pre-designed themes for your jQuery UI widgets.
You can either choose from the various themes we provide, or you can design your own custom theme using ThemeRoller (more on that later).

**Advanced Theme Settings:** *The theme section of the download builder also offers some advanced configuration settings for your theme. If you plan to use multiple themes on a single page, these fields will come in handy. If you plan to only use one theme on a page, you can skip these settings entirely.*

#### Step 3: Choose a version of jQuery UI
The last step in the download builder is to select a version number. This is a very important step because jQuery UI versions are designed to work with specific versions of jQuery. The current versions are:

* jQuery UI 1.10.0 - Requires jQuery 1.6+
* jQuery UI 1.9.2 - Requires jQuery 1.6+

#### Click Download!
You're finished with the download builder! Click the download button and you'll get a customized zip file containing everything you selected.

### After downloading: Intro to using jQuery UI
Once you've downloaded jQuery UI, you'll get a zip containing the following files:

* `/css/`
* `/development-bundle/`
* `/js/`
* `index.html`

### Basic overview: using jQuery UI on a web page
Open up index.html in a text editor and you'll see that it links to a few dependencies: your theme, jQuery, and jQuery UI. Generally, you'll need to include these 3 files on any page to use jQuery UI widgets and interactions:


```html
<link type="text/css" href="css/themename/jquery-ui.custom.css" rel="Stylesheet" />
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/jquery-ui.custom.min.js"></script>
```

Once you've included the necessary files, you can add some jQuery widgets to your page. For example, to make a datepicker widget, you'll add a text input element to your page and then call .datepicker(); on it. Like this:

**HTML:**
```html
<input type="text" name="date" id="date">
```

**JS:**
```javascript
$('#date').datepicker();
```

![Example Screenshot](/resources/jquery-ui/ex-datepicker.png)

#### That's it!
For demos of all of the jQuery UI widgets and interactions. Check out the demos section of the jQuery UI website.

### Customizing jQuery UI to your needs
jQuery UI allows you to customize it in several ways. You've already seen how the download builder allows you to customize your copy of jQuery UI to include only the portions you want, but there are additional ways to customize that code to your implementation.

### jQuery UI basics: using options
Each plugin in jQuery UI has a default configuration which is catered to the most basic and common use case. But if you want a plugin to behave different from its default configuration, you can override each of its default settings using "options". Options are a set of properties passed into a jQuery UI widget as an argument. For example, the slider widget has an option for orientation, which allows you to specify whether the slider should be horizontal or vertical. To set this option for a slider on your page, you just pass it in as an argument, like this:


```javascript
$('#mySliderDiv').slider({
  orientation: 'vertical'
});
```

You can pass as many different options as you'd like by following each one with a comma (except the last one):

```javascript
$('#mySliderDiv').slider({
  orientation: 'vertical',
  min: 0,
  max: 150,
  value: 50
});
```

Just remember to surround your options with curly brackets `{ }`, and you're well on your way. Of course, the example above barely touches on what you can do with jQuery UI. To get detailed information on the entire set of jQuery UI widgets, visit the [jQuery UI documentation](http://jqueryui.com/demos/).

### Visual customization: Designing a jQuery UI theme
If you want to design your own theme, jQuery UI has a very slick application for just that purpose. It's called ThemeRoller, and you can always get to it by either clicking the "Themes" link in the jQuery UI navigation, or simply going to [jQuery UI Themeroller](http://jqueryui.com/themeroller/).

ThemeRoller provides a custom interface for designing all of the elements used by jQuery UI widgets. As you tweak the "levers" in the left column, the widgets on the right will reflect your design. The Gallery tab of ThemeRoller offers a number of pre-designed themes (the same ones offered by the download builder) that you can tweak or download as they are.

![Themeroller Example](/resources/jquery-ui/themeroller.png)

### Downloading your theme
When you click the "Download theme" button in ThemeRoller, you'll be directed to the Download Builder and your custom theme will be auto-selected in the Theme dropdown menu. You can configure your download package further from there. Once you download, you'll see that the example.html page is styled using your custom theme.

**Quick tip:** *If you ever need to edit your theme, simply open the CSS file and find on line 43 where it says "To view and modify this theme, visit ..." That url will open the theme in ThemeRoller for editing.*

### Support: Where can I get help?
JQuery UI user and developer resources are kept up-to-date at the [Support Center](http://jqueryui.com/support).

### Developers Wanted!
Want to join the jQuery UI team? We'd love your help! Visit the UI [Development Center](http://jqueryui.com/development) for details on how to get involved.
