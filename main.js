/*
Steps for creating Electron applications:
-----------------------------------------
Go to an empty project folder in the terminal.
Initialize git.
Initialize npm to create the package.json file ('npm init').
Install electron in the project directory ('npm install --save electron').
Go to package.json and change the 'test' thingy in the scripts block.
  -Change it to "start": "electron .".
*/

const electron = require('electron'); // Importing electron...

// These two are NodeJS modules
const url  = require('url');
const path = require('path');

// Grabbing stuff from electron...
const {app, BrowserWindow, Menu} = electron;

let MainWindow; // This is the variable for the main window
let AddCalcWindow; // This represents the Calculator window

// Listen for the app to be ready... Then run the main function.
app.on('ready', function() {
  // Create new window:
  MainWindow = new BrowserWindow({}); // The curly braces just mean I'm passing in an empty object
  //Load HTML file into the new window
  MainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'MainWindow.html'), //__dirname is an object that just points to the current directory
    protocol: 'file:',
    slashes: true
  })); // I know this part is confusing... Just try to understand it as much as you can -- Justin from the past
       //All this is doing is passing 'file://MainWindow.html' into loadURL()

  // Quit app when closed
  MainWindow.on('closed', function() {
    app.quit();
  })

  // Override the default menu with the template I made below...
  const MainMenu = Menu.buildFromTemplate(MainMenuTemplate);
  // And finally... It's time to insert the menu into the application:
  Menu.setApplicationMenu(MainMenu);
});

function CreateCalculatorWindow() {
  AddCalcWindow = new BrowserWindow({
    width: 500,
    height: 700,
    title: 'Jayhub - Calculator'
  });
  //Load HTML file into the new window
  AddCalcWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'applets/calculator/calc.html'), //__dirname is an object that just points to the current directory
    protocol: 'file:',
    slashes: true
  }));
  // Garbage collection: When the calculator window is closed, set AddCalcWindow to null so it stops taking up memory
  AddCalcWindow.on('close', function() {
    AddCalcWindow = null;
  })
}

// Override the default menu by creating what's called a 'menu template'
const MainMenuTemplate = [
  {
    label: 'Home',
    accelerator: process.platform == 'darwin' ? 'Command+H' : "Ctrl+H", // This is  me adding a keyboard shortcut.
    // Darwin means that you are on a mac, and if you aren't on a mac then the shortcut is Ctrl+H.
    click() {
      MainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'MainWindow.html'), //__dirname is an object that just points to the current directory
        protocol: 'file:',
        slashes: true
      }));
    }
  },
  {
    label: 'News',
    submenu: [
      {
        label: 'Drudge Report',
        click() {
          MainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'applets/newsroom/drudge.html'), //__dirname is an object that just points to the current directory
            protocol: 'file:',
            slashes: true
          }));
        }
      },
      {
        label: 'Infowars',
        click() {
          MainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'applets/newsroom/infowars.html'), //__dirname is an object that just points to the current directory
            protocol: 'file:',
            slashes: true
          }));
        }
      }
    ]
  },
  {
    label: 'Notes',
    click() {
      MainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'applets/notes/notes.html'), //__dirname is an object that just points to the current directory
        protocol: 'file:',
        slashes: true
      }));
    }
  },
  {
    label: 'Calculator',
    click() {
      CreateCalculatorWindow();
    }
  },
  {
    label: 'Options',
    click() {
      MainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'applets/options/options.html'), //__dirname is an object that just points to the current directory
        protocol: 'file:',
        slashes: true
      }));
    }
  }
]; // (Menus are represented as arrays of objects)

// If the user is running this on a mac, prepend an empty object to the menu to get rid of the 'Electron' menu item:
if(process.platform == 'darwin') {
  MainMenuTemplate.unshift({}); // The unshift method is an array method that adds things to the beginning of an array.
  /* If I just simply added an empty object to MainMenuTemplate, then there would be a little space before the first
  menu item, and I don't want that to happen. That is why I made this if statement. */
}

// To package an electon app: (cd to the project directory)
// npm i electron-packager --save-dev

// If some files are too large to upload to github, use the package git-lfs: https://git-lfs.github.com/
// Cd to the project directory and run ' git lfs install '
// Use LFS to track the large files by running ' git lfs track "filename" '
// Run this. (I don't know what this does, but it's necessary): git add .gitattributes
// Now you should be able to push everything to Github.

// Following along @ https://www.youtube.com/watch?v=kN1Czs0m1SU&index=2&list=PLxB_N285sdG8h8z9USe0o3alxVOkBBXAx&t=847s
