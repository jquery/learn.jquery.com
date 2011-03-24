---
chapter :     performance
section:      0
title:        Use Event Delegation
attribution:  jQuery Fundamentals
tags:         performance
---

Event delegation allows you to bind an event handler to one container element
(for example, an unordered list) instead of multiple contained elements (for
example, list items). jQuery makes this easy with `$.fn.live` and `$.fn.delegate`.
Where possible, you should use `$.fn.delegate` instead of `$.fn.live`, as it
eliminates the need for an unnecessary selection, and its explicit context (vs.
`$.fn.live`'s context of document) reduces overhead by approximately 80%.

In addition to performance benefits, event delegation also allows you to add
new contained elements to your page without having to re-bind the event
handlers for them as they're added.

    // bad (if there are lots of list items)
    $('li.trigger').click(handlerFn);

    // better: event delegation with $.fn.live
    $('li.trigger').live('click', handlerFn);

    // best: event delegation with $.fn.delegate
    // allows you to specify a context easily
    $('#myList').delegate('li.trigger', 'click', handlerFn);
