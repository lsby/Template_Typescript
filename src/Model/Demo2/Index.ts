import { Page2 } from '../../Component/Page2/Index'
import { Aff } from '../../Package/Aff/Aff'
import { Effect } from '../../Package/Effect/Effect'
import { Vue } from '../../Package/Vue/Vue'
import { Vue响应值 } from '../../Package/Vue/Vue响应值'

var main = Effect.do()
  .bind('列表', () => Effect.pure(new Vue响应值([] as string[])))
  .bind('p', (env) =>
    Effect.pure(new Page2(env.列表, (a: string) => Aff.提升Effect(env.列表.设置值([...env.列表.取值().运行(), a])))),
  )
  .run((env) => new Vue([{ 路径: '/', 模板: env.p }], [], 'app').渲染())
export var Demo2 = main
