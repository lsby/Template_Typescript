import { app, BrowserWindow, BrowserWindowConstructorOptions, ipcMain, IpcMainInvokeEvent } from 'electron'
import path from 'path'
import { Aff, run } from '../Aff/Aff'

export type 配置 = BrowserWindowConstructorOptions & {
  html路径: string
  不安全的暴露IPC?: boolean
  打开控制台?: boolean
}
export type 事件 = {
  事件名: string
  实现: (event: IpcMainInvokeEvent, ...args: any[]) => Aff<any>
}

const _配置: unique symbol = Symbol()
const _事件们: unique symbol = Symbol()
export type Electron = {
  [_配置]: 配置
  [_事件们]: 事件[]
}

export function Electron(配置: 配置, 事件们: 事件[]): Electron {
  return {
    [_配置]: 配置,
    [_事件们]: 事件们,
  }
}

export function 运行(a: Electron): Aff<void> {
  return Aff(async () => {
    var win: BrowserWindow
    var createWindow = () => {
      if (a[_配置].不安全的暴露IPC) {
        win = new BrowserWindow({
          ...a[_配置],
          webPreferences: {
            ...(a[_配置].webPreferences || {}),
            contextIsolation: false,
            preload: path.resolve(__dirname, './Preload.js'),
          },
        })
        if (a[_配置].打开控制台) {
          win.webContents.openDevTools()
        }
      } else {
        win = new BrowserWindow(a[_配置])
      }
      win.loadFile(a[_配置].html路径)
    }
    app.whenReady().then(() => {
      createWindow()
      app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
      })
    })
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') app.quit()
    })

    for (var 事件 of a[_事件们]) {
      ipcMain.handle(事件.事件名, async (e, ...a) => {
        return await run(事件.实现(e, ...a))
      })
    }
  })
}
