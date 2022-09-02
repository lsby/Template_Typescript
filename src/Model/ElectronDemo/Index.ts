import { IpcRenderer } from 'electron'
import { ElectronTestPage } from '../../Component/ElectronTestPage/Index'
import { Aff } from '../../Package/Aff/Aff'
import { Effect } from '../../Package/Effect/Effect'
import { Vue } from '../../Package/Vue/Vue'

declare global {
  interface Window {
    ipcRenderer: IpcRenderer
  }
}

var main = Effect.do()
  .bind('p', () =>
    Effect.pure(
      new ElectronTestPage(
        () =>
          new Aff(async () => {
            var r = await window.ipcRenderer.invoke('测试事件', 'ping')
            console.log(r)
            return {}
          }),
      ),
    ),
  )
  .run((env) => new Vue([{ 路径: '/', 模板: env.p }], [], 'app').渲染())
export var ElectronDemo = main
