import { DemoPage } from './Component/DemoPage/Index'
import { Electron上下文 } from '../通用模型/Electron上下文'
import { Aff } from '../../Package/Aff/Aff'
import { Debug } from '../../Package/Debug/Debug'
import { Vue } from '../../Package/Vue/Vue'

localStorage.debug = '*'

export default new Electron上下文((ipcRenderer) =>
  Aff.do()
    .bind('D', () => Aff.pure(new Debug('App:Web')))
    .bind('p', (env) =>
      Aff.pure(
        new DemoPage(
          {},
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
)
  .运行()
  .不带回调运行()
