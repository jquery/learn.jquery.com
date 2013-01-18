---
title: IRC Help
---

## Getting Connected

Internet Relay Chat (IRC) is an ancient and trusty medium to let users
"chat" across the network. IRC is one of the best ways to get instant
technical help from enthusiastic experts.

To send and receive messages on IRC you connect with a "client" and
then "join" a "channel" relevant to your "interests". Channels
(denoted by # and then the channel name) are essentially "chat rooms"
where like-minded souls congregate, and messages posted to a channel
can be seen by other users in the channel.

You can also send private messages (PMs) to other users but this should only
be done on very special occassions, or if you already know the person you're PMing.

The [#jQuery](irc://irc.freenode.net/#jquery) channel on the Freenode network is very active, whimsical
and especially patient with novices.

### Downloading A Client

To connect to Freenode you will need a client.

You can download and install a client for your chosen operating
system. Some popular choices are listed below:

#### OS X
* http://colloquy.info/downloads.html

#### Windows, GNU/Linux
* http://xchat.org/download/

#### Windows, GNU/Linux, OS X
* http://www.pidgin.im/download/

#### Emacs
* http://www.emacswiki.org/ERC - ERC is included in GNU Emacs since v22.3

### Using Webchat

If you don't have the time or inclination to install a client, or if
you just need help right now now now, you can use the Freenode webchat
client which runs within your browser:

* http://webchat.freenode.net/?channels=#jquery

Once you have selected a nickname and connected to Freenode you should
be able to join #jQuery by entering `/join #jQuery`. Search your
client's documentation if this gives you any trouble.

## Etiquette

Unlike some *other* channels, #jQuery is quite welcoming and
friendly to newcomers, but we'd rather help you to help yourself than
do your work for you. Keep in mind that users on the channel are
volunteers who will happily find better things to do if you're rude or unable provide
sufficient information to allow them to assist you..

Here are some general points to help you get the most out of your #jQuery
experience.

* Google first, ask questions later. There's no need to waste a living
  breathing human's time when a solution to your problem is sitting on
  a page or forum somewhere waiting to enlighten you.

* Read the topic when you join. This will often contain useful links,
  versions and information about protocol and etiquette.

* Be patient. People are likely already involved in troubleshooting
  for other folks but will try to deal with your questions when they
  are able. You can repost your question periodically but don't be
  annoying about it.

* Keep investigating your issue while you wait for help -- and if you
  do find a solution let the channel know so people won't waste time
  solving it for you again.

* If you are asked more questions about your problem, answer them, even if they
  seem unrelated. It's not a quiz; someone is trying to get more information
  about the situation in order to work toward a solution, and they may
  recognize an issue as symptomatic of a common problem.

* If you can help someone else with their problem while waiting for
  help with your own, please do so! This is good karma and will win
  you the respect and admiration of your peers.

* Don't be mad. #jQuery is (amongst other things) a social channel.
  Patiently endure any unrelated nonsense you see there. Part of the
  charm of #jQuery is that it can be silly and fun. Embrace this.

* Stick around! Even when your immediate problem is solved, you may be
  able to help other people, or learn something you didn't know. Plus,
  the next time to you have a problem (and you will), you'll already
  be connected.

* Photographs. Famous plaid-clad people occasionally frequent #jQuery
  and most will be happy to pose for a photograph with you. Be
  respectful, say thank you and know when to leave them be.

## Asking Good Questions

The best way to get your issue resolved quickly is to get straight to
the point and explain the problem clearly with a reduced test case.

You don't need to ask if anyone is available or wants to help. Just
ask your question and they can get on with it.

A reduced test case is the minimum amount of code required to
reproduce your issue. If you link someone to 2000 lines of unrelated
HTML, CSS and Javascript, they're very likely to close the browser and
spend some quality time with their families instead.

Although it might seem like more work, creating a reduced test case
will often help you fix the problem yourself! And if not, someone
else has a much better chance of fixing things for you in the absence
of extraneous code.

Front-end problems have an advantage over server-side issues because
anyone with a web browser should be able to what's going wrong without
needing to install anything or mess around with databases or
filesystems.

We favour sites like http://jsfiddle.net/ and http://jsbin.com/ where
you can easily create and share a demo of your problem. Try to include
just enough code to reproduce and explain your problem. If you can
make it simple enough someone will usually be able to link you to an
updated version that solves your problem in a moment or two.

## Giving Good Answers

Good answers do at least two things: solve the issue AND educate. If
we can help you prevent these issues in the future, or fix them
yourself next time they arise, that leaves us free to help you with
more interesting problems in the future. If someone tries to explain
*how* and *why* their solution fixes your problem, pay attention
and you might just learn something.

Remember, you're answering a *real live actual person's* question, and your
goal should be to help them. Assume they're asking the question in good faith,
and don't mock or belittle them for not knowing. Some folks are easier to help
than others, and if at any given time you don't have the inclination to help
someone constructively, it's better to just not engage them at all. If you get exasperated
or busy, politely let them know that you can't assist them any longer.

Try to give relatively practical, feasible advice that is related to the
problem at hand. The following, for instance, is not helpful.

```
<john_doe> hi, i'm using wordpress and i'm having a problem with my jquery
<john_doe> nothing works and i'm getting a message that '$ is not defined'
<bad_example> WordPress sucks, rewrite your app in Rails
```

## Learning to Fish: Debugging

A lot of the times that someone comes in looking for support, it's not *really*
because their code isn't working (which it isn't). Instead, they're unfamiliar
with the debugging tools that make it possible to diagnose errors in code as it
executes. Armed only with `alert` statements and looking at their code
**hard**, it may not be surprising that they are struggling. If this sounds
like you &mdash; or the person you're helping &mdash; it's a good time to pause
and introduce them. Though debugging is an art not instantaneously learned,
beginning to acquire the skill as soon as possible is of the utmost importance
and can greatly cut down on future support needs for the individual.

One useful resource borne out of experience in the #jQuery channel is [Fixing
These jQuery](http://fixingthesejquery.com/), which is a presentation that
introduces basic concepts like how to open browser debugging tools, set
breakpoints, and inspect application state. If you haven't used these tools,
it's a good place to start.


## More Reading

Much has been written to advise you on how to get help and be helpful. 

* [Freenode: Catalysts](http://freenode.net/catalysts.shtml)

If you're finding yourself belittled, abused, banned or ignored you should read
one of these guides to help you work out where you're going wrong.

* [How To Ask Questions The Smart Way](http://www.catb.org/esr/faqs/smart-questions.html)
* [Help Vampires: A Spotter’s Guide](http://slash7.com/2006/12/22/vampires/)
