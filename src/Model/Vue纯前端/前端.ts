import { DemoPage } from './Component/DemoPage/Index'
import { MyButton } from './Component/MyButton/Index'
import { Electron上下文 } from '../通用模型/Electron上下文'
import { Aff } from '../../Package/Aff/Aff'
import { Debug } from '../../Package/Debug/Debug'
import { Vue } from '../../Package/Vue/Vue'

localStorage.debug = '*'

export default Aff.do()
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
      ),
    ),
  )
  .run((env) => Aff.提升Effect(new Vue([{ 路径: '/', 元素: env.p }], [], 'app').渲染()))
  .不带回调运行()
