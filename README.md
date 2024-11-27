Unfix.js
========

This script unfixes position:fixed and position:sticky elements so they
scroll with the rest of the page like a normal web*page*. Too many webpages
nowadays abuse these styles to make you stare at their website through a tiny
letterbox slit in between cookie popups, advertising and their
***giant obnoxious menubars***, and all just to satisfy their delusions of
being an app. You are not an app installed on my system, you are a *page* to
be *read!*

Being a userscript, this is compatible with eg. [greasemonkey] or
[violentmonkey] (I use the latter). So far it is tested only on Firefox, on
a variety of websites.

[greasemonkey]: https://www.greasespot.net
[violentmonkey]: https://violentmonkey.github.io

I remember when not being able to see what you were looking for through all
the menubars was a sign that your computer had serious malware. Now it's a
*feature*. I paid for the whole screen, I want to *use* the whole screen!

I don't even know javascript, I just got so mad at straining to see on a tiny
viewport despite having a perfectly good-sized screen that I learnt enough
javascript to make this work.


Why write/use yet another userscript?
-------------------------------------

There are other extensions and userscripts available to do something similar,
but they variously:

- Just don't work, for sometimes mysterious reasons
- Entirely destroy any elements with the offending style (tempting, but
  sometimes I do want to see the navbar, just **only at the top of the page**)
- Do the right thing initially but fail to account for scripts that inject
  new elements or alter existing ones after the extension/script is done
  checking (this is common with menubars that disappear when you scroll down
  and peer back in when you scroll up, so when scrolling around you have to
  over-scroll up, then scroll down a touch to nudge the menubar back in,
  ***agh***)

This one tries to Do the Right Thing&trade; reliably, without breaking or
losing any elements on a page. It still doesn't always work, but manages
~90% of the time.

--------------------------------------------------------------------------

As you may see, those interfering menubars and such make me very unhappy.
