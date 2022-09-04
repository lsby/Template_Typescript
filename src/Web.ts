import { DemoPage } from './Component/DemoPage/Index'
import { MyButton } from './Component/MyButton/Index'
import { Electron上下文 } from './Model/Electron上下文'
import { Aff } from './Package/Aff/Aff'
import { Debug } from './Package/Debug/Debug'
import { Vue } from './Package/Vue/Vue'

localStorage.debug = '*'

var app = new Electron上下文((ipcRenderer) =>
  Aff.do()
    .bind('D', () => Aff.pure(new Debug('App:Web')))
    .bind('按钮', () => Aff.pure(new MyButton()))
    .bind('p', (env) =>
      Aff.pure(
        new DemoPage(
          { 列表: ['a', 'b', 'c'], 按钮组件: env.按钮 },
          (old, a) =>
            new Aff(async () => ({
              ...old,
              列表: [...old.列表, a],
            })),
          () =>
            new Aff(async () => {
              var r = await ipcRenderer.invoke('测试事件', 'ping')
              env.D.log(r).运行()
              return null
            }),
        ),
      ),
    )
    .run((env) => Aff.提升Effect(new Vue([{ 路径: '/', 元素: env.p }], [], 'app').渲染())),
).运行()

app.不带回调运行().运行()
