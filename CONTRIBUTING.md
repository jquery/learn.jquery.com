<script>{
	"title": "Contributing",
	"customFields": [
		{
			"key": "is_chapter",
			"value": 0
		}
	]
}</script>

Depending on your level of experience with some of the workflows common to many open source projects, e.g. git/GitHub, the command line, and setting up a local development environment, contributing to this site may be a breeze or come with a bit of a learning curve. If you fit into the former group, great! Jump ahead to learn how to get started.

But if you think you're part of the second group, and have had trouble participating in open source because of a lack of comfort with the tools, **you're still welcome**! Beyond providing a resource for learning jQuery, a major goal of this site is to provide an encouraging environment for you to develop these skills, while still making a contribution that matters. Many people think that the only way to get involved with a programming project like jQuery is to solve intricate bugs that require a nuanced understanding of the codebase, or to propose enhancements that may or may not be in scope with the development team's plans. The fact is that there's way more: improving documentation, working on web properties, and supporting other users are crucial aspects where more help is always needed. If you're willing to share your time and expertise to help other developers, we're willing to [help you get up to speed with the tools](#getting-help) you'll need.

## Why Contribute?

If you've ever looked for help with jQuery – or with web development in general – you know the hunt can sometimes be challenging. It can be a process of wading through a number of different posts until you find that article that's the right combination of trustworthy, timely, and helpful for your particular problem. And if you're one of those authors – thanks! – then you are probably familiar with the frustrating feeling of putting a useful tip out there, and then wondering if it's actually making its way to the people who need it, and what to do with that old post years and versions down the road. You're invited to share that energy to help us bring that ecosystem together and grow it further!

If you've ever helped anyone, colleague or stranger, with a particular problem, then you know the value of having a reference you can quickly link to that says "here's how you do it." This site is intended to be that compendium, but there's always more to refine and add, and we need your help too!

Of course, we'll also give you credit for your work! The **Contributors** section for each article is generated from the git commit logs on the file, so you'll be publicly acknowledged for your help.

## How Does It Work?

### Content

The content in this site is maintained in [this GitHub repository](https://github.com/jquery/learn.jquery.com) as a collection of [Markdown](http://daringfireball.net/projects/markdown/) files in the `page` directory. The order in which chapters and articles are presented is controlled by the [order.json](https://github.com/jquery/learn.jquery.com/blob/master/order.json) file.

### Design

The site's layout and design is controlled by our [`jquery-wp-content`](https://github.com/jquery/jquery-wp-content), a custom [WordPress](http://wordpress.org) configuration that runs (or will run in the near future) all of the sites run by the jQuery Foundation. The [master theme](https://github.com/jquery/jquery-wp-content/tree/master/themes/jquery) controls most of the layout for all of our sites, and there is a [child theme](https://github.com/jquery/jquery-wp-content/tree/master/themes/learn.jquery.com) that controls the templates and styles specific to the learn site.

[`jquery-wp-content`](https://github.com/jquery/jquery-wp-content) powers our sites in production and staging environments, and can be set up for local development relatively easily.

### Build

The static content in the `page` directory is deployed to a [`jquery-wp-content`](https://github.com/jquery/jquery-wp-content) instance using [grunt](http://gruntjs.com), specifically with two grunt plugins we've created:

* [grunt-jquery-content](https://github.com/jquery/grunt-jquery-content) – pre-processes content in a variety of formats (HTML, Markdown, XML) into HTML, applying syntax highlighting and some simple partial support, preparing it for processing by:
* [grunt-wordpress](https://github.com/scottgonzalez/grunt-wordpress) – syncs static content to WordPress using [XML-RPC](http://codex.wordpress.org/XML-RPC_Support)

## How Can I Help?

The simplest and least complicated way to help is to [file issues](https://github.com/jquery/learn.jquery.com/issues) if you notice mistakes that should be fixed, improvements that can be made, or if you have ideas for new articles. We'll use the issues to continue discussion and track progress on anything you point out.

If you'd like to go a step further and contribute new articles, make edits to existing ones, or work on the site itself, the first thing you'll need is a [fork](https://help.github.com/articles/fork-a-repo). When you have changes you'd like to have reviewed for integration into the site, submit a [pull request](https://help.github.com/articles/using-pull-requests).

*(If you're unfamiliar with Git, you can still contribute by using features in GitHub's web interface. You can edit files directly via [GitHub's in-browser editor](https://github.com/blog/905-edit-like-an-ace). You can [create and delete branches directly from your fork](https://github.com/blog/1377-create-and-delete-branches), so you can also submit new articles as well. Either way, we still encourage you to [learn how to use Git and GitHub](https://help.github.com/) as soon as you can.)*

## Local Development

In order to preview your changes locally, work on design/layout issues, or work on other jQuery sites' content, and generally contribute most effectively, we recommend that you set up a local development environment. You can learn how to get set up from our [documentation on contributing to jQuery Foundation web sites](http://contribute.jquery.org/web-sites/#local-development).

* **Windows note:** Line endings need to be Unix-style (line-feed only). Make sure your text editor creates new files with Unix-style line endings. In addition, the following setting to your git config will keep the Unix-style line endings when pulling from the repository:

```
$ git config --global core.autocrlf true
```

### Working with Content

Once you've gotten your environment working, here are the general steps you should follow to make your changes:

1. Create a new "feature" branch based on `master`: `git branch <feature/issue name/number>`
2. Move onto that branch: `git checkout <feature/issue name/number>`
3. Work on your awesome contribution.
4. As you work and want to preview your changes, use `grunt` to deploy them to your site. You can also use `grunt watch` to have the site monitor the `page` directory for any changes and automatically have the changes deployed every time you save.
5. When you're done, stage the new/modified preparation for commit: `git add page/faq/how-do-i-add-a-new-article-to-the-learn-site.md`
6. Commit the files to your local repo: `git commit -m "add a relevant message describing the change"`
7. Push the files to your GitHub remote: `git push origin <feature/issue name/number>`
8. Go to your fork on GitHub and submit a new [pull request](https://help.github.com/articles/using-pull-requests).

For more advice on managing your fork and submitting pull requests to the jQuery Foundation, read our [Commits and Pull Requests](http://contribute.jquery.org/commits-and-pull-requests/) guide.

### Adding a New Article

1. Add the file to the right folder in the `page` folder.
2. Add the slug name (the filename without the extension) to the desired location in `order.json`
3. Run `grunt`
4. You should now be able to navigate to the file.

### Formatting Articles

Yes! Take a look at our [style guide](http://learn.jquery.com/style-guide/) for more information on authoring and formatting conventions.

<h2 id="getting-help">Getting Help</h2>

If you're struggling to get any part of the site working properly, or have any questions, we're here to help.

The best place to get help is on [IRC](http://en.wikipedia.org/wiki/Internet_Relay_Chat), in the `#jquery-content` channel on [Freenode](http://freenode.net). If you're unfamiliar with IRC, you can use the [webchat gateway](http://webchat.freenode.net/).

In addition, the jQuery Content Team holds a [public, biweekly meeting](http://jquery.org/meeting) on Wednesday, at 1PM Eastern time in the `#jquery-meeting` channel on Freenode.

If IRC is not your thing, but you still want or need to get in touch, please use the site's [GitHub repo](https://github.com/jquery/learn.jquery.com) or send us an e-mail to `content at jquery dot org`.
