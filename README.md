
RISE is an integrated scripting environment for students, educators, artists and game designers who want to learn JavaScript game design in a simple way.

See contributing.md for information on helping RISE grow!

*** creating the distribution from the repository ***
Note there are a couple patches below, before attempting to update any dependencies.

** MAC OS  or WINDOWS **
Verify that NPM is installed on your system  ( https://www.npmjs.com/get-npm )
Navigate to your clone of the repository in your terminal then run the following commands:
       npm install

Move the contents of the "/patch" folder to /electron_modules/ and let it overwrite.
Then from your terminal run:
       npm run dist   



 —————————————
  Change log
 —————————————
       0.3.0   
       	▪	Alpha code base completed July 2, 2020
       	▪	Node.js fs (file system) changed to fs-extra to allow for recursive folder changes.
       	▪	Interface fixes

       0.4.0
       	▪	New application icons
       	▪	Install Packages created for MAC and WIN
       	▪	Rise Example “Hello Rise” created.
       	▪	Examples Directory and several Hello World Examples created.


       1.0.0  - first public release to Github
       	▪	Working Directory operations more intuitive   
       	▪	README.md, Contributing.md created  
       	▪	Files cleaned and packaged for distribution

       Future …

       	▪	ADD templates:  MelonJS, EaselJS
        ▪ simplify Start Screen interface for Template selection
       	▪	save prompt on exit - to prevent accidental closing
       	▪	Command +/- style should be more consistent or limited at extreme sizes
       	▪	User Settings could be implemented ( runWindow H & W etc..)
       	▪	Potential for additional script editor tabs and multi file projects
       	▪	RiseEngine —a fantasy game console library to work with Rise!
       	▪
