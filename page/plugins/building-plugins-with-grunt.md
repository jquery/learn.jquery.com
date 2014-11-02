---
title: Building Plugins with Grunt
level: intermediate
---

*This article covers the creation of a new jQuery plugin. If you have an existing plugin that doesn't use Grunt, it's a good idea to run through these steps in a clean directory and port your plugin code into the new project.*

[Grunt](http://gruntjs.com) is a popular, task-based JavaScript build tool used by the jQuery team, and many plugin authors, to perform common tasks such as testing, compilation, minification and concatenation.

New projects that depend on Grunt can be quickly scaffolded using [Grunt-init](https://github.com/gruntjs/grunt-init), a small, officially-maintained command line utility that generates boilerplate code from specially defined templates.

In this tutorial, we're going to use Grunt-init to guide us through the creation of a new jQuery plugin.

## Setting up our environment

Before getting started, ensure you have the following installed:

 - [Node.js](http://nodejs.org/)
 - [Git](http://git-scm.com/downloads)

### Installing Grunt-init

To expose the `grunt-init` command line utility, we need Grunt-init installed globally. We'll install it from the terminal using [npm](https://npmjs.org/), which comes bundled with Node:

```
$ npm install -g grunt-init
```

We can see a list of installed templates by running `grunt-init` with no arguments:

```
$ grunt-init
```

Unless you've installed Grunt-init previously, we won't have any templates available yet.

### Installing the jQuery Grunt-init template

Grunt-init templates are stored in the '.grunt-init' folder in your home directory.

We'll install the official [Grunt-init jQuery template](https://github.com/gruntjs/grunt-init-jquery) by cloning the repository into our local templates directory.

*Mac/Linux users:*

```
$ git clone git@github.com:gruntjs/grunt-init-jquery.git ~/.grunt-init/jquery
```

*Windows users:*

```
git clone git@github.com:gruntjs/grunt-init-jquery.git %USERPROFILE%\.grunt-init\jquery
```

If we run `grunt-init` again, we can now see a 'jquery' template available.

## Creating our plugin

Now that we have Grunt-init and the jQuery template installed, we can use them to scaffold a new jQuery project:

```
$ mkdir jquery.my-plugin-name
$ cd jquery.my-plugin-name
$ grunt-init jquery
```

This will prompt us to enter our plugin's name and other metadata, such as version information, URLs and licenses. The jQuery plugins site has some important advice on [naming your plugin](http://plugins.jquery.com/docs/names/).

Once completed, we're left with a basic jQuery plugin, a 'Gruntfile' containing Grunt configuration and some placeholder tests.

### Setting up Grunt

In order to expose the `grunt` command, which will allow us to run Grunt tasks in our newly scaffolded jQuery project, we'll need to globally install 'grunt-cli':

*Note: If you already have an older version of Grunt installed, you'll first need to remove it with `npm uninstall -g grunt`.*

```
$ npm install -g grunt-cli
```

Our Grunt build currently has some Node dependencies, which are specified in our ['package.json'](http://package.json.nodejitsu.com/) file. These dependencies can be downloaded automatically by running the following command from our plugin directory:

```
$ npm install
```

### Our first Grunt build

Now that we have Grunt and our project's dependencies installed, we can execute the default task from our Gruntfile by running the following command from inside our plugin directory:

```
$ grunt
```

With our unmodified boilerplate Gruntfile, the default task will do the following:

 * [Lint](http://en.wikipedia.org/wiki/Lint_software) our code with [JSHint](http://www.jshint.com/)
 * Run unit tests with [QUnit](http://qunitjs.com/)
 * Concatenate our source files with copyright headers generated from our plugin metadata
 * Minify our code with [UglifyJS](http://lisperator.net/uglifyjs/)

Since we haven't touched the scaffolded code yet, we should see these steps complete successfully.

### Writing the plugin

In our plugin directory, we have the following folders with some sample code:

 * 'src' where we'll write our plugin code
 * 'test' containing our QUnit tests
 * 'libs' containing third-party code

If you don't know how to write the jQuery plugin itself, make sure you read the [basic jQuery plugin creation guide](../basic-plugin-creation).

While optional, it's a good idea to test-drive our plugin by first writing a failing test in the 'test' directory, followed by the implementation code in the 'src' directory that causes our previously failing test to pass.

*If you're porting an existing plugin, copy your plugin code into the 'src' directory. If you have existing tests, you should be able to find a plugin for your test framework on the [Grunt plugin registry](http://gruntjs.com/).*

### Testing our plugin

To run our QUnit tests in isolation, we can run the 'qunit' task directly:

```
$ grunt qunit
```

Equally, we can lint our code in isolation with the 'jshint' task:

```
$ grunt jshint
```

Since we want to lint and test our code often during development, we can do this automatically every time a file is saved by running the 'watch' task:

```
$ grunt watch
```

### Preparing our plugin for distribution

Once our plugin is complete, run the default task using the `grunt` command.

```
$ grunt
```

If our tests pass and our code is successfully linted, this will generate minified and unminified versions of the plugin in the 'dist' directory, ready for public distribution.

### Working with Grunt

In this tutorial, we've only scratched the surface of what can be done with Grunt.

If you have any additional requirements, such as [CoffeeScript](http://coffeescript.org) compilation or [RequireJS](http://requirejs.org/) optimization, the Grunt website has a [complete list of Grunt plugins](http://gruntjs.com/).

For more information on installing plugins and configuring your Grunt build, read [Grunt's official 'Getting started' guide](https://github.com/gruntjs/grunt/wiki/Getting-started).