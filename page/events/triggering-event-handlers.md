---
title   : Olay işleyicileri tetikleme
level: orta
source: http://jqfundamentals.com/legacy
attribution:
  - jQuery Temelleri
---

jQuery kullanıcıyla bir etkileşim sağlamadan bir öğeye bağlı olay işleyicileri tetiklemek için bir yol sağlar.
`.trigger()` yöntemi.

## Hangi işleyiciler .trigger() olabilir?

JQuery olay işleme sistemi yerli tarayıcı olayları için üst bir tabakadır. Bir olay işleyicisi kullanılarak `.on( "click", function() {...} )` eklendiğinde, bu jQuery'e ait `.trigger( "click" )` ile tetiklenebilir çünkü orjinal olarak ilave edildiği zaman, jQuery işleyicisi bu referansı depolar.

Ayrıca, bu JavaScript içinde yer alan `onclick` elementini de tetikleyecektir. `.trigger()` fonksiyonu yerel tarayıcıyı taklit etmek için kullanılamaz, bir dosya giriş kutusunu veya bir tutturucu etiketi tıklamak gibi. Bunun nedeni, burada bu olaylara karşılık jQuery olay sistemini kullanacak bağlı bir olay işleyicisi yoktur.

```
<a href="http://learn.jquery.com">Learn jQuery</a>
```
```
// Bu işlem geçerli sayfanızı değiştirmeyecektir.
$( "a" ).trigger( "click" );
```

## How can I mimic a native browser event, if not `.trigger()`?

In order to trigger a native browser event, you have to use [document.createEventObject](http://msdn.microsoft.com/en-us/library/ie/ms536390%28v=vs.85%29.aspx) for < IE9 and  [document.createEvent](https://developer.mozilla.org/en/DOM/document.createEvent) for all other browsers.
Using these two APIs, you can programmatically create an event that behaves exactly as if someone has actually clicked on a file input box. The default action will happen, and the browse file dialog will display.

The jQuery UI Team created [jquery.simulate.js](https://github.com/eduardolundgren/jquery-simulate/blob/master/jquery.simulate.js) in order to simplify triggering a native browser event for use in their automated testing. Its usage is modeled after jQuery's trigger.

```
// Triggering a native browser event using the simulate plugin
$( "a" ).simulate( "click" );
```

This will not only trigger the jQuery event handlers, but also follow the link and change the current page.


## `.trigger()` vs `.triggerHandler()`

There are four differences between `.trigger()` and `.triggerHandler()`

1. `.triggerHandler()` only triggers the event on the first element of a jQuery object.
2. `.triggerHandler()` cannot be chained. It returns the value that is returned by the last handler, not a jQuery object.
3. `.triggerHandler()` will not cause the default behavior of the event (such as a form submission).
4. Events triggered by `.triggerHandler()`, will not bubble up the DOM hierarchy. Only the handlers on the single element will fire.

For more information see the [triggerHandler documentation](http://api.jquery.com/triggerHandler)

## Don't use `.trigger()` simply to execute specific functions

While this method has its uses, it should not be used simply to call a function that was bound as a click
handler. Instead, you should store the function you want to call in a
variable, and pass the variable name when you do your binding. Then, you can
call the function itself whenever you want, without the need for
`.trigger()`.

```
// Triggering an event handler the right way
var foo = function( event ) {
	if ( event ) {
		console.log( event );
	} else {
		console.log( "this didn't come from an event!" );
	}
};

$( "p" ).on( "click", foo );

foo(); // instead of $( "p" ).trigger( "click" )
```

A more complex architecture can built on top of trigger using the [publish-subscribe pattern](http://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) using [jQuery plugins](https://gist.github.com/661855).
With this technique, `.trigger()` can be used to notify other sections of code that an application specific event has happened.
