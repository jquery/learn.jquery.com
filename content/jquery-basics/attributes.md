---
chapter : "jqfundamentals"
section : "4"
title   : "Attributes"
---
## Attributes

An element's attributes can contain useful information for your application, so it's important to be able to get and set them.

The `$.fn.attr` method acts as both a getter and a setter. As with the `$.fn.css` method, `$.fn.attr` as a setter can accept either a key and a value, or an object containing one or more key/value pairs.

<div class="example" markdown="1">
Setting attributes

    $('a').attr('href', 'allMyHrefsAreTheSameNow.html');
    $('a').attr({
        'title' : 'all titles are the same too!',
        'href' : 'somethingNew.html'
    });
</div>

This time, we broke the object up into multiple lines. Remember, whitespace doesn't matter in JavaScript, so you should feel free to use it liberally to make your code more legible! You can use a minification tool later to strip out unnecessary whitespace for production.

<div class="example" markdown="1">
Getting attributes

    $('a').attr('href');  // returns the href for the first a element in the document
</div>