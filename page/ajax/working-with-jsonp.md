<script>{
	"title": "Working with JSONP",
	"level": "beginner",
	"source": "http://jqfundamentals.com/legacy",
	"attribution": [ "jQuery Fundamentals" ]
}</script>

The advent of JSONP — essentially a consensual cross-site scripting hack — has opened the door to powerful mashups of content. Many prominent sites provide JSONP services, allowing you access to their content via a predefined API. A particularly great source of JSONP-formatted data is the [Yahoo! Query Language](http://developer.yahoo.com/yql/console/), which we'll use in the following example to fetch news about cats.

```
// Using YQL and JSONP
$.ajax({
	url: "http://query.yahooapis.com/v1/public/yql",

	// The name of the callback parameter, as specified by the YQL service
	jsonp: "callback",

	// Tell jQuery we're expecting JSONP
	dataType: "jsonp",

	// Tell YQL what we want and that we want JSON
	data: {
		q: "select * from search.ec (1, 10) WHERE keyword='New York'",
		format: "json"
	},

	// Work with the response
	success: function( response ) {
		console.log( response ); // server response
	}
});
```

If you'd like to access community tables you have to add `env: "http://datatables.org/alltables.env"` to the data object otherwise you would get an error message with `No definition found for Table`.

jQuery handles all the complex aspects of JSONP behind-the-scenes — all we have to do is tell jQuery the name of the JSONP callback parameter specified by YQL ("callback" in this case), and otherwise the whole process looks and feels like a normal Ajax request.
