import { Page2 } from '../../Component/Page2/Index'
import { Aff } from '../../Package/Aff/Aff'
import { Effect } from '../../Package/Effect/Effect'
import { Vue } from '../../Package/Vue/Vue'
import { Vue响应值 } from '../../Package/Vue/Vue响应值'

var main = Effect.do()
  .bind('列表', () => Vue响应值.Vue响应值([] as string[]))
  .bind('p', (env) =>
    Effect.pure(Page2.Page2(env.列表, (a: string) => Aff.提升Effect(env.列表.设置值([...env.列表.取值().运行(), a])))),
  )
  .run((env) => Vue.Vue(env.p, 'app').渲染())
export var Demo2 = main
