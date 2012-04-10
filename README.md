# The jQuery Learning Site

* Primary Domain: [http://learn.jquery.com](http://learn.jquery.com)
* Staging Domain: [http://stage.learn.jquery.com](http://stage.learn.jquery.com) *(not currently up to date)*

## About

Spread across the internet is lot of information about how to learn and use jQuery. This content ranges in quality from excellent to terrible, and is often stuck inside CMSes where only the original author can ever update the content. The goal of this site is twofold

1. To serve as a central, trustworthy, narrative compendium of information about how to use jQuery and JavaScript
2. To remain a timely, vibrant, and community-driven reference with a low barrier to contribution

Much of the initial content - and spirit - is from [jQuery Fundamentals](https://github.com/rmurphey/jqfundamentals), an open-source book about jQuery, originally released in 2010 by [Rebecca Murphey](http://www.rebeccamurphey.com/) and bequeathed unto the jQuery Project to serve as the foundation for this site.


## How Does This Site Work

This site consists of content maintained in [Markdown](http://daringfireball.net/projects/markdown/) files. For authoring and previewing content, these files are processed by [nanoc](http://nanoc.stoneship.org/), a Ruby-based [static site generator](http://www.mickgardner.com/2011/04/27/An-Introduction-To-Static-Site-Generators.html). For production on [learn.jquery.com](http://learn.jquery.com), the result of nanoc is post-processed by a node.js script that populates pages into the learning section of the jQuery Wordpress network. The template that controls the site's presentation is a [child theme](https://github.com/jquery/web-base-template/tree/master/themes/learn-jquery-com) of the jQuery [web base template](https://github.com/jquery/web-base-template), and any issues with the presentation should be directed to [that repository](https://github.com/jquery/web-base-template).

### Site Organisation

All of the content lives inside of the subdirectories of the `content` directory. Each of these subdirectories is considered a **category**, and contains one or more **articles** as well as a `dex.md` file that specifies the category's human-readable title, as well as an overview of the category for its landing page. The order that categories and articles appear in the site is controlled by the [`order.yml`](https://github.com/jquery/learn.jquery.com/blob/master/order.yml) file, which simply lists the folder names and file names in the order they should appear. Categories or articles that do not appear in this file will not be published in the production site.

### YAML Conventions

Each of the articles on the site has some [YAML "Front Matter"](https://github.com/mojombo/jekyll/wiki/YAML-Front-Matter) that contains metadata. All articles should include the following:

* title - the title of the article as it will appear in the site. if it contains special characters, put the string in quotes

`title: "jQuery Event Extensions"`

* level - the approximate level of jQuery experience required to find the article useful. must be `beginner`, `intermediate`, or `advanced`

`level: advanced`

* github - the github username of the person to whom the article should be [publicly attributed in the footer](http://learn.jqnetwork.dev/using-jquery-core/feature-browser-detection/). defaults to `jquery`. **We will likely be improving this to use GitHub's API to figure out who's worked a given article**

`github: dmethvin`

In addition, there is an `attribution` property, which contains a list of names of people who have worked on the article. It is not used in the site rendering, but is there for what we'll refer to as "historical purposes," as it is most often used to refer to work originally from jQuery Fundamentals. It can be a simple

`attribution: jQuery Fundamentals`

or a YAML list

```
attribution:
  - jQuery Fundamentals
  - Johnny Appleseed
```


## How Can I Help?

The entire site is managed via [this Git repository](https://github.com/jquery/learn.jquery.com).  If you'd like to contribute new articles, make edits to existing content, or work on the site itself, the first thing you'll need is a [fork](http://help.github.com/fork-a-repo/). When you have changes you'd like to have reviewed and integrated into the site, submit a [pull request](http://help.github.com/send-pull-requests/).

If you aren't already familiar with Git, you'll still need a fork and a GitHub account, but you can can edit files directly via [GitHub's in-browser editor](https://github.com/blog/905-edit-like-an-ace), but you won't be able to create new content. We encourage you to [learn how to use Git and GitHub](http://help.github.com/), it'll probably pretty useful no matter what.


## How Do I Get This Running Locally?

*This project requires Ruby >= 1.9 and [Bundler](http://gembundler.com/). If you don't already have a Ruby development environment, please see the corresponding section below.*

*If you **only** want to work with and edit content, you don't actually have to get the project running locally, you can just edit/add Markdown content inside of the `content`  directory. Of course, you won't be able to preview your content locally*

* Clone/fork this repo<br/>
* Change to the newly cloned repository's directory<br/>
`> cd learn.jquery.com`
* Install the dependencies<br/>
`> gem install bundler && bundle install`
* Run the nanoc server<br/>
`> nanoc view &`
* Set the site to watch for changes and re-compile<br/>
`> nanoc watch`
* The site should be running on http://localhost:3000. Use the `--port` option to specify a different port.

## I Don't (Know If I?) Already Have a Ruby Development Environment

#### Mac OS X/Linux:

You actually probably already **do** have some Ruby available, but it's probably not Ruby 1.9. We recommend setting up:

* [rbenv](https://github.com/sstephenson/rbenv)
* [ruby-build](https://github.com/sstephenson/ruby-build)
* [rbenv-bundler](https://github.com/carsomyr/rbenv-bundler)
* [rbenv-gemset](https://github.com/jamis/rbenv-gemset)

Once you get that all squared away (and yes, we know that might be a big 'once'), you'll want to set your fork to use the Ruby > 1.9 you installed while you were setting up `rbenv`.

`cd ~/THE_DIRECTORY_WHERE_YOU_CLONE_GIT_REPOS/learn.jquery.com`
`rbenv local 1.9.3-p0`

Then, you can follow the instructions above, starting at "Install the dependencies"

#### Windows

* Grab the latest Ruby package from the Windows-only [rubyinstaller.org](http://rubyinstaller.org/)
* Install it
* [Meta-bullet point: This section probably lacks detail. If a Windows-Ruby developer wants to help us flesh this section out, **please do**!]
* Follow the instructions above, starting at "Install the dependencies"
