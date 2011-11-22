# The jQuery Learning Site

* Primary Domain: [http://learn.jquery.com](http://learn.jquery.com)
* Staging Domain: [http://learn.jquery.com](http://stage.learn.jquery.com)

## Temporary Breaking News Section
We just changed this repository's name (and consequently its URL) from `web-learn-jquery-com` to `learn.jquery.com`.  If you already forked the project before this happened and created a remote to track this repo, you'll have to update that reference.  Assuming that `upstream` is what you named your remote, simply use the following command from inside your repo:

`git remote set-url upstream https://github.com/jquery/learn.jquery.com`

## About

Spread across the internet is lot of information about how to learn and use jQuery. This content ranges in quality from excellent to terrible, and is often stuck inside CMSes where only the original author can ever update the content. The goal of this site is twofold

1. To serve as a central, trustworthy, narrative compendium of information about how to use jQuery and JavaScript
2. To remain an timely, vibrant, and community-driven reference with a low barrier to contribution

Much of the initial content - and spirit - is from [jQuery Fundamentals](https://github.com/rmurphey/jqfundamentals), an open-source book about jQuery, originally released in 2010 by [Rebecca Murphe](http://www.rebeccamurphey.com/) and bequeathed unto the jQuery Project to serve as the foundation for this site.

This site consists of content maintained in [Markdown](http://daringfireball.net/projects/markdown/) files, powered by [nanoc](http://nanoc.stoneship.org/), a Ruby-based [static site generator](http://www.mickgardner.com/2011/04/27/An-Introduction-To-Static-Site-Generators.html).

## How Can I Get Involved?

The entire site is managed via this Git repository.  If you'd like to contribute new articles, make edits to existing content, or work on the site's frontend or backend code, the first thing you'll need is a [fork](http://help.github.com/fork-a-repo/). When you have changes you'd like to have reviewed and integrated into the site, submit a [pull request](http://help.github.com/send-pull-requests/).

If you aren't already familiar with Git, you'll still need a fork and a GitHub account, but you can can edit files directly via [GitHub's in-browser editor](https://github.com/blog/905-edit-like-an-ace), but you won't be able to create new content. We encourage you to [learn how to use Git andGitHub](http://help.github.com/), it'll probably pretty useful no matter what.


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
* The site should be running on http://localhost:3000. Use the `--port` option to specify a different port.
* Set the site to watch for changes and re-compile<br/>
`> nanoc watch`

## I Don't (Know If I?) Already Have a Ruby Development Environment

#### Mac OS X/Linux:

You actually probably already **do** have some Ruby available, but it's probably not Ruby 1.9. We recommend setting up:
* [rbenv](https://github.com/sstephenson/rbenv)
* [ruby-build](https://github.com/sstephenson/ruby-build)
* [rbenv-bundler](https://github.com/carsomyr/rbenv-bundler)
* [rbenv-gemset](https://github.com/jamis/rbenv-gemset)

Once you get that all squared away (and yes, we know that might be a big 'once'), you'll want to set your fork to use the Ruby > 1.9 you installed while you were setting up `rbenv`.

`cd ~/myfiles/learn.jquery.com`
`rbenv local 1.9.3-p0`

Then, you can follow the instructions above, starting at "Install the dependencies"

#### Windows

* Grab the latest Ruby package from the Windows-only [rubyinstaller.org](http://rubyinstaller.org/)
* Install it
* [Meta-bullet point: This section probably lacks detail. If a Windows-Ruby developer wants to help us flesh this section out, that would be great!]
* Follow the instructions above, starting at "Install the dependencies"
