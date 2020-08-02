const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;
let addWindow;

//listen for app to be ready
app.on('ready', function(){

    //create new window 
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });
    //load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    //quit app when closed 
    mainWindow.on('closed', function(){
        app.quit();
    });

    
    //the code up is design for passing the directory and the html file to loadURL

    //Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
    // Insert menu 
    Menu.setApplicationMenu(mainMenu);
});

// handle create add window
function CreateAddWindow(){
    //create new window 
    addWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 300,
        height: 200,
        title:'Add Shopping List Item'
    });
    //load html into window
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    // Garbage collection handle
    addWindow.on('close', function(){
        addWindow = null;
    })

}

// Create menu template 
const mainMenuTemplate =  [
    {
        label: 'File',
        submenu: [
            {
                label: 'Add Item',
                click(){
                    CreateAddWindow();
                }
            },
            {
                label: ' Clear Items'
            },
            {
                label: 'Quit',
                // ? = e como se fosse um than e ,: = é como se fosse else
                accelerator: process.platform == 'darwin' ? 'Command+Q' :
                'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }

];

// if mac, add empty object to menu 
//unshift is an array method 
if (process.platform == 'darwin') {
    mainMenuTemplate.unshift({});
}

// add dev tools item if not in prod
if (process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' :
                'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();

                }
                
            },
            {
                role: 'reload'
            }
        ]
    })
    
}