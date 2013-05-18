---
title: Getting Started
level: Beginner
source: http://jqfundamentals.com/legacy
attribution:
  - jQuery Fundamentals
---

## Anatomy of a Web Page

Before diving into JavaScript, it helps to understand how it aligns with the other web technologies.

### HTML is for Content

HTML is a markup language used to define and describe content. Whether it be a blog post, a search engine result, or an e-commerce site, the core content of a web page is written in HTML. A semantic markup, HTML is used to describe content in universal terms (headers, paragraphs, images, etc.)

### CSS is for Presentation

CSS is a supplemental language that applies style to HTML documents. CSS is all about making content look better by defining fonts, colors, and other visual aesthetics. The power of CSS comes from the fact that styling is not intermingled with content. This means you can apply different styles to the same piece of content, which is critical when building responsive websites that look good across a range of devices.

### JavaScript is for Interactivity

In the browser, JavaScript adds interactivity and behavior to HTML content. Without JavaScript, web pages would be static and boring. JavaScript helps bring a web page to life.

Look at this simple HTML page that includes CSS and JavaScript to see how it all fits together:

```
<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<title>Hello World</title>

	<!-- CSS for presentation. -->
	<style>
	h1 { font-size: 14px; color: hotpink; }
	button { color: red; }
	</style>
</head>
<body>
	<h1>Hello World</h1>
	<button>Click Me!</button>

	<!-- JavaScript for interactivity. -->
	<script>

	// Get a handle on the first button element in the document.
	var button = document.querySelector( "button" );

	// If a user clicks on it, say hello!
	button.addEventListener( "click", function( ev ) {
		alert( "Hello" );
	}, false);

	</script>
</body>
</html>
```

In the example above, HTML is used to describe the content. The "Hello World" text is described as a heading with the `<h1>` tag and "Click Me!" is described as a button with the `<button>` tag. The `<style>` block contains CSS that changes the font size and color of the header text. The `<script>` block contains JavaScript that adds interactivity to the button. When a user clicks on the button, an alert message will appear that says "Hello!"

## A Scripting Language for the Web

JavaScript was originally designed to add interactivity to web pages, not to be a general programming language, which makes it a scripting language. [Scripting languages](http://en.wikipedia.org/wiki/Scripting_language) are regarded to be more productive than general languages because they are optimized for their specific domain (in this case, the web browser). However, recent advancements have brought JavaScript to the server-side (via [Node.js](http://nodejs.org/)) so it can now be used in place of languages like PHP, Ruby, or ASP. This guide will focus exclusively on JavaScript running in the browser with jQuery.

The name "JavaScript" is a bit misleading. Despite the similarity in name, JavaScript has no relationship with [Java](http://en.wikipedia.org/wiki/Java_\(programming_language\), a general purpose language. JavaScript is based on an open web standard called [ECMAScript](http://en.wikipedia.org/wiki/ECMAScript). Standards-based languages are not controlled by any one entity or corporation – instead, developers work together to define the language, which is why JavaScript will run in *every* web browser regardless of the operating system or device.

## What You Need to Get Started with JavaScript and jQuery

1. Web Browser
2. Text Editor
3. Developer Tools (optional)

One of JavaScript's greatest strengths is its simplicity. It can be written and run on any operating system, and the only requirements are a web browser and a text editor. There are also numerous tools that can make JavaScript development more productive, but they are completely optional.

### Developer Tools

Commonly referred to as "developer tools," many browsers ship with built-in features that provide better insight into JavaScript and jQuery while they run in the browser. Although they aren't required, you may find developer tools helpful when it comes to debugging errors in your code. Check out these browsers' developer tools:

- [Apple Safari](https://developer.apple.com/technologies/safari/developer-tools.html)
- [Google Chrome Developer Tools](https://developers.google.com/chrome-developer-tools/)
- [Microsoft Internet Explorer](http://msdn.microsoft.com/en-us/library/ie/gg589507.aspx)
- [Mozilla Firefox Web Development Tools](https://developer.mozilla.org/en-US/docs/Tools)
- [Opera Dragonfly](http://www.opera.com/dragonfly/)
