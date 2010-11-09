=== Akismet ===
Contributors: matt, ryan, andy, mdawaffe, tellyworth, automattic
Tags: akismet, comments, spam
Requires at least: 2.0
Tested up to: 3.0
Stable tag: 2.3.0

Akismet checks your comments against the Akismet web service to see if they look like spam or not.

== Description ==

Akismet checks your comments against the Akismet web service to see if they look like spam or not and lets you
review the spam it catches under your blog's "Comments" admin screen.

Want to show off how much spam Akismet has caught for you? Just put `<?php akismet_counter(); ?>` in your template.

See also: [WP Stats plugin](http://wordpress.org/extend/plugins/stats/).

PS: You'll need an [Akismet.com API key](http://akismet.com/get/) to use it.

== Installation ==

Upload the Akismet plugin to your blog, Activate it, then enter your [Akismet.com API key](http://akismet.com/get/).

1, 2, 3: You're done!

== Changelog ==

* Fix "Are you sure" nonce message on config screen in WPMU
* Fix XHTML compliance issue in sidebar widget
* Change author link; remove some old references to WordPress.com accounts
* Localize the widget title (core ticket #13879)

= 2.2.9 =

* Eliminate a potential conflict with some plugins that may cause spurious reports

= 2.2.8 =

* Fix bug in initial comment check for ipv6 addresses
* Report comments as ham when they are moved from spam to moderation
* Report comments as ham when clicking undo after spam
* Use transition_comment_status action when available instead of older actions for spam/ham submissions
* Better diagnostic messages when PHP network functions are unavailable
* Better handling of comments by logged-in users

= 2.2.7 =

* Add a new AKISMET_VERSION constant
* Reduce the possibility of over-counting spam when another spam filter plugin is in use
* Disable the connectivity check when the API key is hard-coded for WPMU

= 2.2.6 =

* Fix a global warning introduced in 2.2.5
* Add changelog and additional readme.txt tags
* Fix an array conversion warning in some versions of PHP
* Support a new WPCOM_API_KEY constant for easier use with WordPress MU

= 2.2.5 =

* Include a new Server Connectivity diagnostic check, to detect problems caused by firewalls

= 2.2.4 =

* Fixed a key problem affecting the stats feature in WordPress MU
* Provide additional blog information in Akismet API calls
