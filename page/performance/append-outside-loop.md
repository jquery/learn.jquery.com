<script>{
	"title": "Append Outside of Loops",
	"level": "intermediate",
	"source": "http://jqfundamentals.com/legacy",
	"attribution": [ "jQuery Fundamentals" ]
}</script>

Touching the DOM comes at a cost. If you're appending a lot of elements to the DOM, you will want to append them all at once, rather than one at a time. This is a common problem when appending elements within a loop.

```
$.each( myArray, function( i, item ) {

	var newListItem = "<li>" + item + "</li>";

	$( "#ballers" ).append( newListItem );

});
```

One common technique is to leverage a document fragment. During each iteration of the loop, you append the element to the fragment rather than the DOM element. After the loop, just append the fragment to the DOM element.

```
var frag = document.createDocumentFragment();

$.each( myArray, function( i, item ) {

	var newListItem = document.createElement( "li" );
	var itemText = document.createTextNode( item );

	newListItem.appendChild( itemText );

	frag.appendChild( newListItem );

});

$( "#ballers" )[ 0 ].appendChild( frag );
```

Another simple technique is to build up a string during each iteration of the loop. After the loop, just set the HTML of the DOM element to that string.

```
var myHtml = "";

$.each( myArray, function( i, item ) {

	myHtml += "<li>" + item + "</li>";

});

$( "#ballers" ).html( myHtml );
```

There are of course other techniques you could certainly test out. A great way to test the performance of these is through a site called [jsperf](http://jsperf.com). This site allows you to benchmark each technique and visually see how it performs across all the browsers.
