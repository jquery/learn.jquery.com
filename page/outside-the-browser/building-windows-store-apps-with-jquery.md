---
title: Building Windows Store Applications with jQuery 2.0
level: intermediate
---

With the release of Windows 8, Microsoft introduced Windows Store applications which can be authored with traditional web languages leveraging the power of Internet Explorer 10's underlying engines. This means jQuery 2.0 can be used to build Windows Store applications in Windows 8.

## Understanding Context

Windows Store applications, unlike the web, have two different contexts known as local, and web. Due to the access that code in the local context has to the Windows Runtime APIs, a new security model was needed. Additionally, some of the APIs that are common to the web were modified to fit their new native environment in a more meaningful way.

For best results, you will be downloading jQuery and loading it in the local context. Attempting to load from a remote location (such as a CDN) will result in a message along the lines of "An app can’t load remote web content in the local context."

For additional information on context, see the resource [Features and restrictions by context](http://msdn.microsoft.com/en-us/library/windows/apps/hh465373.aspx) on MSDN. We'll discuss some of these items throughout this article.

### Understanding "Unsafe" Code

Keeping the whole issue of context in mind, DOM manipulation is one of the biggest changes you'll encounter using jQuery in a Windows Store application as opposed to a browser.

On the web, it's not uncommon to add an element to a form just by passing a string of HTML into jQuery's `.append()` method:

```javascript
$("#form").append("<input name='foo' value='bar' onClick='calc()' />");
```

Within a Windows Store application, which has easy access to the user's machine, the stakes are much higher, and a lot of what you may be used to doing will require some reconsideration. The above is considered unsafe because of the `name` attribute, and the `onClick` attribute. There are many other elements, attributes, protocols and more that are considered unsafe. For an exhaustive list of what is considered safe and unsafe, see [Making HTML safer: details for toStaticHTML](http://msdn.microsoft.com/en-us/library/windows/apps/hh465388.aspx).

This doesn't mean that you cannot programmatically populate a container with dynamic items, you just have to take a slightly different approach. For instance, you could use jQuery to create our input element itself rather than passing it along in a string:

```javascript
$("<input>", { name: "foo", value: "bar", click: calc }).appendTo("#form");
```

In the above example, you create an input element using jQuery's [html, attributes signature](http://api.jquery.com/jQuery/#jQuery-html-attributes). This demonstrates to the security model that you are in full control of our element, it's attributes, and their corresponding values. This pattern works equally well in the browser also, being present in jQuery since version 1.4.

### Sanitizing Potentially Unsafe Content

When receiving content from a remote endpoint, it is wise to clean it up before dropping it into your DOM. There are a few ways in which you can do this using helper functions such as `toStaticHTML`, which removes all dynamic items from a string.

Suppose you wished to request a string of markup from a remote service that included a greeting to our current user. It's entirely possible that this service could have been tampered with, and what actually comes back to our application is more than you are expecting.

In the following code, you see that a hidden form field has attached itself to the response.

```html
<h1>Hello, Dave.</h1><input name='id' value='a528af' type='hidden' />
```

Injecting this into a form could be disastrous. As such, you should first pass it through `toStaticHTML` to clean it of any elements, attributes, or values that could be used to manipulate form data, or perform otherwise non-approved actions.

```javascript
$("#greeting").html(toStaticHTML(response));
```

When the method sees our markup for the input element it will identify and remove the dynamic `name` attribute, preventing any unexpected data from entering a form submission. For a more granular look into what does, and does not survive the `toStaticHTML` method, take a look at [Making HTML safer: details for toStaticHTML](http://msdn.microsoft.com/en-us/library/windows/apps/hh465388.aspx).

### When You Know Best

There will inevitably be times when you need to do something that appears to be unsafe. For instance, you may wish to use a chunk of HTML as a template to build new elements. In these instances, Microsoft has provided a few methods you can use when necessary, and when you are positively sure what you are doing is not putting the user at risk.

On the global `MSApp` object in your Windows Store application, there exists the `execUnsafeLocalFunction` function, and it does exactly what it suggests - it permits you to execute an unsafe function on a case-by-case basis. Perhaps you wish to add an input field for editing a user's name, our code may look very similar to the last example:

```html
<h1>Hello, <input name="id" value="Dave" /><h1>
```

We could assign this to the `innerHTML` property via an anonymous function:

```javascript
MSApp.execUnsafeLocalFunction(function () {
    $("#greeting").html(response);
});
```

Within the scope of the function you are able to step out of the security model and perform an otherwise unsafe operation without being second-guessed by the environment. It should be fairly obvious why you should use this method sparingly.

A couple utility methods also exist in your Windows Store application under `WinJS.Utilities` for doing similar assignments. Those are `setInnerHTMLUnsafe` and `setOuterHTMLUnsafe`. Like `execUnsafeLocalFunction`, these too should be used sparingly, and when you're not taking a chance with data outside of your control. 

These utility functions take as their arguments the DOM element you'd like to manipulate, and the string you'd like to assign.

```javascript
WinJS.Utilities.setInnerHTMLUnsafe( $("#greeting").get(0), response );
WinJS.Utilities.setOuterHTMLUnsafe( $("#greeting").get(0), response );
```

The difference here is that `setInner` replaces the `innerHTML` of the element, whereas `setOuter` replaces the element itself - think of jQuery's `replaceWith` method. For both functions, you simply pass in a reference to the DOM element and our desired innerHTML.

### A Note on Compatibility

In the last section you introduced two objects, the `MSApp` object which houses the `execUnsafeLocalFunction` function, as well as the `WinJS` object which houses the two utility functions `setInnerHTMLUnsafe`, and `setOuterHTMLUnsafe`.

These objects are present only in the Windows Store application, and not in your browser (unless somebody, or something, created similarly-named objects). If you wish to write code that can work in both a Windows Store environment, as well as in your browser, you will need to check these objects before presuming their existence.

```javascript
var $greeting = $("#greeting");

if ( typeof WinJS !== "undefined" && WinJS.Utilities ) {
    WinJS.Utilities.setInnerHTMLUnsafe( $greeting.get(0), response );
} else {
    $greeting.html( response );
}
```

In a Windows Store application the above code will use the `WinJS.Utilities` method to perform the assignment. When ran in an environment where `WinJS` is not known, such as in a web browser, the code will perform the assignment via jQuery's `.html` method.

### No More Same-Origin Issues

The power to utilize remote services is part of what makes the web great. In a traditional browser you have origin issues which gave rise to solutions like JSON, and ultimately CORS. Because Windows Store applications run on the operating system, origin is irrelevant.

```javascript
$.ajax("http://api.twitter.com/1/statuses/user_timeline.json", {
    data: { screen_name: "appendTo" },
    success: function (data) {
        $("<img>", { src: data[0].user.profile_image_url }).appendTo("body");
        $.each(data, function (key, tweet) {
            $("<p>").text(tweet.text).appendTo("body");
        });
    }
});
```

The above grabs all of the latest tweets from the [@appendTo](http://twitter.com/appendTo) account and wraps each in it's own paragraph tag, placing the profile image above them. In a Windows Store application this is possible without having to use a `script` tag, setting headers, or proxying through a server-side script.

### In Conclusion

While this article isn't exhaustive, it does provide the initial momentum you need in order to get up and running quickly with jQuery in Windows Store applications.