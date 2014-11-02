# FTL prof.sav save/reload for asm.js version

This script provides a simple way to save and restore your FTL profile
(prof.sav) file when you are running the browser based (asm.js) version from
humblebundle.com.

The script adds to buttons to your humblebundle product page, one to download
the prof.sav file, and another to restore it. This is compatible with the
regular versions of FTL, meaning you can transfer profiles between computers
and versions of the game.

## Install instructions

Note: the script has only been tested with Chrome so far, although it may work
with firefox (and greasemonkey instead of tampermonkey).

### Method 1: User script/Tampermonkey

* Install [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
  from the google chrome web store
* Download the 'raw' version of the script from github:
  <https://github.com/mivok/ftl-browser-prof-sav/raw/master/ftl_prof_sav.user.js>
* Go to <https://www.humblebundle.com/home> and you should see two new buttons
  at the top.

### Method 2: Copy/paste

If you are uncomfortable installing Tampermonkey, or this is just a one-off
save/restore, you can use the following alternate method. Note that this
requires you to be somewhat familiar with the browser dev tools and javascript
in general. If you want a one-click option, use the tampermonkey method.

* View the script's source code:
  https://github.com/mivok/ftl-browser-prof-sav/blob/master/ftl_prof_sav.user.js
* Highlight it all and copy to the clipboard
* Go to <https://www.humblebundle.com/home>
* Open up the javascript console (Ctrl-Alt-J or Cmd-Option-J)
* Paste the script into the console and press enter
* The buttons should appear instantly
