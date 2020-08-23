

const electron = require('electron');
const BrowserWindow = electron.remote.BrowserWindow;

//remote will be deprecated in Electron 10!
const app = electron.remote.app;
const dialog = electron.remote.dialog; // Load OS dialogs
const fs = new require('fs-extra'); //Load file system component
const { shell } = window.require('electron');
const prompt = new require('electron-prompt'); //add-on used for Project name prompt
const path = require('path'); // for file paths

let runWindow;      //starts null, as clicking the run-project button (or hotkeys) check for an existing window (not null) before creating a new one.
let consoleActive = false;  //DevTools on/off switch for user runWindow
let projectPath = app.getPath('documents')+'/rise';   //holds project file path for all file I/O
let storageDirectory = app.getPath('documents');  //holds location path of project folder
let saveProject = false;  //used to check if project needs to be saved when closing

//editor settings
const editorhtml = ace.edit("editor-html");
editorhtml.setTheme("ace/theme/terminal");  // set custom style
editorhtml.session.setMode("ace/mode/html");
editorhtml.setShowPrintMargin(false);
editorhtml.getSession().on('change', function() {
    saveNeeded(true);
});

const editorjs = ace.edit("editor-js");
editorjs.setTheme("ace/theme/terminal");  // set custom style
editorjs.session.setMode("ace/mode/javascript");
editorjs.setShowPrintMargin(false);
editorjs.getSession().on('change', function() {
    saveNeeded(true);
});


/* ++++++++++++++++++++++++++  start-up screen ++++++++++++++++++++++++++ */
function newFromTemplate(HTMLContent,JSContent){
    prompt({
        title: 'Save As New Project',
        label: 'New Project Folder Name',
        value: 'DefaultProject',
        type: 'input'
    })
        .then((projectDirectory) => {
            if(projectDirectory === null) {
                //return;
            } else {
                dialog.showOpenDialog({defaultPath :storageDirectory, properties: ['openDirectory']
                }).then ((data) => {
                    if(data.canceled) {
                        return; //discontinue if user cancels dialog
                    }
                    storageDirectory = String(data.filePaths);
                    projectPath = data.filePaths+'/'+projectDirectory;
                    if (fs.existsSync(projectPath)){   //<------ check for existing directory
                        displayAlert(directoryExistsWarning);
                    } else {
                        fs.mkdirSync(projectPath);    //create new project folder
                        let assetsFolderPath = String(projectPath + '/assets');
                        fs.mkdirSync(assetsFolderPath);  //create assets folder
                        /* update footer */
                        document.getElementById("info-footer").innerHTML = 'Project Folder: ' + projectPath;
                        editorhtml.setValue(HTMLContent, -1);  //from templates.js
                        editorjs.setValue(JSContent, -1); //from templates.js
                        saveFile();  //save editors to new project folder
                        document.getElementById('start-screen').style.display = "none";
                    }
                });
            }
        }).catch(console.error);
}

// Logo links to help web page
document.getElementById('project-logo').onclick = function () {
    shell.openExternal('https://straytech.github.io/RISE/index.html');  //replace with permanent help page <========
}

// Logo needs mouseover cursor change
document.getElementById('project-logo').style.cursor = "pointer";

/* create new Plain JS project */
document.getElementById('start-plain-project').onclick = function () {
    newFromTemplate(PlainTemplateHtmlContent, PlainTemplateJsContent);
};

/* create new Canvas project */
document.getElementById('start-canvas-project').onclick = function () {
    newFromTemplate(CanvasTemplateHtmlContent,CanvasTemplateJsContent);
};

/* create new Phaser project */
document.getElementById('start-phaser-project').onclick = function () {
    newFromTemplate(PhaserTemplateHtmlContent, PhaserTemplateJsContent);
};

/* create new PixiJS project */
document.getElementById('start-pixi-project').onclick = function () {
    newFromTemplate(PixiTemplateHtmlContent, PixiTemplateJsContent);
};

// Open existing project and get file content to editor tabs
document.getElementById('open-existing-project').onclick = function () {
    dialog.showOpenDialog({defaultPath: storageDirectory, properties: ['openDirectory']
    }).then((data) => {
        if(data.canceled) {
            return; //discontinue if user cancels dialog
        }
        //get projectPath & storageDirectory
        projectPath = data.filePaths;
        storageDirectory = String(projectPath).substring(0, String(projectPath).lastIndexOf(path.sep)+1);

        /* update footer */
        document.getElementById("info-footer").innerHTML = 'Project Folder: '+ projectPath;
        /* read files to editors */

        const jsContent = fs.readFileSync(projectPath+'/main.js', 'utf-8');
        editorjs.setValue(jsContent,1); //write to index.html tab with cursor position
        editorjs.renderer.updateFull(true); //refreshes if tab is hidden

        const htmlContent = fs.readFileSync(projectPath+'/index.html', 'utf-8');
        editorhtml.setValue(htmlContent,1); //write to index.html tab with cursor position
        editorhtml.renderer.updateFull(true); //refreshes if tab is hidden

        // Err Check for null content in htmlContent and jsContent <=================
        document.getElementById('start-screen').style.display = "none";
        saveNeeded(false);
    });
};
/* -------------------------- END SECTION: start-up screen -------------------------- */


/* ++++++++++++++++++++++++++ Settings Screen Fields & Buttons ++++++++++++++++++++++++++ */
document.getElementById('confirm-settings-btn').onclick = function () {
    document.getElementById('settings-screen').style.display = "none";
}
/* -------------------------- Settings Screen Fields & Buttons -------------------------- */

/* ++++++++++++++++++++++++++  Alert Box ++++++++++++++++++++++++++ */
function displayAlert(text){
    document.getElementById('alert-screen').style.display = "initial";
    document.getElementById('alert-text').innerHTML = text;
}

document.getElementById('confirm-alert-btn').onclick = function () {
    document.getElementById('alert-screen').style.display = "none";
}
/* -------------------------- END SECTION: Alert Box -------------------------- */


/* ++++++++++++++++++++++++++  editor tabs ++++++++++++++++++++++++++ */
// Function for onclick editor tabs (direct in index.html)------------------
document.getElementById('editor-js-btn').addEventListener("click", function() {
    let i, tabContent;
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }
    document.getElementById('editor-js-btn').classList.add("toggled");
    document.getElementById('editor-html-btn').classList.remove("toggled");
    document.getElementById('editor-js').style.display = "block";
});

document.getElementById('editor-html-btn').addEventListener("click", function() {
    let i, tabContent;
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }
    document.getElementById('editor-html-btn').classList.add("toggled");
    document.getElementById('editor-js-btn').classList.remove("toggled");
    document.getElementById('editor-html').style.display = "block";
});
/* -------------------------- END SECTION: Editor Tabs -------------------------- */


/* ++++++++++++++++++++++++++  Listeners for Tool Tips ++++++++++++++++++++++++++ */
document.getElementById('save-file-btn').addEventListener("mouseover", function() {
    document.getElementById("tool-tip").innerHTML = 'Save Project (CTRL-S/CMD-S) ';
});
document.getElementById('save-file-btn').addEventListener("mouseleave", function() {
    document.getElementById("tool-tip").innerHTML = ' ';
});

document.getElementById('save-file-as-btn').addEventListener("mouseover", function() {
    document.getElementById("tool-tip").innerHTML = 'Save Project To New Folder ';
});
document.getElementById('save-file-as-btn').addEventListener("mouseleave", function() {
    document.getElementById("tool-tip").innerHTML = ' ';
});

document.getElementById('open-new-btn').addEventListener("mouseover", function() {
    document.getElementById("tool-tip").innerHTML = 'Open New Project ';
});
document.getElementById('open-new-btn').addEventListener("mouseleave", function() {
    document.getElementById("tool-tip").innerHTML = ' ';
});

document.getElementById('settings-btn').addEventListener("mouseover", function() {
    document.getElementById("tool-tip").innerHTML = 'Settings ';
});
document.getElementById('settings-btn').addEventListener("mouseleave", function() {
    document.getElementById("tool-tip").innerHTML = ' ';
});

document.getElementById('help-btn').addEventListener("mouseover", function() {
    document.getElementById("tool-tip").innerHTML = 'Help ';
});
document.getElementById('help-btn').addEventListener("mouseleave", function() {
    document.getElementById("tool-tip").innerHTML = ' ';
});

document.getElementById('run-project').addEventListener("mouseover", function() {
    document.getElementById("tool-tip").innerHTML = 'View Project in Browser (CTRL-1/CMD-1)';
});
document.getElementById('run-project').addEventListener("mouseleave", function() {
    document.getElementById("tool-tip").innerHTML = ' ';
});

document.getElementById('console-btn').addEventListener("mouseover", function() {
    document.getElementById("tool-tip").innerHTML = 'Toggle Console in View Window ';
});
document.getElementById('console-btn').addEventListener("mouseleave", function() {
    document.getElementById("tool-tip").innerHTML = ' ';
});

/* --------------------------  END SECTION: Listeners for Tool Tips  -------------------------- */


/* ++++++++++++++++++++++++++ Top Buttons ++++++++++++++++++++++++++ */
//file  i/o -----------------------------------------------------------------

//   Save current Project   (ctrl-S ) also auto-happens before RUN
function saveFile(){
    fs.writeFileSync(projectPath+'/index.html', editorhtml.getValue());
    fs.writeFileSync(projectPath+'/main.js', editorjs.getValue());
    saveNeeded(false);
}

// highlights save button when editors are changed without saved project.
function saveNeeded(saveNeededState){
    if(saveNeededState){
        document.getElementById('save-file-btn').classList.add("toggled");
        saveProject=true;
    }else{
        document.getElementById('save-file-btn').classList.remove("toggled");
        saveProject=false;
    }
}


document.getElementById('save-file-btn').onclick = function () {
    saveFile();
}
 /* hotkeys are handled separately when the editor tabs have context*/
hotkeys('ctrl+s,cmd+s', function (){ //
    saveFile();
});

//   Save as...    to new directory location
document.getElementById('save-file-as-btn').onclick = function () {
    prompt({
        title: 'Save As New Project',
        label: 'New Project Folder Name',
        value: 'DefaultProject',
        type: 'input'
    })
        .then((projectDirectory) => {
            if(projectDirectory === null) {
                //return
            } else {
                dialog.showOpenDialog({defaultPath :storageDirectory,  properties: ['openDirectory']
                }).then ((data) => {
                    if(data.canceled) {
                        return; //discontinue if user cancels dialog
                    }
                    let oldProjectPath = String(projectPath); //save old path for copy command
                    storageDirectory = String(data.filePaths);
                    projectPath = data.filePaths + '/' + projectDirectory;
                    if (fs.existsSync(projectPath)) {
                        displayAlert(directoryExistsWarning);
                    } else {
                        fs.mkdirSync(projectPath);    //create new project folder
                        /* update footer */
                        document.getElementById("info-footer").innerHTML = 'Project Folder: ' + projectPath;
                        //saveFile();  //save editors to new project folder
                        fs.copySync(oldProjectPath, projectPath); //recursively includes folders and assets
                        document.getElementById('start-screen').style.display = "none";
                    }

                });
            }
        }).catch(console.error);
}

//open new file (save project and revert to start-up screen)
document.getElementById('open-new-btn').onclick = function () {
    if(saveProject === true) {
        saveFile();
        displayAlert(fileSavedWarning);
    }
    document.getElementById('start-screen').style.display = "initial";
}

// Open Settings Screen
document.getElementById('settings-btn').onclick = function () {
    document.getElementById('settings-screen').style.display = "initial";
}

// Help Button
document.getElementById('help-btn').onclick = function () {
    shell.openExternal('https://straytech.github.io/RISE/begin.html');  //replace with permanent help page
}

// user's runWindow
function createRunWindow () {
    // Create the browser window.
    runWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        x: (screen.width - 1024)/2 + 20,
        y: (screen.height - 768)/2 + 20,
        title: 'Rise',
        preload: `${__dirname}/preload.js`,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false
        }
    })
    // and load the index.html of the app.
    runWindow.loadFile(projectPath + '/index.html')

    if (consoleActive) {
        // Open the DevTools.
        runWindow.webContents.openDevTools()
    }
}

function runProject(){
    saveFile();
    if(runWindow == null ){
        createRunWindow();
    }else {
        if (!runWindow.closed || !runWindow.destroyed) {
            runWindow.destroy();
            createRunWindow();
        }
    }
}

document.getElementById('run-project').onclick = function () {
    runProject();
}

hotkeys('ctrl+1,cmd+1', function () {
    runProject();
});

document.getElementById('console-btn').onclick = function () {
    consoleActive = !consoleActive;  //toggle DevTools on user runWindow
    if (consoleActive){
        //add active class
        document.getElementById('console-btn').classList.add("toggled");
    }else{
        //remove active class
        document.getElementById('console-btn').classList.remove("toggled");
    }
}
/* -------------------------- END SECTION: Top Buttons -------------------------- */


/* ++++++++++++++++++++++++++  Footer ++++++++++++++++++++++++++ */
    /* update footer */
    document.getElementById("info-footer").innerHTML = 'Project Folder: '+ projectPath;
/* -------------------------- END SECTION: End Footer -------------------------- */


/* ++++++++++++++++++++++++++  Hotkeys in Editor Tabs ++++++++++++++++++++++++++ */
/* these bindings only work in the editor contexts. These duplicate program-wide hotkeys throughout code */
editorjs.commands.addCommand({
    name: "saveProject",
    bindKey: { win: "Ctrl-S", mac: "Command-S" },
    exec: function () {
        saveFile();
    }
});
editorhtml.commands.addCommand({
    name: "saveProject",
    bindKey: { win: "Ctrl-S", mac: "Command-S" },
    exec: function () {
        saveFile();
    }
});
editorjs.commands.addCommand({
    name: "runProject",
    bindKey: { win: "Ctrl-1", mac: "Command-1" },
    exec: function () {
        runProject();
    }
});
editorhtml.commands.addCommand({
    name: "runProject",
    bindKey: { win: "Ctrl-1", mac: "Command-1" },
    exec: function () {
        runProject();
    }
});

/* -------------------------- END SECTION: Hotkeys in Editor Tabs  -------------------------- */




/* This may be needed to prevent window refresh on release.. CMD +/- are still preserved
*  so disabling chrome menu is not a perfect solution
* */
/*
window.addEventListener('beforeunload', (ev) => {
      // Setting any value other than undefined here will prevent the window
      // from closing or reloading
      ev.returnValue = true;
    });
 */
