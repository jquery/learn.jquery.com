---
title:        How do I disable/enable a form element?
source:       http://docs.jquery.com/Frequently_Asked_Questions
---

There are two ways to disable/enable form elements.

Set the 'disabled' attribute to true or false:

``` js
 // Disable #x
 $('#x').attr('disabled', true);
 // Enable #x
 $('#x').attr('disabled', false);
```

Add or remove the 'disabled' attribute:

``` js
 // Disable #x
 $("#x").attr('disabled', 'disabled');
 // Enable #x
 $("#x").removeAttr('disabled');
```