import { IpcRenderer } from 'electron'
import { Aff } from '../../Package/Aff/Aff'
import { 延时 } from '../../Package/Aff/延时'

export class Electron上下文 {
  constructor(private 函数: (a: IpcRenderer) => Aff<null>) {}
  运行(): Aff<null> {
    return new 延时(0).转换到Aff().bind((_) => this.函数(window.ipcRenderer))
  }
}
