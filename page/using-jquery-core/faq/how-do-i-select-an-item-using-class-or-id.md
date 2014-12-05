<script>{
	"title": "How do I select an item using class or ID?"
}</script>

This code selects an element with an ID of "myDivId". Since IDs are unique, this expression always selects either zero or one elements depending upon whether or not an element with the specified ID exists.

```
$( "#myDivId" );
```

This code selects an element with a class of "myCssClass". Since any number of elements can have the same class, this expression will select any number of elements.

```
$( ".myCssClass" );
```

A jQuery object containing the selected element can be assigned to a JavaScript variable like normal:

```
var myDivElement = $( "#myDivId" );
```

Usually, elements in a jQuery object are acted on by other jQuery functions:

```
var myValue = $( "#myDivId" ).val(); // Get the value of a form input.

$( "#myDivId" ).val( "hello world" ); // Set the value of a form input.
```

### Related Articles

* [Selecting Elements](/using-jquery-core/selecting-elements/)
* [Working with Selections](/using-jquery-core/working-with-selections/)
