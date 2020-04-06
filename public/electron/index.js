// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

const env = process.env.NODE_ENV
console.log(env, 'env')

function createWindow () {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true, // 是否集成 node
            // preload: path.join(__dirname, './preload.js')
        }
    })

    // and load the index.html of the app.
    const loadURL = env ==='development' ? 'http://localhost:3000' : url.format({
        protocol: 'file',
        slashes: true,
        pathname: require('path').join(__dirname, '../index.html')
    })

    mainWindow.loadURL(loadURL).then(res=> {
        // console.log(res, 'loadFile res')
    }).catch(err=> {
        console.log(err, 'loadFile catch')
    })

    if(env ==='development') {
        mainWindow.webContents.openDevTools()
        // Enable live reload for Electron too
        require('electron-reload')(['../../src', './index.js'], {
            // Note that the path to electron may vary according to the main file
            electron: require(`electron`), // 第一个参数需先设__dirname 全部更新，相当于手动执行 electron .
            // ignored: ['preload.js'], // not work with __dirname
            // useFsEvents: false,
            // persistent: true,
            // forceHardReset: false,
        })
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
