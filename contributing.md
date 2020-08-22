
I'm very happy to accept contributions to RISE, as it is intended to be a tool for a wide user-base of students, teachers, artists, and designers. Be aware that the base concept is on simple entry into learning JavaScript. I would like to privilege simplicity over features in any design change.

The program is based on Electron and MANY other fabulous libraries. As such, there are a lot of parts to learn.

*** creating the distribution from the repository ***
Note there are a couple patches below, before attempting to update any dependencies.

** MAC OS  or WINDOWS **
Verify that NPM is installed on your system  ( https://www.npmjs.com/get-npm )
Navigate to your clone of the repository in your terminal then run the following commands:
       npm install
       npm install electron-builder

Move the contents of the "/patch" folder to /electron_modules/ and let it overwrite.
Then from your terminal run:
       npm run dist   



*** Frameworks & Libraries Used in RISE ***
Electron
Node
Ace
Milligram CSS
Normalize CSS
Hotkeys
Roboto Font
Electron-Builder

*** Licensing Practice ***
MIT or MIT Compatible


*** Code Style and Conventions ***
Coding Style is recommended here for ease in collaboration and introduction to common practices used in the code base.
Reference should be cited where practical, to facilitate entry for newer programmers or contributors.

To Be Determined ...


***  Current Patches to Dependencies ***
https://github.com/p-sam/electron-prompt is currently being used, and needs some manual changes.
It should probably eventually be replaced by the system used for Alerts in RISE.

-------------
Line 29 :  in node_modules>electron>prompt>lib>index.js
from
  icon: null,
>to>  
  icon: false,
------------
  css rebuilt at node_modules>electron>prompt>lib>page>prompt.css
____________
