## Before you begin

You'll need to set up your development environment.  Please follow the [README.md] for instructions on setting up WordPress, web-base-templates and the learn.jquery.com repo which contains the content. 

## How Can I Help?

The entire site is managed via [this Git repository](https://github.com/jquery/learn.jquery.com).  If you'd like to contribute new articles, make edits to existing content, or work on the site itself, the first thing you'll need is a [fork](https://help.github.com/articles/fork-a-repo). When you have changes you'd like to have reviewed for integration into the site, submit a [pull request](http://help.github.com/send-pull-requests/).

If you're unfamiliar with Git, you can still contribute by editing files directly via [GitHub's in-browser editor](https://github.com/blog/905-edit-like-an-ace). But you won't be able to create new content, and you'll still need a GitHub account and a fork of this repository. So we encourage you to [learn how to use Git and GitHub](http://help.github.com/); it'll probably pretty useful no matter what.

Here are some shortcuts to getting set up:

1. Fork the [repository](https://github.com/jquery/learn.jquery.com)
2. Clone the repo `git clone git@github.com:<your username>/learn.jquery.com.git`
3. Set up an upstream remote back to the jQuery repo 'git remote add upstream git@github.com:jquery/learn.jquery.com.git'
4. Branch master into a feature branch `git branch <feature/issue name/number>`
5. Move into that branch `git checkout <feature/issue name/number>`
6. Work on your awesome contribution. 
7. Stage the files to the index in preparation for commit `git add .`
8. Commit the files to your local repo `git commit -m "add a relevant message describing the change"`
9. Push the files to your github repo `git push origin <feature/issue name/number>`
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

## Style Guidelines

Content should be educational and accessible to a broad audience of developers. The primary target audience is beginning to intermediate jQuery users, with advanced jQuery users as a secondary audience. When creating content for this site, please keep one of these audiences in mind as well as the following style guidelines.

### Prose & Grammar

  - Use the Oxford comma in a list of three or more items:
    - **Yes:** The `load`, `scroll`, and `error` events (e.g., on an `<img>` element) do not bubble.
    - **No:** The `load`, `scroll` and `error` events (e.g., on an `<img>` element) do not bubble.
  - Numbers:
    - Spell out numbers one under 10.
    - Use numerals for numbers 10 and above.
  - Abbreviations:
    - Spell out abbreviated words on first reference, followed by the abbreviation in parentheses. Use abbreviations on second reference.

#### Code within Prose

  - Always use a `code` span to denote code from prose.
  - Methods: use a dot, followed by the method name, followed by parentheses, e.g.: The `.focus()` method is a shortcut for the `.bind('focous', handler)` in the first and second variations, and `.trigger('focus') in the third.
  - Properties: use a dot, followed by the property name, e.g.: `.length`.
  - Functions: use the function name, followed by parentheses, e.g.: `myfunction()`.

#### Article & Sentence Structure

  - Use headings to break up content into easier-to-read sections. Begin headings within an article with `<h2>`.
  - Keep sentences short and to the point. A good rule-of-thumb is to break up any sentence longer than 21 words into two or more seperate thoughts.
  - Lists:
    - Use bulleted lists when necessary to share a series of five or more points.
    - Use numbered lists only when providing step-by-step instruction - note that this should be avoided.
    - Use a period at the end of each ordered list item, and a period or comma at the end of an unordered list item.

#### Spelling

  - Use standard American English spelling.
  - Capitalization:
    - Capitalize all proper nouns.
    - Do not capitalize HTML elements in code examples.
    - Capitalize all words in a heading or sub-heading with the exception of article adjectives and the prepositions like "with," "of," or "to."
    - Capitalize the first word in a list.
  - Punctuation:
    - Periods and commas go inside quotation marks.
    - Avoid using semicolons.

#### Pronoun Usage

  - Don't use "I," "me," "us," "our," "we," and gender-specific pronouns such as "him" or "she."
  - Use the second-person pronoun "you" when addressing the reader, and the definite article "the" when addressing code or content:
    - *"You will be able to foo bar after you bar the foo."*
    - *"Insert the paragraph after the unordered list."*

#### Voice & Tone

  - Do write in clear, easy-to-understand statements. 
  - Do write in active voice.
  - Do keep the audience in mind while writing.
  - Do write conversationally. 
  - Do write in the second person to address the reader.
  - Do use the imperative mood.
  - Do use humor strategically. When in doubt, err on the side of formality.
  - Do use hyperlinks to refer readers to concepts or topics that have been covered in other sections.
  - Do attribute others.
  - Don't assume the reader will have prior knowledge of topics or concepts, especially when targeting beginner or intermediate audiences.
  - Don't use rhetorical questions.
  - Don't write in first or third person.

#### Linking & Referencing Content

  - Link to relevant content within the learn.jquery.com site to refer readers to previously covered topics or concepts. 
  - Link to the jQuery blog or API documentation when necessary.
  - Use inline hyperlinks to reference relevant content.
  - Acceptable external resources:
    - Mozilla Developer Network
    - Webplatform.org
    - htmldog.com

### Code Examples

  - Use examples to illustrate important concepts.
  - Examples should indicate what the expected result will be in comments before code is presented.
  - Break long examples up into shorter sections to aid comprehension.
  - Favor "Right Way" examples over "Wrong Way" examples - there is more than one wrong way to do something, after all.e
  - Use good comments so that explanation within prose isn't necessary.
  - Test your code examples before submitting.
  - Use the [jQuery Core Code Style Guide](http://docs.jquery.com/JQuery_Core_Style_Guidelines) for your code examples. 
