<script>{
	"title": "Detach Elements to Work with Them",
	"level": "intermediate",
	"source": "http://jqfundamentals.com/legacy",
	"attribution": [ "jQuery Fundamentals" ]
}</script>

The DOM is slow; you want to avoid manipulating it as much as possible. jQuery introduced `detach()` in version 1.4 to help address this issue, allowing you to remove an element from the DOM while you work with it.

```
var table = $( "#myTable" );
var parent = table.parent();

table.detach();

// ... add lots and lots of rows to table

parent.append( table );
```
