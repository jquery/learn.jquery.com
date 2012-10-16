---
title   : Effect Exercises
---
### Reveal Hidden Text

Open the file `/exercises/index.html` in your browser.  Use the file
`/exercises/js/blog.js`.  Your task is to add some interactivity to the blog
section of the page.  The spec for the feature is as follows:

*	Clicking on a headline in the #blog div should slide down the excerpt
  paragraph

*	Clicking on another headline should slide down its excerpt paragraph, and
  slide up any other currently showing excerpt paragraphs.

Hint: don't forget about the `:visible` selector!

### Create Dropdown Menus

Open the file `/exercises/index.html` in your browser.  Use the file
`/exercises/js/navigation.js`.  Your task is to add dropdowns to the main
navigation at the top of the page.

*	Hovering over an item in the main menu should show that item's submenu items,
  if any.

*	Exiting an item should hide any submenu items.

To accomplish this, use the `$.fn.hover` method to add and remove a class from
the submenu items to control whether they're visible or hidden.  (The file at
`/exercises/css/styles.cs`s includes the "hover" class for this purpose.)

### Create a Slideshow

Open the file `/exercises/index.html` in your browser.  Use the file
`/exercises/js/slideshow.js`.  Your task is to take a plain semantic HTML page
and enhance it with JavaScript by adding a slideshow.

1.	Move the #slideshow element to the top of the body.

2.	Write code to cycle through the list items inside the element; fade one in,
    display it for a few seconds, then fade it out and fade in the next one.

3.	When you get to the end of the list, start again at the beginning.

For an extra challenge, create a navigation area under the slideshow that shows
how many images there are and which image you're currently viewing.  (Hint:
`$.fn.prevAll` will come in handy for this.)
