import { Aff } from '../../Package/Aff/Aff'
import { Debug } from '../../Package/Debug/Debug'
import { Vue } from '../../Package/Vue/Vue'
import { DemoPage } from './Component/DemoPage/Index'

localStorage.debug = '*'

export default Aff.do()
  .bind('D', () => Aff.pure(new Debug('App:Web')))
  .bind('p', (env) => Aff.pure(new DemoPage({})))
  .run((env) => Aff.提升Effect(new Vue([{ 路径: '/', 元素: env.p }], [], 'app').渲染()))
  .不带回调运行()
