##Create a basic page template

Pop open your favorite text editor, paste in the page template below, save and open in a browser. You are now a mobile developer!  

Here's what's in the template. In the `head`, a meta `viewport` tag sets the screen width to the pixel width of the device and references to jQuery, jQuery Mobile and the mobile theme stylesheet from the CDN add all the styles and scripts. jQuery Mobile 1.2 (1.2.0) works with versions of jQuery core from 1.7.0 to 1.8.2.  

In the `body`, a div with a `data-role` of `page` is the wrapper used to delineate a page, and the header bar (`data-role="header"`) and content region (`data-role="content"`) are added inside to create a basic page (these are both optional). These `data-` attributes are HTML5 attributes used throughout jQuery Mobile to transform basic markup into an enhanced and styled widget.  

    <!DOCTYPE html> 
    <html> 
    <head> 
        <title>My Page</title> 
        <meta name="viewport" content="width=device-width, initial-scale=1"> 
        <link rel="stylesheet" href="http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.css" />
        <script src="http://code.jquery.com/jquery-1.8.2.min.js"></script>
        <script src="http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.js"></script>
    </head> 
    <body> 

        <div data-role="page">
        	<div data-role="header">
        		<h1>My Title</h1>
        	</div><!-- /header -->
        	
        	<div data-role="content">
        		<p>Hello world</p>
        	</div><!-- /content -->

        </div><!-- /page -->

    </body>
    </html>


##Add your content

Inside your content container, you can add any standard HTML elements - headings, lists, paragraphs, etc. You can write your own custom styles to create custom layouts by adding an additional stylesheet to the `head` after the jQuery Mobile stylesheet.  

##Make a listview

jQuery Mobile includes a diverse set of common listviews that are coded as lists with a `data-role="listview"` added. Here is a simple linked list that has a role of `listview`. We're going to make this look like an inset module by adding a `data-inset="true"` and add a dynamic search filter with the `data-filter="true"` attributes.  

    <ul data-role="listview" data-inset="true" data-filter="true">
    	<li><a href="#">Acura</a></li>
    	<li><a href="#">Audi</a></li>
    	<li><a href="#">BMW</a></li>
    	<li><a href="#">Cadillac</a></li>
    	<li><a href="#">Ferrari</a></li>
    </ul>

 
##Add a slider

The framework contains a full set of form elements that automatically are enhanced into touch-friendly styled widgets. Here's a slider made with the new HTML5 input type of range, no `data-role` needed. Be sure to wrap these in a `form` element and always properly associate a `label` to every form element.  

    <form>
       <label for="slider-0">Input slider:</label>
       <input type="range" name="slider" id="slider-0" value="25" min="0" max="100"  />
    </form>

Input slider:
##Make a button

There are a few ways to make buttons, but lets turn a link into a button so it's easy to click. Just start with a link and add a `data-role="button"` attribute to it. You can add an icon with the `data-icon` attribute and optionally set its position with the `data-iconpos` attribute.  

    <a href="#" data-role="button" data-icon="star">Star button</a>
 
##Play with theme swatches

jQuery Mobile has a robust theme framework that supports up to 26 sets of toolbar, content and button colors, called a "swatch". Just add a `data-theme="e"` attribute to any of the widgets on this page: page, header, list, input for the slider, or button to turn it yellow. Try different swatch letters in default theme from a-e to mix and match swatches.  

Cool party trick: add the theme swatch to the page and see how all the widgets inside the content will automatically inherit the theme (headers and footers don't inherit, they default to swatch "a").

    <a href="#" data-role="button" data-icon="star" data-theme="a">Button</a>

When you're ready to build a custom theme, use ThemeRoller to drag and drop, then download a custom theme.  

##Go forth and build stuff  

This is just scratching the surface of all the cool things you can build with jQuery Mobile with little effort. Be sure to explore linking pages, adding animated page transitions, and creating dialogs. Use the data-attribute reference to try out some of the other `data-` attributes you can play with.  

More of a developer? Great, forget everything we just covered (kidding). If you don't want to use the `data-` attribute configuration system, you can take full control of everything and call plugins directly because these are all just standard jQuery plugins built with the UI widget factory. Be sure to dig into global configuration, events, and methods. Then read up on scripting pages, generating dynamic pages, and building PhoneGap apps.  

