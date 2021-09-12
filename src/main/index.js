import { app, BrowserWindow, Menu, session } from 'electron'
import fs from 'fs';
import pkg from '../../package.json'
import path from 'path';
import installExtenstion, {VUEJS_DEVTOOLS} from 'electron-devtools-installer';
import './ipc/ipcMain';
import { writeBaseGame } from './ipc/baseGame';
import os from 'os';
require('@electron/remote/main').initialize()

// set app name
app.name = pkg.productName
// to hide deprecation message
app.allowRendererProcessReuse = true

// disable electron warning
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = false

const gotTheLock = app.requestSingleInstanceLock()
const isDev = process.env.NODE_ENV === 'development'
const isDebug = process.argv.includes('--debug')
let mainWindow

var userDataPath = app.getPath("userData");
const projectFolderName = path.join(userDataPath, "eu4modeditor-projects");
if(!fs.existsSync(projectFolderName)){
  fs.mkdirSync(projectFolderName);
}
var optionsFileName = path.join(projectFolderName, "options.json");
var baseGameFileName = path.join(projectFolderName, "baseGame.json");
if(!fs.existsSync(optionsFileName)){
  fs.writeFileSync(optionsFileName, '{"eu4Path": "", "prettyPrint": "no"}');
} else{
  var options = JSON.parse(fs.readFileSync(optionsFileName));
  if(options.eu4Path && !fs.existsSync(baseGameFileName)){
    try{
      writeBaseGame(options.eu4Path);
    } catch{}
  }
}

// only allow single instance of application
if (!isDev) {
  if (gotTheLock) {
    app.on('second-instance', () => {
      // Someone tried to run a second instance, we should focus our window.
      if (mainWindow && mainWindow.isMinimized()) {
        mainWindow.restore()
      }
      mainWindow.focus()
    })
  } else {
    app.quit()
    process.exit(0)
  }
} else {
  // process.env.ELECTRON_ENABLE_LOGGING = true

  require('electron-debug')({
    showDevTools: false,
  })
}

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    backgroundColor: '#fff',
    width: 1500,
    height: 950,
    minWidth: 1200,
    minHeight: 900,
    // useContentSize: true,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: false,
      contextIsolation: false,
      webSecurity: false,
      enableRemoteModule:process.env != "production"
    },
    show: false,
  })

  // eslint-disable-next-line
  setMenu()

  // load root file/url
  if (isDev) {
    mainWindow.loadURL('http://localhost:9080')
  } else {
    mainWindow.loadFile(`${__dirname}/index.html`)

    global.__static = require('path')
      .join(__dirname, '/static')
      .replace(/\\/g, '\\\\')
  }

  // Show when loaded
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    mainWindow.focus()
  })

  mainWindow.on('closed', () => {
    console.log('\nApplication exiting...')
  })
}

app.on('ready', () => {
  createWindow()

  if (isDebug || isDev) {
    installExtenstion(VUEJS_DEVTOOLS)
    .then((name) => {
      console.log(`Added Extension:  ${name}`);
      const win = BrowserWindow.getFocusedWindow()
      if (win) {
        win.webContents.on('did-frame-finish-load', () => {
          win.webContents.once('devtools-opened', () => {
            win.webContents.focus()
          })
          // open electron debug
          console.log('Opening dev tools')
          win.webContents.openDevTools()
        })
      }
    })
    .catch((err) => console.log('An error occurred: ', err));
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

const sendMenuEvent = async (data) => {
  mainWindow.webContents.send('change-view', data)
}

const template = [
  {
    label: app.name,
    submenu: [
      {
        label: 'Home',
        accelerator: 'CommandOrControl+H',
        click() {
          sendMenuEvent({ route: '/' })
        },
      },
      { type: 'separator' },
      { role: 'minimize' },
      { role: 'togglefullscreen' },
      { type: 'separator' },
      { role: 'quit', accelerator: 'Alt+F4' },
    ],
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Get Help',
        role: 'help',
        accelerator: 'F1',
        click() {
          sendMenuEvent({ route: '/help' })
        },
      },
      {
        label: 'About',
        role: 'about',
        accelerator: 'CommandOrControl+A',
        click() {
          sendMenuEvent({ route: '/about' })
        },
      },
    ],
  },
]

function setMenu() {
  if (process.platform === 'darwin') {
    template.unshift({
      label: app.name,
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' },
      ],
    })

    template.push({
      role: 'window',
    })

    template.push({
      role: 'help',
    })

    template.push({ role: 'services' })
  }

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}
