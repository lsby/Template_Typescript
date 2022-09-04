import { IpcRenderer } from 'electron'
import { DemoPage } from './Component/DemoPage/Index'
import { MyButton } from './Component/MyButton/Index'
import { Aff } from './Package/Aff/Aff'
import { Debug } from './Package/Debug/Debug'
import { Effect } from './Package/Effect/Effect'
import { Vue } from './Package/Vue/Vue'
import { Vue组件 } from './Package/Vue/Vue组件'

localStorage.debug = '*'

declare global {
  interface Window {
    ipcRenderer: IpcRenderer
  }
}

var app = Effect.do()
  .bind('D', () => Effect.pure(new Debug('App:Web')))
  .bind('按钮', () => Effect.pure(new Vue组件(new MyButton())))
  .bind('p', (env) =>
    Effect.pure(
      new DemoPage(
        { 列表: ['a', 'b', 'c'], 按钮组件: env.按钮 },
        (old, a) =>
          new Aff(async () => ({
            ...old,
            列表: [...old.列表, a],
          })),
        () =>
          new Aff(async () => {
            var r = await window.ipcRenderer.invoke('测试事件', 'ping')
            env.D.log(r).运行()
            return null
          }),
      ),
    ),
  )
  .run((env) => new Vue([{ 路径: '/', 模板: env.p }], [], 'app').渲染())

app.运行()
