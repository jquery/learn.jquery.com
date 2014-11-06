# The jQuery Learning Site

* Primary Domain: [http://learn.jquery.com](http://learn.jquery.com)
* Staging Domain: [http://stage.learn.jquery.com](http://stage.learn.jquery.com)

## About

The goal of this site is twofold:

1. To serve as a central, trustworthy, narrative compendium of information about how to use jQuery and JavaScript.
2. To remain a timely, vibrant, and community-driven reference with a relatively low barrier to contribution.

Much of the initial content - and spirit - comes from [jQuery Fundamentals](http://jqfundamentals.com/legacy), an open-source book about jQuery, originally written by [Rebecca Murphey](http://www.rmurphey.com/) and released in 2010. In 2011, Rebecca [bequeathed the book](http://rmurphey.com/blog/2011/03/17/the-future-of-jquery-fundamentals-and-a-confession/) unto the jQuery Foundation to serve as the basis for this site.


## How This Site Works

This site's core content consists of [Markdown](http://daringfireball.net/projects/markdown/) files. The template that controls the site's appearance is a [child theme](https://github.com/jquery/jquery-wp-content/tree/master/themes/learn.jquery.com) of [jquery-wp-content](https://github.com/jquery/jquery-wp-content), and any issues with the presentation should be directed to [that repository](https://github.com/jquery/jquery-wp-content).

### Site Organization

All of the content lives inside of the subdirectories of the `page` directory. Each of these subdirectories is considered a **chapter**, and contains one or more **articles**, and there is also a top level file that corresponds to each chapter, which contains the chapter's human-readable title and an overview, which will appear on the chapter's landing page.

The [`order.json`](https://github.com/jquery/learn.jquery.com/blob/master/order.json) file controls the order that chapters and articles appear in the site.


### Front Matter

Each of the articles on the site has some JSON "Front Matter" that contains metadata. All articles should include the following:

* `title` - The title of the article as it will appear in the site.

`"title": "jQuery Event Extensions"`

* `level` - The approximate level of jQuery experience required to find the article useful. Options: `beginner`, `intermediate`, or `advanced`.

`"level": "advanced"`


## Building & Working Locally

As this site is part of the jQuery network of sites, its presentation is controlled by [jquery-wp-content](https://github.com/jquery/jquery-wp-content). To preview the site locally, first follow the [instructions there](https://github.com/jquery/jquery-wp-content) to set up a local version of the jQuery WordPress network. Then, clone this repo and run the following steps (node.js required).

1. `npm install`
2. `cp config-sample.json config.json`
3. Edit config.json to use the username and password for your local WordPress network
4. `grunt`

## How Can I Help?

We encourage contribution from anyone. For more comprehensive documentation on how to get involved, please read our [contributing guide](http://learn.jquery.com/contributing).
