---
title   : Downloading jQuery
status: needswork
editrequired: 2
attribution:  jQuery Docs
---

## About The Code

The code itself is written rather cleanly in an attempt to self-document. If
you've spotted some areas of code that could be improved, please feel free to
discuss it on [the Development forum](http://forum.jquery.com/developing-jquery-core). All input is greatly appreciated! 

All of the code is available in two formats: 

* Compressed (which allows you to have a significantly smaller file size) and
* Uncompressed (good for debugging and to understand what is behind the magic).

If you're interested in downloading [plugins](http://plugins.jquery.com/)
developed by jQuery contributors, please visit the
[Plugins][http://plugins.jquery.com/) page.

jQuery is provided under the [MIT and GPL licenses](http://jquery.org/license/).

## CDN Hosted jQuery

A number of large enterprises provide hosted copies of jQuery on existing
[CDNs](http://en.wikipedia.org/wiki/Content_delivery_network) networks that are
available for public use. Below are links to the CDN-hosted copies of jQuery
that you may hotlink to.

* Google Ajax API CDN
  * [http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js](http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js)
  * [Google Ajax CDN Documentation](http://code.google.com/apis/ajaxlibs/documentation/index.html#jquery)
* Microsoft CDN
  * [http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.6.2.min.js](http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.6.2.min.js)
  * [Ajax CDN Announcement](http://weblogs.asp.net/scottgu/archive/2009/09/15/announcing-the-microsoft-ajax-cdn.aspx), [Microsoft Ajax CDN Documentation](http://www.asp.net/ajax/cdn)
* jQuery CDN (via [Media Temple](http://mediatemple.net))
  * [http://code.jquery.com/jquery-1.6.2.min.js](http://code.jquery.com/jquery-1.6.2.min.js) Minified version
  * [http://code.jquery.com/jquery-1.6.2.js](http://code.jquery.com/jquery-1.6.2.js) Source version

## Download jQuery

This is the recommended version of jQuery to use for your application. The code in here should be stable and usable in all modern browsers.

The minified versions, while having a larger file size than the packed versions (note: packed version is not available in current release), are generally the best versions to use on production deployments. The packed versions require non-trivial client-side processing time to uncompress (unpack) the code whereas the minified versions do not. The packed versions of jQuery will take less time to download than the minified or uncompressed versions; however, each time the library is loaded (initially or from the browser cache) it will need to be uncompressed which will cause a non-trivial delay in the execution of any jQuery code each time it is loaded.

## Current Release
* **[  1.6.2 (Release Notes) ]( http://blog.jquery.com/2011/06/30/jquery-162-released/ )**<br/> [ Minified ]( http://code.jquery.com/jquery-1.6.2.min.js ), [ Uncompressed ]( http://code.jquery.com/jquery-1.6.2.js )

## Past Releases

* **[ 1.6.1 (Release Notes)](http://blog.jquery.com/2011/05/12/jquery-1-6-1-released/)**<br/>[Minified](http://code.jquery.com/jquery-1.6.1.min.js), [ Uncompressed ]( http://code.jquery.com/jquery-1.6.1.js )
* **[ 1.6 (Release Notes) ]( http://blog.jquery.com/2011/05/03/jquery-16-released/ )**<br/>  [ Minified ]( http://code.jquery.com/jquery-1.6.min.js ), [ Uncompressed ]( http://code.jquery.com/jquery-1.6.js )
* **[ 1.5.2 (Release Notes) ]( http://blog.jquery.com/2011/03/31/jquery-152-released/ )**<br/>  [ Minified ]( http://code.jquery.com/jquery-1.5.2.min.js ), [ Uncompressed ]( http://code.jquery.com/jquery-1.5.2.js )
* **[ 1.5.1 (Release Notes) ]( http://blog.jquery.com/2011/02/24/jquery-151-released/ )**<br/> [ Minified ]( http://code.jquery.com/jquery-1.5.1.min.js ), [ Uncompressed ]( http://code.jquery.com/jquery-1.5.1.js )<br>Documentation: [ Changelog ]( http://api.jquery.com/category/version/1.5.1/ )
* **[ 1.5 (Release Notes) ]( http://blog.jquery.com/2011/01/31/jquery-15-released/ )**<br/> [ Minified ]( http://code.jquery.com/jquery-1.5.min.js ), [ Uncompressed ]( http://code.jquery.com/jquery-1.5.js )<br>Documentation: [ Changelog ]( http://api.jquery.com/category/version/1.5/ )
* **[ 1.4.4 (Release Notes) ]( http://blog.jquery.com/2010/11/11/jquery-1-4-4-release-notes/ )**<br/> [ Minified ]( http://code.jquery.com/jquery-1.4.4.min.js ), [ Uncompressed ]( http://code.jquery.com/jquery-1.4.4.js )<br>Documentation: [ Changelog ]( http://api.jquery.com/category/version/1.4.4/ )
* **[ 1.4.3 (Release Notes) ]( http://blog.jquery.com/2010/10/16/jquery-143-released/ )**<br/> [ Minified ]( http://code.jquery.com/jquery-1.4.3.min.js ), [ Uncompressed ]( http://code.jquery.com/jquery-1.4.3.js )<br>Documentation: [ Changelog ]( http://api.jquery.com/category/version/1.4.3/ )
* **[ 1.4.2 (Release Notes) ]( http://blog.jquery.com/2010/02/19/jquery-142-released/ )**<br/> [ Minified ]( http://code.jquery.com/jquery-1.4.2.min.js ), [ Uncompressed ]( http://code.jquery.com/jquery-1.4.2.js )<br>Documentation: [ Changelog ]( http://api.jquery.com/category/version/1.4.2/ )
* **[ 1.4.1 (Release Notes) ]( http://jquery14.com/day-12/jquery-141-released )**<br/> [ Minified ]( http://code.jquery.com/jquery-1.4.1.min.js ), [ Uncompressed ]( http://code.jquery.com/jquery-1.4.1.js )<br>Documentation: [ Changelog ]( http://api.jquery.com/category/version/1.4.1/ ), [ Visual Studio ]( http://code.jquery.com/jquery-1.4.1-vsdoc.js )
* **[ 1.4 (Release Notes) ]( http://jquery14.com/day-01/jquery-14 )**<br/> [ Minified ]( http://code.jquery.com/jquery-1.4.min.js ), [ Uncompressed ]( http://code.jquery.com/jquery-1.4.js )<br>Documentation: [ Changelog ]( http://api.jquery.com/category/version/1.4/ )

<!--
* **[[Release:jQuery_1.3.2|1.3.2 (Release Notes)]]**<br/> [http://code.google.com/p/jqueryjs/downloads/detail?name=jquery-1.3.2.min.js Minified], [http://code.google.com/p/jqueryjs/downloads/detail?name=jquery-1.3.2.js Uncompressed]<br>[http://code.google.com/apis/ajaxlibs/documentation/index.html#jquery Google's AJAX Library  API/CDN]: [http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js Minified]<br>Documentation: [http://code.google.com/p/jqueryjs/downloads/detail?name=jquery-1.3.2-vsdoc2.js Visual Studio]
* **[[Release:jQuery_1.3.1|1.3.1 (Release Notes)]]**<br/> [http://code.google.com/p/jqueryjs/downloads/detail?name=jquery-1.3.1.min.js Minified], [http://code.google.com/p/jqueryjs/downloads/detail?name=jquery-1.3.1.js Uncompressed]<br>Documentation: [http://code.google.com/p/jqueryjs/downloads/detail?name=jquery-1.3.1-vsdoc.js Visual Studio]
* **[[Release:jQuery_1.3|1.3 (Release Notes)]]**<br/> [http://code.google.com/p/jqueryjs/downloads/detail?name=jquery-1.3.min.js Minified], [http://code.google.com/p/jqueryjs/downloads/detail?name=jquery-1.3.js Uncompressed]<br>Documentation: [http://api.jquery.com/category/version/1.3/ Changelog], [http://code.google.com/p/jqueryjs/downloads/detail?name=jquery-1.3-vsdoc.js Visual Studio]
* **[[Release:jQuery_1.2.6|1.2.6 (Release Notes)]]**<br/> [http://code.google.com/p/jqueryjs/downloads/detail?name=jquery-1.2.6.min.js Minified], [http://code.google.com/p/jqueryjs/downloads/detail?name=jquery-1.2.6.pack.js Packed], [http://code.google.com/p/jqueryjs/downloads/detail?name=jquery-1.2.6.js Uncompressed]<br>Documentation: [http://code.google.com/p/jqueryjs/downloads/detail?name=jquery-1.2.6-vsdoc.js Visual Studio]
* **[[Release:jQuery_1.2.5|1.2.5 (Release Notes)]]**<br/> [http://code.google.com/p/jqueryjs/downloads/detail?name=jquery-1.2.5.min.js Minified], [http://code.google.com/p/jqueryjs/downloads/detail?name=jquery-1.2.5.pack.js Packed], [http://code.google.com/p/jqueryjs/downloads/detail?name=jquery-1.2.5.js Uncompressed]
* **[[Release:jQuery_1.2.4|1.2.4 (Release Notes)]]**<br/> [http://code.google.com/p/jqueryjs/downloads/detail?name=jquery-1.2.4.min.js Minified], [http://code.google.com/p/jqueryjs/downloads/detail?name=jquery-1.2.4.pack.js Packed], [http://code.google.com/p/jqueryjs/downloads/detail?name=jquery-1.2.4.js Uncompressed]
* **[[Release:jQuery_1.2.3|1.2.3 (Release Notes)]]**<br/> [http://code.google.com/p/jqueryjs/downloads/detail?name=jquery-1.2.3.min.js Minified], [http://code.google.com/p/jqueryjs/downloads/detail?name=jquery-1.2.3.pack.js Packed], [http://code.google.com/p/jqueryjs/downloads/detail?name=jquery-1.2.3.js Uncompressed]
* **[[Release:jQuery_1.2.2|1.2.2 (Release Notes)]]**<br/> [http://code.google.com/p/jqueryjs/downloads/detail?name=jquery-1.2.2.min.js Minified], [http://code.google.com/p/jqueryjs/downloads/detail?name=jquery-1.2.2.pack.js Packed], [http://code.google.com/p/jqueryjs/downloads/detail?name=jquery-1.2.2.js Uncompressed]
* **[[Release:jQuery_1.2.1|1.2.1 (Release Notes)]]**<br/> [http://code.google.com/p/jqueryjs/downloads/detail?name=jquery-1.2.1.min.js Minified], [http://code.google.com/p/jqueryjs/downloads/detail?name=jquery-1.2.1.pack.js Packed], [http://code.google.com/p/jqueryjs/downloads/detail?name=jquery-1.2.1.js Uncompressed]
* **[[Release:jQuery_1.2|1.2 (Release Notes)]]**<br/> [http://code.google.com/p/jqueryjs/downloads/detail?name=jquery-1.2.min.js Minified], [http://code.google.com/p/jqueryjs/downloads/detail?name=jquery-1.2.pack.js Packed], [http://code.google.com/p/jqueryjs/downloads/detail?name=jquery-1.2.js Uncompressed]
* **[http://jquery.com/blog/2007/08/24/jquery-114-faster-more-tests-ready-for-12/ 1.1.4]**<br/> [http://code.google.com/p/jqueryjs/downloads/detail?name=jquery-1.1.4.pack.js Compressed], [http://code.google.com/p/jqueryjs/downloads/detail?name=jquery-1.1.4.js Uncompressed]
* **[http://jquery.com/blog/2007/07/05/jquery-1131/ 1.1.3.1]**<br/> [http://code.google.com/p/jqueryjs/downloads/detail?name=jquery-1.1.3.1.pack.js Compressed], [http://code.google.com/p/jqueryjs/downloads/detail?name=jquery-1.1.3.1.js Uncompressed]
* **[http://jquery.com/blog/2007/07/01/jquery-113-800-faster-still-20kb/ 1.1.3]**<br/> [http://code.google.com/p/jqueryjs/downloads/detail?name=jquery-1.1.3.pack.js Compressed], [http://code.google.com/p/jqueryjs/downloads/detail?name=jquery-1.1.3.js Uncompressed]
* [http://jquery.com/blog/2007/02/27/jquery-112/ **1.1.2**]<br/> [http://code.jquery.com/jquery-1.1.2.pack.js Compressed], [http://code.jquery.com/jquery-1.1.2.js Uncompressed]
* [http://jquery.com/blog/2007/01/22/jquery-111/ **1.1.1**]<br/> [http://code.jquery.com/jquery-1.1.1.pack.js Compressed], [http://code.jquery.com/jquery-1.1.1.js Uncompressed]
* [http://jquery.com/blog/2007/01/14/jquery-birthday-11-new-site-new-docs/ **1.1**]<br/> [http://code.jquery.com/jquery-1.1.pack.js Compressed], [http://code.jquery.com/jquery-1.1.js Uncompressed]
* [http://jquery.com/blog/2006/12/12/jquery-104/ **1.0.4**]<br/> [http://code.jquery.com/jquery-1.0.4.pack.js Compressed], [http://code.jquery.com/jquery-1.0.4.js Uncompressed]
* [http://jquery.com/blog/2006/10/27/jquery-103/ **1.0.3**]<br/> [http://code.jquery.com/jquery-1.0.3.pack.js Compressed], [http://code.jquery.com/jquery-1.0.3.js Uncompressed] 
* [http://jquery.com/blog/2006/10/09/jquery-102/ **1.0.2**]<br/> [http://code.jquery.com/jquery-1.0.2.pack.js Compressed], [http://code.jquery.com/jquery-1.0.2.js Uncompressed]
* [http://jquery.com/blog/2006/08/31/jquery-101/ **1.0.1**]<br/> [http://code.jquery.com/jquery-1.0.1.pack.js Compressed], [http://code.jquery.com/jquery-1.0.1.js Uncompressed]
* [http://jquery.com/blog/2006/08/26/jquery-10/ **1.0**]<br/> [http://code.jquery.com/jquery-1.0.pack.js Compressed]
-->

## jQuery Git - An Instant WIP Build For Testing

This work-in-progress build (known as jQuery Git) is generated once a minute
from the [jQuery Git repository]( http://github.com/jquery/jquery ). It is
provided as a convenience for anyone that wants to help test changes in the
next version of jQuery.

When reporting issues with WIP builds of jQuery, please make sure you include
the date the snapshot was generated (it is listed at the top of the file).

Linking to WIP builds directly from the CDN is not advised, as the file is
constantly refreshed and will change from minute to minute as new commits are
made to the repository.

**WARNING:** Do **NOT** use jQuery Git in a production system or live
application! It is not tested. It is not stable. It will probably blow up on
you unexpectedly. You have been warned! If in doubt, stop and use the
[current release](#Current_Release).

* [ jquery-git.js ](http://code.jquery.com/jquery-git.js) - Uncompressed, work-in-progress build

## Build From Git
**Note:** The following is quite advanced. If you wish to just use a more-recent version of jQuery, please try the WIP build.

All source code is kept under Git revision control, which you can [ browse online ]( http://github.com/jquery/jquery ). There's a download link available for any file or directory, if you only want to download a portion of the jQuery code.

If you have access to Git, you can connect to the repository here:

    git clone git://github.com/jquery/jquery.git

You can also check out a specific version of jQuery from GitHub at:

     git clone git://github.com/jquery/jquery.git
     git checkout <version>
     e.g. git checkout 1.2.6

If you want to build your own copy of jQuery from the Git repository, you will need to build it.

**Note:** The jQuery UI code is in its own Git repository:
 git clone git://github.com/jquery/jquery-ui.git

## Build Requirements

jQuery currently requires the following components to be installed:

* A build system (either <code>make</code> or <code>ant</code> works):
** make: Available on most Unix-based system (Unix, BSD, OSX, Cygwin)
** ant: Available on any platform with JDK and ANT installed
* java: A copy of Java, version 1.6.0 or later (required to build the minified version of jQuery).

**Build Process**

You will now need to use the build system that you chose previously - either <code>make</code> or <code>ant</code>.

#### If you're using make:

* **To create jQuery:** <code>make</code>
** This will create jquery.js and jquery.min.js in the dist directory

#### If you're using ant:
* **To create jQuery:** <code>ant</code>
** This will create jquery.js and jquery.min.js in the dist directory

