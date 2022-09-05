// npm i electron@20.1.1
import { app, BrowserWindow, BrowserWindowConstructorOptions, ipcMain, IpcMainInvokeEvent } from 'electron'
import { Effect } from '../Effect/Effect'
import path from 'path'
import { Aff } from '../Aff/Aff'

export class Electron {
  constructor(
    private 配置: BrowserWindowConstructorOptions & {
      html路径: string
      不安全的暴露IPC?: boolean
      打开控制台?: boolean
    },
    private 事件: {
      事件名: string
      实现: (event: IpcMainInvokeEvent, ...args: any[]) => Aff<any>
    }[],
  ) {}
  启动(): Effect<null> {
    return new Effect(() => {
      var win: BrowserWindow
      var createWindow = () => {
        if (this.配置.不安全的暴露IPC) {
          win = new BrowserWindow({
            ...this.配置,
            webPreferences: {
              ...(this.配置.webPreferences || {}),
              contextIsolation: false,
              preload: path.resolve(__dirname, './Preload.js'),
            },
          })
          if (this.配置.打开控制台) {
            win.webContents.openDevTools()
          }
        } else {
          win = new BrowserWindow(this.配置)
        }
        win.loadFile(this.配置.html路径)
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

      for (var 事件 of this.事件) {
        ipcMain.handle(事件.事件名, async (e, ...a) => {
          return await 事件.实现(e, ...a).运行为Promise()
        })
      }

      return null
    })
  }
}
