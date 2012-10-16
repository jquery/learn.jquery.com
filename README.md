# The jQuery Learning Site

* Primary Domain: [http://learn.jquery.com](http://learn.jquery.com)
* Staging Domain: [http://stage.learn.jquery.com](http://stage.learn.jquery.com)

## About

The goal of this site is twofold:

1. To serve as a central, trustworthy, narrative compendium of information about how to use jQuery and JavaScript.
2. To remain a timely, vibrant, and community-driven reference with a low barrier to contribution.

Much of the initial content - and spirit - comes from [jQuery Fundamentals](https://github.com/rmurphey/jqfundamentals), an open-source book about jQuery, originally written by [Rebecca Murphey](http://www.rmurphey.com/) and released in 2010. In 2011, Rebecca [bequeathed the book](http://rmurphey.com/blog/2011/03/17/the-future-of-jquery-fundamentals-and-a-confession/) unto the jQuery Project to serve as the foundation for this site.


## How This Site Works

This site's core content consists of [Markdown](http://daringfireball.net/projects/markdown/) files. We use [nanoc](http://nanoc.stoneship.org/), a Ruby-based [static site generator](http://www.mickgardner.com/2011/04/27/An-Introduction-To-Static-Site-Generators.html), to process these files for previewing. For production on [learn.jquery.com](http://learn.jquery.com), a node.js script post-processes the nanoc results and puts them into the learning section of the jQuery Wordpress network.

The template that controls the site's appearance is a [child theme](https://github.com/jquery/web-base-template/tree/master/themes/learn-jquery-com) of the jQuery [web base template](https://github.com/jquery/web-base-template), and any issues with the presentation should be directed to [that repository](https://github.com/jquery/web-base-template).

### Site Organization

All of the content lives inside of the subdirectories of the `content` directory. Each of these subdirectories is considered a **category**, and contains one or more **articles**. Each category also contains a `dex.md` file that contains the category's human-readable title and an overview, which will appear on the category's landing page.

An [`order.yml`](https://github.com/jquery/learn.jquery.com/blob/master/order.yml) file controls the order that categories and articles appear in the site. Categories or articles that do not appear in this file will not be published in the production site.

### YAML Conventions

Each of the articles on the site has some [YAML "Front Matter"](https://github.com/mojombo/jekyll/wiki/YAML-Front-Matter) that contains metadata. All articles should include the following:

* title - the title of the article as it will appear in the site. if it contains special characters, put the string in quotes

`title: "jQuery Event Extensions"`

* level - the approximate level of jQuery experience required to find the article useful. Options: `beginner`, `intermediate`, or `advanced`

`level: advanced`

## How Can I Help?

The entire site is managed via [this Git repository](https://github.com/jquery/learn.jquery.com).  If you'd like to contribute new articles, make edits to existing content, or work on the site itself, the first thing you'll need is a [fork](http://help.github.com/fork-a-repo/). When you have changes you'd like to have reviewed for integration into the site, submit a [pull request](http://help.github.com/send-pull-requests/).

If you're unfamiliar with Git, you can still contribute by editing files directly via [GitHub's in-browser editor](https://github.com/blog/905-edit-like-an-ace). But you won't be able to create new content, and you'll still need a GitHub account and a fork of this repository. So we encourage you to [learn how to use Git and GitHub](http://help.github.com/); it'll probably pretty useful no matter what.

## Building && Working Locally

As this site is part of the jQuery network of sites, its presentation is controlled by our [web base template](https://github.com/jquery/web-base-template). To preview the site locally, first follow the [instructions there](https://github.com/jquery/web-base-template) to set up a local version of the jQuery WordPress network. Then, clone this repo and run the following steps (node.js required).


1. `npm install`
2. `cp config-sample.json config.json`
3. Edit config.json to use the username and password for your local WordPress network
4. `grunt`

*Windows note: Line endings need to be Unix-style (line-feed only). Make sure your text editor creates new files with Unix-style line endings. In addition, the following setting to your git config will keep the Unix-style line endings when pulling from the repository.*

```
$ git config --global core.autocrlf true
```