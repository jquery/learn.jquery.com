---
title: Ajax
chapter: Ajax
section : 1
attribution:  jQuery Fundamentals
---
The XMLHttpRequest method (XHR) allows browsers to communicate with the server
without requiring a page reload.  This method, also known as Ajax (Asynchronous
JavaScript and XML), allows for web pages that provide rich, interactive
experiences.

Ajax requests are triggered by JavaScript code; your code sends a request to a
URL, and when it receives a response, a callback function can be triggered to
handle the response.  Because the request is asynchronous, the rest of your
code continues to execute while the request is being processed, so it’s
imperative that a callback be used to handle the response.

jQuery provides Ajax support that abstracts away painful browser differences.
It offers both a full-featured $.ajax() method, and simple convenience methods
such as `$.get()`, `$.getScript()`, `$.getJSON()`, `$.post()`, and
`$().load()`.

Most jQuery applications don’t in fact use XML, despite the name “Ajax”;
instead, they transport data as plain HTML or JSON (JavaScript Object
Notation).

In general, Ajax does not work across domains.  Exceptions are services that
provide JSONP (JSON with Padding) support, which allow limited cross-domain
functionality.
