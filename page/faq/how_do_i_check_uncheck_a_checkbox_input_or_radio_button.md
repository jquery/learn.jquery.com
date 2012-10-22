---
title:        How do I check/uncheck a checkbox input or radio button?
source:       http://docs.jquery.com/Frequently_Asked_Questions
---

There are two ways to check/uncheck a checkbox/radio button.

Set the 'checked' attribute to true or false.

```
// Check #x
$("#x").attr( "checked", true );

// Uncheck #x
$("#x").attr( "checked", false );
```

Add or remove the 'checked' attribute:

```
// Check #x
$("#x").attr( "checked", "checked" );

// Uncheck #x
$("#x").removeAttr("checked");
```