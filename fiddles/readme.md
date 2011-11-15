## introduction

This package exposes both a cli tool and an npm package to parse the
content of this website, and generates jsfiddle-ready gists.

## synopsis

    rake fiddle
    # or
    nanoc compile && cd fiddles/ && ./bin/fiddles

## install

    cd fiddles/
    npm install

Or, to link the package as a `fiddles` executable:

    cd fiddles/
    npm link

`fiddles` would then be available in your `$PATH`.

## configuration
 
These are the options available to further configure the build script.
Ideally, each of these would be overridable by cli usage.

* source: source folder (where the markdown files are), defaults to
  `./content`.
* pages: regex matching the pages the build will handle, defaults to
  `/exercises.md$/`.  The pages regex is used to filter the markdown
files to process.
* use: regex matching the patterns used in pages to specifiy the
  exercises html file, defaults to /Use the file `(.+)`/.
* open: regex matching the patterns used in pages to specify the
  exercises js file, defaults to /Open the file `(.+)`/.
* output: location of the gist/jsfiddle generated folder, defaults to
  `content/fiddles`. This folder should be .gitignored since it'll be
full of git repository.
* host: default to `http://learn.jquery.com`. url of the live site, used
  during generation process to replace relative img references to
absolute ones.
* assets: defaults to `/images/` related to host option above. Image
  assets assume host/assets is where they'll be hosted so gists
generated try loading them from there.

## workflow

These are the different tasks the build script handles in the order they happen:

* parse: parse the content of markdown files ending with `exercises.md`
  (options.pages) and search for any `Use the file`/`Open the file`
patterns.  The parsing process builds a hash object of useful meta
infos, like the exercises title, the content of exercises page and their
path.

* generate: from these meta information, generates according
  jsfiddles-ready gists, at the likely location of configuration
`output` options. From there, two options:
  * The gist is a new one, first time generation. The script should
    handle the creation of the gist (using
[ngist](https://github.com/chapel/ngist) probably).
  * The gist folder already exists and is a valid git repo. The script
    should be able to handle the edition of the gist (git add/commit)
and push the new content.
  * This step is probably the trickier one, have to be done right (and
    we'll probably have to handle a "gist dictionary", where gists once
created edit a configuration file, maybe just package.json). The idea
here is that with a new fres repo clone, one would be able to clone the
previously created gists, and don't generate/push new ones but rather
re-use intelligently the gist previously created.

* replace: once generation done, the script should edit and replace
  content in original markdown files (or on the generated html files?).
If the gists repo have been created, the script could probably get
sensitive information about the gist repository (remote url). From that,
the script should compute the corresponding jsFiddle URL, add the link
at proper place in exercises pages, and append the embedding gist
script.


## output

```console
jquery/web-learn-jquery-com (master)  » ./fiddles/bin/fiddles

   info  - About to generate or update code/fiddles folders. Configuration: 
   info  -{ code: '/Users/mk/Temp/dev/jquery/web-learn-jquery-com/code',
   info  -  fiddles: '/Users/mk/Temp/dev/jquery/web-learn-jquery-com/code/fiddles',
   info  -  content: '/Users/mk/Temp/dev/jquery/web-learn-jquery-com/content',
   info  -  output: '/Users/mk/Temp/dev/jquery/web-learn-jquery-com/output',
   info  -  manifest: '\n---\nname: {name}Request.HTML - jsFiddle/Github integration demo\ndescription: {description}\nauthors:\n  - Rebecca Murphey\n...\n\n\n{details}\n\n',
   info  -  fiddle: 'http://jsfiddle.net/gh/gist/{framework}/{version}/{gistid}',
   info  -  host: 'http://learning.jquery.com',
   info  -  assets: '/assets/i/',
   info  -  solution: true,
   info  -  gists: true }

   debug - Generation using solution mode, demo.js files will include solutions to exercises.

   info  - Creating fiddle from file:  
   info  -{ file: '/Users/mk/Temp/dev/jquery/web-learn-jquery-com/content/effects/effects-exercises.md',
   info  -  title: 'Reveal Hidden Text',
   info  -  gistTitle: 'reveal-hidden-text',
   info  -  details: '\n\nOpen the file `/exercises/index.html` in your browser.  Use the file\n`/exercises/js/blog.js`.  Your task is to add some interactivity to the blog\nsection of the page.  The spec for the feature is as follows:\n\n*\tClicking on a headline in the #blog div should slide down the excerpt\n  paragraph\n\n*\tClicking on another headline should slide down its excerpt paragraph, and\n  slide up any other currently showing excerpt paragraphs.\n\nHint: don\'t forget about the `:visible` selector!\n\n',
   info  -  html: '/exercises/index.html',
   info  -  js: '/exercises/js/blog.js' }

   info  - Creating fiddle from file:  
   info  -{ file: '/Users/mk/Temp/dev/jquery/web-learn-jquery-com/content/effects/effects-exercises.md',
   info  -  title: 'Create Dropdown Menus',
   info  -  gistTitle: 'create-dropdown-menus',
   info  -  details: '\n\nOpen the file `/exercises/index.html` in your browser.  Use the file\n`/exercises/js/navigation.js`.  Your task is to add dropdowns to the main\nnavigation at the top of the page.\n\n*\tHovering over an item in the main menu should show that item\'s submenu items,\n  if any.\n\n*\tExiting an item should hide any submenu items.\n\nTo accomplish this, use the `$.fn.hover` method to add and remove a class from\nthe submenu items to control whether they\'re visible or hidden.  (The file at\n`/exercises/css/styles.cs`s includes the "hover" class for this purpose.)\n\n',
   info  -  html: '/exercises/index.html',
   info  -  js: '/exercises/js/navigation.js' }

   info  - Creating fiddle from file:  
   info  -{ file: '/Users/mk/Temp/dev/jquery/web-learn-jquery-com/content/effects/effects-exercises.md',
   info  -  title: 'Create a Slideshow',
   info  -  gistTitle: 'create-a-slideshow',
   info  -  details: '\n\nOpen the file `/exercises/index.html` in your browser.  Use the file\n`/exercises/js/slideshow.js`.  Your task is to take a plain semantic HTML page\nand enhance it with JavaScript by adding a slideshow.\n\n1.\tMove the #slideshow element to the top of the body.\n\n2.\tWrite code to cycle through the list items inside the element; fade one in,\n    display it for a few seconds, then fade it out and fade in the next one.\n\n3.\tWhen you get to the end of the list, start again at the beginning.\n\nFor an extra challenge, create a navigation area under the slideshow that shows\nhow many images there are and which image you\'re currently viewing.  (Hint:\n`$.fn.prevAll` will come in handy for this.)\n',
   info  -  html: '/exercises/index.html',
   info  -  js: '/exercises/js/slideshow.js' }

   info  - Creating fiddle from file:  
   info  -{ file: '/Users/mk/Temp/dev/jquery/web-learn-jquery-com/content/events/event-exercises.md',
   info  -  title: 'Create an Input Hint',
   info  -  gistTitle: 'create-an-input-hint',
   info  -  details: '\n\nOpen the file `/exercises/index.html` in your browser. Use the file\n`/exercises/js/inputHint.js` or work in Firebug.  Your task is to use the text\nof the label for the search input to create "hint" text for the search input.\nThe steps are as follows:\n\n1.\tSet the value of the search input to the text of the label element\n\n2.\tAdd a class of "hint" to the search input\n\n3.\tRemove the label element\n\n4.\tBind a focus event to the search input that removes the hint text and the\n    "hint" class\n\n5.\tBind a blur event to the search input that restores the hint text and\n    "hint" class if no search text was entered\n\nWhat other considerations might there be if you were creating this\nfunctionality for a real site?\n\n',
   info  -  html: '/exercises/index.html',
   info  -  js: '/exercises/js/inputHint.js' }

   info  - Creating fiddle from file:  
   info  -{ file: '/Users/mk/Temp/dev/jquery/web-learn-jquery-com/content/events/event-exercises.md',
   info  -  title: 'Add Tabbed Navigation',
   info  -  gistTitle: 'add-tabbed-navigation',
   info  -  details: '\n\nOpen the file `/exercises/index.html` in your browser. Use the file\n`/exercises/js/tabs.js`.  Your task is to create tabbed navigation for the two\ndiv.module elements.  To accomplish this:\n\n1.\tHide all of the modules.\n\n2.\tCreate an unordered list element before the first module.\n\n3.\tIterate over the modules using `$.fn.each`. For each module, use the text\n    of the h2 element as the text for a list item that you add to the unordered\n    list element.\n\n4.\tBind a click event to the list item that:\n\n\t*\tShows the related module, and hides any other modules\n\n\t*\tAdds a class of "current" to the clicked list item\n\n\t*\tRemoves the class "current" from the other list item\n\n5.\tFinally, show the first tab.\n\n',
   info  -  html: '/exercises/index.html',
   info  -  js: '/exercises/js/tabs.js' }

   info  - Creating fiddle from file:  
   info  -{ file: '/Users/mk/Temp/dev/jquery/web-learn-jquery-com/content/jquery-basics/exercises.md',
   info  -  title: 'Selecting',
   info  -  gistTitle: 'selecting',
   info  -  details: '\n\nOpen the file `/exercises/index.html` in your browser. \nUse the file `/exercises/js/sandbox.js` or work in Firebug to accomplish the following:\n\n1.\tSelect all of the div elements that have a class of "module".\n\n2.\tCome up with three selectors that you could use to get the third item in the #myList unordered list. Which is the best to use? Why?\n\n3.\tSelect the label for the search input using an attribute selector.\n\n4.\tFigure out how many elements on the page are hidden (hint: .length).\n\n5.\tFigure out how many image elements on the page have an alt attribute.\n\n6.\tSelect all of the odd table rows in the table body.\n\n',
   info  -  html: '/exercises/index.html',
   info  -  js: '/exercises/js/sandbox.js' }

   info  - Creating fiddle from file:  
   info  -{ file: '/Users/mk/Temp/dev/jquery/web-learn-jquery-com/content/jquery-basics/exercises.md',
   info  -  title: 'Traversing',
   info  -  gistTitle: 'traversing',
   info  -  details: '\n\nOpen the file `/exercises/index.html` in your browser. Use the file `/exercises/js/sandbox.js` or work in Firebug to accomplish the following:\n\n1.\tSelect all of the image elements on the page; log each image\'s alt attribute.\n\n2.\tSelect the search input text box, then traverse up to the form and add a class to the form.\n\n3.\tSelect the list item inside `#myList` that has a class of "current" and remove that class from it; add a class of "current" to the next list item.\n\n4.\tSelect the select element inside `#specials`; traverse your way to the submit button.\n\n5.\tSelect the first list item in the #slideshow element; add the class "current" to it, and then add a class of "disabled" to its sibling elements.\n\n',
   info  -  html: '/exercises/index.html',
   info  -  js: '/exercises/js/sandbox.js' }

   info  - Creating fiddle from file:  
   info  -{ file: '/Users/mk/Temp/dev/jquery/web-learn-jquery-com/content/jquery-basics/exercises.md',
   info  -  title: 'Manipulating',
   info  -  gistTitle: 'manipulating',
   info  -  details: '\n\nOpen the file `/exercises/index.html` in your browser. Use the file `/exercises/js/sandbox.js` or work in Firebug to accomplish the following:\n\n1.\tAdd five new list items to the end of the unordered list `#myList`. Hint:\n\n    for (var i = 0; i&lt;5; i++) { ... }\n\n2.\tRemove the odd list items\n\n3. \tAdd another h2 and another paragraph to the last div.module\n\n4.\tAdd another option to the select element; give the option the value "Wednesday"\n\n5.\tAdd a new div.module to the page after the last one; put a copy of one of the existing images inside of it.',
   info  -  html: '/exercises/index.html',
   info  -  js: '/exercises/js/sandbox.js' }

   debug - Files generated at /Users/mk/Temp/dev/jquery/web-learn-jquery-com/code/fiddles/reveal-hidden-text
   debug - Now creating gist for /Users/mk/Temp/dev/jquery/web-learn-jquery-com/code/fiddles/reveal-hidden-text
   log   - fiddle.css
   log   - fiddle.details
   log   - fiddle.html
   log   - fiddle.js
   debug - Files generated at /Users/mk/Temp/dev/jquery/web-learn-jquery-com/code/fiddles/create-dropdown-menus
   debug - Now creating gist for /Users/mk/Temp/dev/jquery/web-learn-jquery-com/code/fiddles/create-dropdown-menus
   log   - fiddle.css
   log   - fiddle.details
   log   - fiddle.html
   log   - fiddle.js
   debug - Files generated at /Users/mk/Temp/dev/jquery/web-learn-jquery-com/code/fiddles/create-a-slideshow
   debug - Now creating gist for /Users/mk/Temp/dev/jquery/web-learn-jquery-com/code/fiddles/create-a-slideshow
   log   - fiddle.css
   log   - fiddle.details
   log   - fiddle.html
   log   - fiddle.js
   debug - Files generated at /Users/mk/Temp/dev/jquery/web-learn-jquery-com/code/fiddles/create-an-input-hint
   debug - Now creating gist for /Users/mk/Temp/dev/jquery/web-learn-jquery-com/code/fiddles/create-an-input-hint
   log   - fiddle.css
   log   - fiddle.details
   log   - fiddle.html
   log   - fiddle.js
   debug - Files generated at /Users/mk/Temp/dev/jquery/web-learn-jquery-com/code/fiddles/add-tabbed-navigation
   debug - Now creating gist for /Users/mk/Temp/dev/jquery/web-learn-jquery-com/code/fiddles/add-tabbed-navigation
   log   - fiddle.css
   log   - fiddle.details
   log   - fiddle.html
   log   - fiddle.js
   debug - Files generated at /Users/mk/Temp/dev/jquery/web-learn-jquery-com/code/fiddles/traversing
   debug - Now creating gist for /Users/mk/Temp/dev/jquery/web-learn-jquery-com/code/fiddles/traversing
   log   - fiddle.css
   log   - fiddle.details
   log   - fiddle.html
   log   - fiddle.js
   debug - Files generated at /Users/mk/Temp/dev/jquery/web-learn-jquery-com/code/fiddles/selecting
   debug - Now creating gist for /Users/mk/Temp/dev/jquery/web-learn-jquery-com/code/fiddles/selecting
   log   - fiddle.css
   log   - fiddle.details
   log   - fiddle.html
   log   - fiddle.js
   debug - Files generated at /Users/mk/Temp/dev/jquery/web-learn-jquery-com/code/fiddles/manipulating
   debug - Now creating gist for /Users/mk/Temp/dev/jquery/web-learn-jquery-com/code/fiddles/manipulating
   log   - fiddle.css
   log   - fiddle.details
   log   - fiddle.html
   log   - fiddle.js
   log   - Gist: https://gist.github.com/33ddf9bd52ee8ba37048
   log   - Gist: https://gist.github.com/06d9d3d17d6f717d7f05
   log   - Gist: https://gist.github.com/0db8602ab6b301d5f968
   log   - Gist: https://gist.github.com/e8516568079a9365b4be
   log   - Gist: https://gist.github.com/24e6d07b742a83ba7861
   log   - Gist: https://gist.github.com/5ac023cf9fff5bc2501c
   log   - Gist: https://gist.github.com/904fd7321e7af8558d00
   log   - Gist: https://gist.github.com/4718deea328891ad58e6
   info  - Done
   debug - Update Reveal Hidden Text with the jsFiddle urls <h3 id="reveal-hidden-text">Reveal Hidden Text</h3>
   debug - »  http://jsfiddle.net/gh/gist/jquery/edge/33ddf9bd52ee8ba37048
   info  - Replacing  /Users/mk/Temp/dev/jquery/web-learn-jquery-com/output/effects/effects-exercises/index.html 

   debug - Update Create Dropdown Menus with the jsFiddle urls <h3 id="create-dropdown-menus">Create Dropdown Menus</h3>
   debug - »  http://jsfiddle.net/gh/gist/jquery/edge/24e6d07b742a83ba7861
   info  - Replacing  /Users/mk/Temp/dev/jquery/web-learn-jquery-com/output/effects/effects-exercises/index.html 

   debug - Update Create a Slideshow with the jsFiddle urls <h3 id="create-a-slideshow">Create a Slideshow</h3>
   debug - »  http://jsfiddle.net/gh/gist/jquery/edge/0db8602ab6b301d5f968
   info  - Replacing  /Users/mk/Temp/dev/jquery/web-learn-jquery-com/output/effects/effects-exercises/index.html 

   debug - Update Create an Input Hint with the jsFiddle urls <h3 id="create-an-input-hint">Create an Input Hint</h3>
   debug - »  http://jsfiddle.net/gh/gist/jquery/edge/e8516568079a9365b4be
   info  - Replacing  /Users/mk/Temp/dev/jquery/web-learn-jquery-com/output/events/event-exercises/index.html 

   debug - Update Add Tabbed Navigation with the jsFiddle urls <h3 id="add-tabbed-navigation">Add Tabbed Navigation</h3>
   debug - »  http://jsfiddle.net/gh/gist/jquery/edge/904fd7321e7af8558d00
   info  - Replacing  /Users/mk/Temp/dev/jquery/web-learn-jquery-com/output/events/event-exercises/index.html 

   debug - Update Selecting with the jsFiddle urls <h3 id="selecting">Selecting</h3>
   debug - »  http://jsfiddle.net/gh/gist/jquery/edge/4718deea328891ad58e6
   info  - Replacing  /Users/mk/Temp/dev/jquery/web-learn-jquery-com/output/jquery-basics/exercises/index.html 

   debug - Update Traversing with the jsFiddle urls <h3 id="traversing">Traversing</h3>
   debug - »  http://jsfiddle.net/gh/gist/jquery/edge/06d9d3d17d6f717d7f05
   info  - Replacing  /Users/mk/Temp/dev/jquery/web-learn-jquery-com/output/jquery-basics/exercises/index.html 

   debug - Update Manipulating with the jsFiddle urls <h3 id="manipulating">Manipulating</h3>
   debug - »  http://jsfiddle.net/gh/gist/jquery/edge/5ac023cf9fff5bc2501c
   info  - Replacing  /Users/mk/Temp/dev/jquery/web-learn-jquery-com/output/jquery-basics/exercises/index.html 

   log   - Replaced  /Users/mk/Temp/dev/jquery/web-learn-jquery-com/output/effects/effects-exercises/index.html
   log   - Replaced  /Users/mk/Temp/dev/jquery/web-learn-jquery-com/output/events/event-exercises/index.html
   log   - Replaced  /Users/mk/Temp/dev/jquery/web-learn-jquery-com/output/jquery-basics/exercises/index.html
   info  - All Done
```




**more docs to come soon**

