<script>{
	"title": "Introducing Events",
	"level": "beginner",
	"source": "http://jqfundamentals.com/legacy",
	"attribution": [ "jQuery Fundamentals" ]
}</script>

## Introduction

Web pages are all about interaction. Users perform a countless number of actions such as moving their mice over the page, clicking on elements, and typing in textboxes — all of these are examples of events. In addition to these user events, there are a slew of others that occur, like when the page is loaded, when video begins playing or is paused, etc. Whenever something interesting occurs on the page, an event is fired, meaning that the browser basically announces that something has happened. It's this announcement that allows developers to "listen" for events and react to them appropriately.


## What's a DOM event?

As mentioned, there are a myriad of event types, but perhaps the ones that are easiest to understand are user events, like when someone clicks on an element or types into a form. These types of events occur on an element, meaning that when a user clicks on a button for example, the button has had an event occur on it. While user interactions aren't the only types of DOM events, they're certainly the easiest to understand when starting out. Mozilla Developer Network has a good reference of [available DOM events](https://developer.mozilla.org/en/DOM/DOM_event_reference).


## Ways to listen for events

There are many ways to listen for events. Actions are constantly occurring on a webpage, but the developer is only notified about them if they're *listening* for them. Listening for an event basically means you're waiting for the browser to tell you that a specific event has occurred and then you'll specify how the page should react.

To specify to the browser what to do when an event occurs, you provide a function, also known as an *event handler*. This function is executed whenever the event occurs (or until the event is unbound).

For instance, to alert a message whenever a user clicks on a button, you might write something like this:

```
<button onclick="alert('Hello')">Say hello</button>
```

The event we want to listen to is specified by the button's `onclick` attribute, and the event handler is the `alert` function which alerts "Hello" to the user. While this works, it's an abysmal way to achieve this functionality for a couple of reasons:

1. First, we're coupling our view code (HTML) with our interaction code (JS). That means that whenever we need to update functionality, we'd have to edit our HTML which is just a bad practice and a maintenance nightmare.
2. Second, it's not scalable. If you had to attach this functionality onto numerous buttons, you'd not only bloat the page with a bunch of repetitious code, but you would again destroy maintainability.

Utilizing inline event handlers like this can be considered *obtrusive JavaScript,* but its opposite, *unobtrusive JavaScript* is a much more common way of discussing the topic. The notion of *unobtrusive JavaScript* is that your HTML and JS are kept separate and are therefore more maintainable. Separation of concerns is important because it keeps like pieces of code together (i.e. HTML, JS, CSS) and unlike pieces of code apart, facilitating changes, enhancements, etc. Furthermore, unobtrusive JavaScript stresses the importance of adding the least amount of cruft to a page as possible. If a user's browser doesn't support JavaScript, then it shouldn't be intertwined into the markup of the page. Also, to prevent naming collisions, JS code should utilize a single namespace for different pieces of functionality or libraries. jQuery is a good example of this, in that the `jQuery` object/constructor (and also the `$` alias to `jQuery`) only utilizes a single global variable, and all of jQuery's functionality is packaged into that one object.

To accomplish the desired task unobtrusively, let's change our HTML a little bit by removing the `onclick` attribute and replacing it with an `id`, which we'll utilize to "hook onto" the button from within a script file.

```
<button id="helloBtn">Say hello</button>
```

If we wanted to be informed when a user clicks on that button unobtrusively, we might do something like the following in a separate script file:

```
// Event binding using addEventListener
var helloBtn = document.getElementById( "helloBtn" );

helloBtn.addEventListener( "click", function( event ) {
	alert( "Hello." );
}, false );
```

Here we're saving a reference to the button element by calling `getElementById` and assigning its return value to a variable. We then call `addEventListener` and provide an event handler function that will be called whenever that event occurs. While there's nothing wrong with this code as it will work fine in modern browsers, it won't fare well in versions of IE prior to IE9. This is because Microsoft chose to implement a different method, `attachEvent`, as opposed to the W3C standard `addEventListener`, and didn't get around to changing it until IE9 was released. For this reason, it's beneficial to utilize jQuery because it abstracts away browser inconsistencies, allowing developers to use a single API for these types of tasks, as seen below.

```
// Event binding using a convenience method
$( "#helloBtn" ).click(function( event ) {
	alert( "Hello." );
});
```

The `$( "#helloBtn" )` code selects the button element using the `$` (a.k.a. `jQuery`) function and returns a jQuery object. The jQuery object has a bunch of methods (functions) available to it, one of them named `click`, which resides in the jQuery object's prototype. We call the `click` method on the jQuery object and pass along an anonymous function event handler that's going to be executed when a user clicks the button, alerting "Hello." to the user.

There are a number of ways that events can be listened for using jQuery:

```
// The many ways to bind events with jQuery
// Attach an event handler directly to the button using jQuery's
// shorthand `click` method.
$( "#helloBtn" ).click(function( event ) {
	alert( "Hello." );
});

// Attach an event handler directly to the button using jQuery's
// `bind` method, passing it an event string of `click`
$( "#helloBtn" ).bind( "click", function( event ) {
	alert( "Hello." );
});

// As of jQuery 1.7, attach an event handler directly to the button
// using jQuery's `on` method.
$( "#helloBtn" ).on( "click", function( event ) {
	alert( "Hello." );
});

// As of jQuery 1.7, attach an event handler to the `body` element that
// is listening for clicks, and will respond whenever *any* button is
// clicked on the page.
$( "body" ).on({
	click: function( event ) {
		alert( "Hello." );
	}
}, "button" );

// An alternative to the previous example, using slightly different syntax.
$( "body" ).on( "click", "button", function( event ) {
	alert( "Hello." );
});
```

As of jQuery 1.7, all events are bound via the `on` method, whether you call it directly or whether you use an alias/shortcut method such as `bind` or `click`, which are mapped to the `on` method internally. With this in mind, it's beneficial to use the `on` method because the others are all just syntactic sugar, and utilizing the `on` method is going to result in faster and more consistent code.

Let's look at the `on` examples from above and discuss their differences. In the first example, a string of `click` is passed as the first argument to the `on` method, and an anonymous function is passed as the second. This looks a lot like the `bind` method before it. Here, we're attaching an event handler directly to `#helloBtn`. If there were any other buttons on the page, they wouldn't alert "Hello" when clicked because the event is only attached to `#helloBtn`.

In the second `on` example, we're passing an object (denoted by the curly braces `{}`), which has a property of `click` whose value is an anonymous function. The second argument to the `on` method is a jQuery selector string of `button`. While examples 1–3 are functionally equivalent, example 4 is different in that the `body` element is listening for click events that occur on *any* button element, not just `#helloBtn`. The final example above is exactly the same as the one preceding it, but instead of passing an object, we pass an event string, a selector string, and the callback. Both of these are examples of event delegation, a process by which an element higher in the DOM tree listens for events occurring on its children.

## Event delegation

Event delegation works because of the notion of *event bubbling*. For most events, whenever something occurs on a page (like an element is clicked), the event travels from the element it occurred on, up to its parent, then up to the parent's parent, and so on, until it reaches the root element, a.k.a. the `window`. So in our table example, whenever a `td` is clicked, its parent `tr` would also be notified of the click, the parent `table` would be notified, the `body` would be notified, and ultimately the `window` would be notified as well. While event bubbling and delegation work well, the delegating element (in our example, the `table`) should always be as close to the delegatees as possible so the event doesn't have to travel way up the DOM tree before its handler function is called.

The two main pros of event delegation over binding directly to an element (or set of elements) are performance and the aforementioned event bubbling. Imagine having a large table of 1,000 cells and binding to an event for each cell. That's 1,000 separate event handlers that the browser has to attach, even if they're all mapped to the same function. Instead of binding to each individual cell though, we could instead use delegation to listen for events that occur on the parent table and react accordingly. One event would be bound instead of 1,000, resulting in way better performance and memory management.

The event bubbling that occurs affords us the ability to add cells via Ajax for example, without having to bind events directly to those cells since the parent table is listening for clicks and is therefore notified of clicks on its children. If we weren't using delegation, we'd have to constantly bind events for every cell that's added which is not only a performance issue, but could also become a maintenance nightmare.


## The event object

In all of the previous examples, we've been using anonymous functions and specifying an `event` argument within that function. Let's change it up a little bit.

```
// Binding a named function
function sayHello( event ) {
	alert( "Hello." );
}

$( "#helloBtn" ).on( "click", sayHello );
```

In this slightly different example, we're defining a function called `sayHello` and then passing that function into the `on` method instead of an anonymous function. So many online examples show anonymous functions used as event handlers, but it's important to realize that you can also pass defined functions as event handlers as well. This is important if different elements or different events should perform the same functionality. This helps to keep your code [DRY](http://en.wikipedia.org/wiki/Don%27t_repeat_yourself).

But what about that `event` argument in the `sayHello` function — what is it and why does it matter? In all DOM event callbacks, jQuery passes an *event object* argument which contains information about the event, such as precisely when and where it occurred, what type of event it was, which element the event occurred on, and a plethora of other information. Of course you don't have to call it `event`; you could call it `e` or whatever you want to, but `event` is a pretty common convention.

If the element has default functionality for a specific event (like a link opens a new page, a button in a form submits the form, etc.), that default functionality can be cancelled. This is often useful for Ajax requests. When a user clicks on a button to submit a form via Ajax, we'd want to cancel the button/form's default action (to submit it to the form's `action` attribute), and we would instead do an Ajax request to accomplish the same task for a more seamless experience. To do this, we would utilize the event object and call its `.preventDefault()` method. We can also prevent the event from bubbling up the DOM tree using `.stopPropagation()` so that parent elements aren't notified of its occurrence (in the case that event delegation is being used).

```
// Preventing a default action from occurring and stopping the event bubbling
$( "form" ).on( "submit", function( event ) {

	// Prevent the form's default submission.
	event.preventDefault();

	// Prevent event from bubbling up DOM tree, prohibiting delegation
	event.stopPropagation();

	// Make an AJAX request to submit the form data
});
```

When utilizing both `.preventDefault()` and `.stopPropagation()` simultaneously, you can instead `return false` to achieve both in a more concise manner, but it's advisable to only `return false` when both are actually necessary and not just for the sake of terseness. A final note on `.stopPropagation()` is that when using it in delegated events, the soonest that event bubbling can be stopped is when the event reaches the element that is delegating it.

It's also important to note that the event object contains a property called `originalEvent`, which is the event object that the browser itself created. jQuery wraps this native event object with some useful methods and properties, but in some instances, you'll need to access the original event via `event.originalEvent` for instance. This is especially  useful for touch events on mobile devices and tablets.

Finally, to inspect the event itself and see all of the data it contains, you should log the event in the browser's console using `console.log`. This will allow you to see all of an event's properties (including the `originalEvent`) which can be really helpful for debugging.

```
// Logging an event's information
$( "form" ).on( "submit", function( event ) {

	// Prevent the form's default submission.
	event.preventDefault();

	// Log the event object for inspectin'
	console.log( event );

	// Make an AJAX request to submit the form data
});
```
