//******************** Alert Box Warning Strings **********************

const directoryExistsWarning = '<p>The chosen directory already exists.<br>No new project was created.</p>'+
    '<p>Please choose a different Project Folder Name.</p>'

const saveFileErrorWarning = '<p>An error occurred updating the project:</p>'+
    '<p>Save the project to new folder to preserve your current work.</p>'

const fileSavedWarning ='<p>The current project has been saved and closed.</p>'

//***************** Plain JS template code ( 2 files) *******************
const PlainTemplateHtmlContent = '<!DOCTYPE HTML>\n' +
    '<html lang="en">\n' +
    '    <head>\n' +
    '       <meta charset="UTF-8">\n' +
    '    </head>\n' +
    '   <body>\n' +
    '      <script src="main.js"></script>\n' +
    '   </body>\n' +
    '</html>'

const PlainTemplateJsContent = 'console.log(\'Your Script starts here!\');'

//***************** canvas template code ( 2 files) *******************
const CanvasTemplateHtmlContent = '<!DOCTYPE HTML>\n' +
    '<html lang="en">\n' +
    '    <head>\n' +
    '       <meta charset="UTF-8">\n' +
    '       <style>\n' +
    '           canvas {\n' +
    '               border:1px solid #d3d3d3;\n' +
    '               background-color: #f1f1f1;\n' +
    '           }\n' +
    '       </style>\n' +
    '    </head>\n' +
    '   <body onload="startGame()">\n' +
    '      <script src="main.js"></script>\n' +
    '   </body>\n' +
    '\n' +
    '</html>';

const CanvasTemplateJsContent = 'function startGame() {\n' +
    '    myGameArea.start();\n' +
    '}\n' +
    '\n' +
    'var myGameArea = {\n' +
    '    canvas : document.createElement("canvas"),\n' +
    '    start : function() {\n' +
    '        this.canvas.width = 800;\n' +
    '        this.canvas.height = 600;\n' +
    '        this.context = this.canvas.getContext("2d");\n' +
    '        document.body.insertBefore(this.canvas, document.body.childNodes[0]);\n' +
    '    }\n' +
    '};';

//***************** Phaser template code ( 2 files) *******************
const PhaserTemplateHtmlContent = '<!DOCTYPE html>\n' +
    '<html lang="en">\n' +
    '    <head>\n' +
    '        <meta charset="UTF-8">\n' +
    '        <title>Phaser Game</title>\n' +
    '        <script src="https://cdn.jsdelivr.net/npm/phaser@3.16.2/dist/phaser.min.js"></script>\n' +
    '    </head>\n' +
    '    <body>\n' +
    '        <script src="main.js"></script>\n' +
    '    </body>\n' +
    '\n' +
    '</html>'

const PhaserTemplateJsContent = 'var game = new Phaser.Game(800, 600, Phaser.AUTO, \'\', { preload: preload, create: create, update: update, render: render });\n' +
    '\n' +
    'function preload() {\n' +
    '\n' +
    '}\n' +
    '\n' +
    'function create() {\n' +
    '\n' +
    '}\n' +
    '\n' +
    'function update() {\n' +
    '\n' +
    '}\n' +
    '\n' +
    'function render() {\n' +
    '\n' +
    '}'


//***************** PixiJS template code ( 2 files) *******************
const PixiTemplateHtmlContent = '<!DOCTYPE html>\n' +
    '<html lang="en">\n' +
    '    <head>\n' +
    '        <meta charset="UTF-8">\n' +
    '        <title>Phaser Game</title>\n' +
    '        <script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/5.1.3/pixi.min.js"></script>\n' +
    '    </head>\n' +
    '    <body>\n' +
    '        <script src="main.js"></script>\n' +
    '    </body>\n' +
    '\n' +
    '</html>'

const PixiTemplateJsContent = 'let type = "WebGL"\n' +
    'if(!PIXI.utils.isWebGLSupported()){\n' +
    '  type = "canvas"\n' +
    '}\n' +
    '\n' +
    'var app = new PIXI.Application(640, 360);\n' +
    'document.body.appendChild(app.view);'