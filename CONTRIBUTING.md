## Before you begin

You'll need to set up your development environment.  Please follow the [README.md] for instructions on setting up WordPress, web-base-templates and the learn.jquery.com repo which contains the content. 

## How Can I Help?

The entire site is managed via [this Git repository](https://github.com/jquery/learn.jquery.com).  If you'd like to contribute new articles, make edits to existing content, or work on the site itself, the first thing you'll need is a [fork](https://help.github.com/articles/fork-a-repo). When you have changes you'd like to have reviewed for integration into the site, submit a [pull request](http://help.github.com/send-pull-requests/).

If you're unfamiliar with Git, you can still contribute by editing files directly via [GitHub's in-browser editor](https://github.com/blog/905-edit-like-an-ace). But you won't be able to create new content, and you'll still need a GitHub account and a fork of this repository. So we encourage you to [learn how to use Git and GitHub](http://help.github.com/); it'll probably pretty useful no matter what.

Here are some shortcuts to getting set up:

1. Fork the [repository](https://github.com/jquery/learn.jquery.com)
2. Clone the repo `git clone git@github.com:*<your username>*/learn.jquery.com.git`
3. Set up an upstream remote back to the jQuery repo 'git remote add upstream git@github.com:jquery/learn.jquery.com.git'
4. Branch master into a feature branch `git branch *<feature/issue name/number>*`
5. Move into that branch `git checkout *<feature/issue name/number>*`
6. Work on your awesome contribution. 
7. Stage the files to the index in preparation for commit `git add .`
8. Commit the files to your local repo `git commit -m "*add a relevant message describing the change*"`
9. Push the files to your github repo `git push origin *<feature/issue name/number>*`
10. Go to github.com and go to the forked repo and submit a new [pull request](https://help.github.com/articles/using-pull-requests).

## Where is the content?

The site files are organized in a way that you can find all the content in the site in the `page` folder.

## How to see changes you make?

The site files are built using grunt. After making a change open up your terminal and run grunt.  Tip you can run grunt watch and grunt will watch the files for changes so you don't need to continually rerun grunt after each change. 

## How do I add a new article?

* Add the file to the right folder in the page folder. 
* Add the slug name (the filename without the extension) to the right area in order.yml
* Run grunt
* You should now be able to navigate to the file. 

## What is the syntax used?

We are using the Github flavored Markdown.

## Article Header Metadata

Each article should have the following header (see below as some metatags are optional):

```
---
title:  <article title>
level:  [beginner|intermediate|advance]
source:  <url of source of the material derived>
attribution: 
  - Ralph Whitbeck <ralph@email.com>
  - John Paul<john@email.com>
---
```

The `source` attibute is optional. 
If the article was pulled in from an outside source you also need to add an attribution tag to give credit to the original authors. 

## How do I get credit for my contribution?

We will build the attribution of an article based on the git commit logs.  Only use the attribution meta tag to give credit to authors outside of git for an article that was pulled in for instance. 

## Style Guide

### Writing
The jQuery Learning Site uses the [same style guide as the jQuery Documentation team](https://github.com/jquery/api.jquery.com#style-guidelines). 

### Code 
Please use the [jQuery Core Code Style Guide](http://docs.jquery.com/JQuery_Core_Style_Guidelines) for your code examples. 

If you have questions which are not addressed by this style guide, please refer to [idiomatic.js](https://github.com/rwldrn/idiomatic.js/).