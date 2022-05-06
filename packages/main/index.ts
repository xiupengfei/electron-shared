import { app, BrowserWindow, shell, ipcMain } from 'electron'
import { release } from 'os'
import { join } from 'path'
const remoteMain = require('@electron/remote/main')

// 禁用Windows 7的GPU加速
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// 设置Windows 10+通知的应用程序名称

if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null

;(global as any).sharedObject = {
  async: new Map(),
}

async function createWindow() {
  win = new BrowserWindow({
    title: 'Main window',
    webPreferences: {
      // preload: join(__dirname, '../preload/index.cjs'),
      nodeIntegration: true,
      contextIsolation: false,
      // enableRemoteModule: true
    },
  })

  // const hideWin = new BrowserWindow({
  //   title: 'Hide Win',
  //   frame: false,
  //   webPreferences: {
  //     // preload: join(__dirname, '../preload/index.cjs'),
  //     nodeIntegration: true,
  //     contextIsolation: false,
  //     // enableRemoteModule: true
  //   },
  // })

  // 应用程序已打包， 生产环境
  if (app.isPackaged) {
    win.loadFile(join(__dirname, '../renderer/index.html'))
  } else {
    // 🚧 Use ['ENV_NAME'] avoid vite:define plugin
    const url = `http://127.0.0.1:${process.env['VITE_DEV_SERVER_PORT']}`

    win.loadURL(url)
  }
  win.webContents.openDevTools()

  // Test active push message to Renderer-process
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('mounted', new Date().toLocaleString())
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })
  // require('@electron/remote/main').initialize()
  // require("@electron/remote/main").enable(mainWindow.webContents)
  remoteMain.initialize()
  remoteMain.enable(win.webContents)
  ipcMain.on('test-r', () => {
    setTimeout(() => {
      ;(global as any).sharedObject.async.set('local', 'xxxxx')
    }, 100)
    // console.log('-----shoudao', (global as any).sharedObject)
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})
