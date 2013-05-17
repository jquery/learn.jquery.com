---
title: How To Write a Theme
level: advanced
---

### File Structure

Themes are meant to be structured in a specific manner in order to increase their ease of use. The general file directory structure is as follows:

* `themename/` – Your theme should be completely contained within a single directory named the same as your theme.
* `themename/themename.css` – This is your base CSS file. This file will be included on every page that uses your theme, regardless of which plugins are being used. This file should be very lightweight and only include the essentials.
* `themename/themename.pluginname.css` – You'll need one CSS file for each plugin that you support. The name of the plugin should be included directly in the filename. For example, if you themed the tabs plugin, you would have: `themename.tabs.js`.
* `themename/img.png` – Your theme can include images, if need be. They can be named whatever you'd like, there is no particular naming convention for these.

For examples of how theme file structures are done, feel free to look through the [jQuery UI base theme](https://github.com/jquery/jquery-ui/tree/master/themes/base).

### Styling

Writing styles for themes is rather simplistic – which is good, as it allows for a great amount of flexibility.

All themes should have a base CSS class to work off of. This main class allows the user to enable, and switch between, themes. Your root class should be of the format `.ui-themename`. And it will be used like so, within a user's HTML file:

```html
<html>
<head>
	<title>My Site</title>
	<link rel="stylesheet" href="themename/themename.css" />
	<link rel="stylesheet" href="othertheme/othertheme.css" />
	<link rel="stylesheet" href="othertheme/othertheme.dialog.css" />
</head>
<body class="ui-themename">
	<div class="ui-othertheme">
		<div class="ui-dialog">This is a modal dialog.</div>
	</div>
</body>
</html>
```

In the above example, a couple important things are occurring:

* We're loading two themes into a document at the same time.
* The whole page, and all of its contents, are themed according to themename's styling.
* However, the `<div>` with the class of ui-othertheme, and everything inside of it (including the modal dialog), is themed according to othertheme's styling rules.

If we were to take a look inside `themename.css` we might see something like the following:

```css
body.ui-themename { background:#111; color:snow; }
.ui-themename a, a.ui-themename { color:#68D; outline:none; }
.ui-themename a:visited, a.ui-themename:visited { color:#D66; }
.ui-themename a:hover, a.ui-themename:hover { color:#FFF; }
```

If you'll notice, the `themename.css` file only contains styling information that is globally applicable (nothing plugin-specific is contained within here). This will be true for all cases where a theme is built. Don't worry about a theme taking up multiple files – that will be simplified within the build and download process.
