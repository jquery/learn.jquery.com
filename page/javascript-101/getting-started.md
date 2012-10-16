---
title: Getting Started
level: Beginner
source: http://jqfundamentals.com/legacy
attribution: 
  - jQuery Fundamentals
---

##Anatomy of a Web Page
Before we dive into JavaScript, it helps to understand how it aligns with the other technologies when creating web pages.

###HTML IS FOR CONTENT.
HTML is a markup language used to define and describe content. Whether it be a blog post, a search engine result or an e-commerce site, the core content of a web page is written in HTML. A semantic markup, HTML is used to describe content in universal terms (headers, paragraphs, images, etc.).

###CSS IS FOR PRESENTATION.
CSS is a supplemental language that applies style to HTML documents. CSS is all about making your content look better by defining fonts, colors and other visual aesthetics. The power of CSS comes from the fact that your styling is not intermingled with your content. This means you can apply different styles to the same piece of content which is critical when building responsive websites that look good across a range of devices.

###JAVASCRIPT IS FOR INTERACTIVITY.
In the browser, JavaScript adds interactivity and behavior to HTML content. Without JavaScript, web pages would be static and boring. JavaScript helps us bring a web page to life.

To put all this in perspective, let's look at a simple HTML page that includes CSS and JavaScript.

``` html
<html>
<head>
	<title>Hello World</title>
	<!---- CSS for presentation ---->
	<style type="text/css">
		h1 { font-size: 14px; color: hotpink; }
		button { color: red; }
	</style>	
	<!---- JavaScript for interactivity ---->
	<script type="text/javascript">
  	function buttonClick(){alert('Hello!');}
	</script>
</head>
<body>
	<h1>Hello World</h1>
	<button click="buttonClick();">Click Me!</button>
</body>
</html>
```

In the example above, HTML is used to describe the content. The "Hello World" text is described as a heading with the `<h1>` tag and "Click Me!" is described as a button with the `<button>` tag. The `<style>` block contains CSS that changes the font-size and color of the header text. The `<script>` block contains JavaScript that adds interactivity to the button. When a user click on the button, an alert message will appear that says "Hello!".

##A Scripting Language For The Web
JavaScript was originally designed to add interactivity to web pages, not to be a general programming language which makes it a scripting language. [Scripting languages](http://en.wikipedia.org/wiki/Scripting_language) are regarded to be more productive than general languages because they are optimized for their specific domain (in this case, the web browser).

JavaScript was originally a client-side language meaning it could only run in the web browser. However, recent advancements have brought JavaScript to the server-side (via [Node.js](http://nodejs.org/)) so it can now be used in place of languages like PHP, Ruby or ASP. For this guide we'll be focused exclusively on JavaScript running in the browser with jQuery.

JavaScript is based on a open web standard called [ECMAScript](http://en.wikipedia.org/wiki/ECMAScript) which is a really good thing. Standards-based languages are not controlled by any one entity or corporation. Instead, everyone works together in an open manner to define the language which is why the JavaScript you write will run in *every* web browser regardless of the operating system or device. Of course, it's not a perfect world and there are some inconsistencies between browser, but jQuery solves those problems for us.

The name "JavaScript" is a bit misleading. You might think that it holds some relation to [Java](http://en.wikipedia.org/wiki/Java_\(programming_language\)), a general purpose language, but it doesn't. JavaScript was simply release at a time when Java was rising in popularity so the author thought having a similar name would attract new developers. The only thing Java and JavaScript have in common is that their syntax was loosely based on the [C programming language](http://en.wikipedia.org/wiki/C_(programming_language).

##What You Need To Get Started
1. Web Browser
2. Text Editor
3. Developer Tools (optional)

One of the greatest strengths of JavaScript is it's simplicity. It can be written and run on any operating system and the only requirements are a web browser and a text editor. There are numerous tools that attempt to make JavaScript development more productive, but they are completely optional.

###Developer Tools
Commonly referred to as "Developer Tools", browsers ship with built-in features that provide better insight into JavaScript and jQuery as it's running in the browser. While they aren't required, you may find them helpful when it comes to debugging errors in your code. What Developer Tools you will use will depend on your browser. Here are links to the popular ones.

- [Apple Safari](https://developer.apple.com/technologies/safari/developer-tools.html)
- [Google Chrome Developer Tools](https://developers.google.com/chrome-developer-tools/)
- [Microsoft Internet Explorer](http://msdn.microsoft.com/en-us/library/ie/gg589507.aspx)
- [Mozilla Firefox Web Development Tools](https://developer.mozilla.org/en-US/docs/Tools)
- [Opera Dragonfly](http://www.opera.com/developer/tools/)