---
chapter : ajax
section : 4
title   : Ajax and Forms
attribution:  jQuery Fundamentals
---
jQuery’s ajax capabilities can be especially useful when dealing with forms.
The [jQuery Form Plugin](http://jquery.malsup.com/form/) is a well-tested tool
for adding Ajax capabilities to forms, and you should generally use it for
handling forms with Ajax rather than trying to roll your own solution for
anything remotely complex.  That said, there are a two jQuery methods you
should know that relate to form processing in jQuery: `$.fn.serialize` and
`$.fn.serializeArray`.

<javascript caption="Turning form data into a query string">
$('#myForm').serialize();
</javascript>

<javascript caption="Creating an array of objects containing form data">
$('#myForm').serializeArray();

// creates a structure like this:
[
  { name : 'field1', value : 123 },
  { name : 'field2', value : 'hello world' }
]
</javascript>
