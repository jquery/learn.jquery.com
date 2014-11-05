<script>{
	"title": "Using jQuery UI with Bower",
	"level": "intermediate"
}</script>

<div class="warning">**Note:** This documentation refers to functionality made available in jQuery UI 1.11.</div>

[Bower](http://bower.io/) is a package manager for the Web. You can use Bower to download libraries like jQuery UI from the command line, without having to manually download each project from their respective sites.

As an example, suppose we're starting a new project and we need to use [jQuery UI's accordion widget](http://jqueryui.com/accordion/). We'll create a new directory for our project, and add the boilerplate `index.html` shown below.

```
<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>jQuery Projects</title>
</head>
<body>

<div id="projects">
	<h3>jQuery Core</h3>
	<p>jQuery is a fast, small, and feature-rich JavaScript library...</p>
	<h3>jQuery UI</h3>
	<p>jQuery UI is a curated set of user interface interactions...</p>
	<h3>jQuery Mobile</h3>
	<p>jQuery Mobile is a HTML5-based user interface system...</p>
</div>

<script>
	$( "#projects" ).accordion();
</script>

</body>
</html>
```

This examples fails with a JavaScript error because neither jQuery core nor jQuery UI are loaded. Let's load them with Bower.

### Downloading jQuery UI With Bower

Libraries are downloaded with Bower using the `bower install` command. To install jQuery UI, run `bower install jquery-ui`. Doing so creates the following (simplified) directory structure.

*Note: If you get an error that the `bower` command is not found, checkout [Bower's installation instructions](http://bower.io/#installing-bower).*

<pre>
.
├── bower_components
│   ├── jquery
│   │   ├── dist
│   │   │   ├── jquery.js
│   │   │   └── jquery.min.js
│   │   └── src
│   └── jquery-ui
│       ├── themes
│       │   ├── smoothness
│       │   │   ├── jquery-ui.css
│       │   │   └── jquery-ui.min.css
│       │   └── [The rest of jQuery UI's themes]
│       ├── ui
│       │   ├── accordion.js
│       │   ├── autocomplete.js
│       │   └── ...
│       ├── jquery-ui.js
│       └── jquery-ui.min.js
└── index.html
</pre>

A couple of things happened here. First, Bower knew that jQuery UI depends on jQuery core, so it downloaded both libraries automatically. Second, all of jQuery UI's files for the latest release were conveniently placed in a `jquery-ui` directory within a newly created `bower_components` directory.

*Note: If you don't want the latest version, you can optionally provide a version number to `bower install`. For instance `bower install jquery-ui#1.10.4` installs version 1.10.4 of jQuery UI.*

Now that we have the files available, we have to use them.

### Using Bower Downloaded Files

We have a few different options for using the files downloaded with Bower. The easiest is to use the minified and concatenated files in our `bower_components/jquery` and `bower_components/jquery-ui` directories. This approach is shown below.

```
<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>jQuery Projects</title>
	<link rel="stylesheet" href="bower_components/jquery-ui/themes/smoothness/jquery-ui.min.css">
</head>
<body>
 
<div id="projects">
	<h3>jQuery Core</h3>
	<p>jQuery is a fast, small, and feature-rich JavaScript library...</p>
	<h3>jQuery UI</h3>
	<p>jQuery UI is a curated set of user interface interactions...</p>
	<h3>jQuery Mobile</h3>
	<p>jQuery Mobile is a HTML5-based user interface system...</p>
</div>
 
<script src="bower_components/jquery/dist/jquery.min.js"></script>
<script src="bower_components/jquery-ui/jquery-ui.min.js"></script>
<script>
	$( "#projects" ).accordion();
</script>
 
</body>
</html>
```

This code successfully builds our accordion widget, but it also includes the entirety of jQuery UI when we only need the accordion widget. Since there's a lot more than an accordion widget in jQuery UI, this forces the user to download far more than they need.

Because Bower also downloaded jQuery UI's individual source files, we can alternatively use them to send the user just the accordion widget and its dependencies. The following example builds the same accordion widget taking this approach.

```
<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>jQuery Projects</title>
	<link rel="stylesheet" href="bower_components/jquery-ui/themes/smoothness/jquery-ui.min.css">
</head>
<body>

<div id="projects">
	<h3>jQuery Core</h3>
	<p>jQuery is a fast, small, and feature-rich JavaScript library...</p>
	<h3>jQuery UI</h3>
	<p>jQuery UI is a curated set of user interface interactions...</p>
	<h3>jQuery Mobile</h3>
	<p>jQuery Mobile is a HTML5-based user interface system...</p>
</div>

<script src="bower_components/jquery/dist/jquery.js"></script>
<script src="bower_components/jquery-ui/ui/core.js"></script>
<script src="bower_components/jquery-ui/ui/widget.js"></script>
<script src="bower_components/jquery-ui/ui/accordion.js"></script>
<script>
	$( "#projects" ).accordion();
</script>

</body>
</html>
```

From here, you can hook jQuery UI's files into your own custom build system to concatenate and minify your resources for production. If you're a RequireJS user, checkout our [guide on how to use jQuery UI with AMD](/jquery-ui/environments/amd/).