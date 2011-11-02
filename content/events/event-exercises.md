---
chapter : events
section : 6
title   : Excercises
attribution:  jQuery Fundamentals
---
###Create an Input Hint

Open the file `/exercises/index.html` in your browser. Use the file
`/exercises/js/inputHint.js` or work in Firebug.  Your task is to use the text
of the label for the search input to create "hint" text for the search input.
The steps are as follows:

1.	Set the value of the search input to the text of the label element

2.	Add a class of "hint" to the search input

3.	Remove the label element

4.	Bind a focus event to the search input that removes the hint text and the
    "hint" class

5.	Bind a blur event to the search input that restores the hint text and
    "hint" class if no search text was entered

What other considerations might there be if you were creating this
functionality for a real site?

### Add Tabbed Navigation

Open the file `/exercises/index.html` in your browser. Use the file
`/exercises/js/tabs.js`.  Your task is to create tabbed navigation for the two
div.module elements.  To accomplish this:

1.	Hide all of the modules.

2.	Create an unordered list element before the first module.

3.	Iterate over the modules using `$.fn.each`. For each module, use the text
    of the h2 element as the text for a list item that you add to the unordered
    list element.

4.	Bind a click event to the list item that:

	*	Shows the related module, and hides any other modules

	*	Adds a class of "current" to the clicked list item

	*	Removes the class "current" from the other list item

5.	Finally, show the first tab.

