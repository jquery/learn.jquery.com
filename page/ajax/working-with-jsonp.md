<script>{
	"title": "Working with JSONP",
	"level": "beginner",
	"source": "http://jqfundamentals.com/legacy",
	"attribution": [ "jQuery Fundamentals" ]
}</script>

The advent of JSONP — essentially a consensual cross-site scripting hack — has opened the door to powerful mashups of content. Many prominent sites provide JSONP services, allowing you access to their content via a predefined API. A particularly great source of JSONP-formatted data is the [Wikipedia API](https://en.wikipedia.org/w/api.php?action=help&modules=query), which we'll use in the following example to fetch a list of articles about [JavaScript libraries](https://en.wikipedia.org/wiki/Category:Free_software_programmed_in_JavaScript).

```
$.ajax( {
	// Tell MediaWiki what we want and that we want JSON
	url: "https://en.wikipedia.org/w/api.php",
	data: {
		format: "json",
		action: "query",
		list: "categorymembers",
		cmtitle: "Category:Free_software_programmed_in_JavaScript",
		cmprop: "title",
		cmlimit: 500
	},

	// Name of the query parameter that jQuery will add to set the callback function
	jsonp: "callback",

	// Tell jQuery we're expecting JSONP
	dataType: "jsonp",

} ).then( function( response ) {
	console.log( response.query.categorymembers );
} );
```

jQuery handles all the complex aspects of JSONP behind-the-scenes. All we have to do is set `dataType` to `"jsonp"` and tell jQuery the name of the JSONP parameter ("callback" in this case). Beyond that one option, the whole process looks and feels like a normal Ajax request for fetching JSON.
