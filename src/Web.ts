import { Page1 } from './Component/Page1/Index'
import { Aff } from './Package/Aff/Aff'
import { Effect } from './Package/Effect/Effect'
import { Vue } from './Package/Vue/Vue'
import { Vue响应值 } from './Package/Vue/Vue响应值'

var main = Effect.do()
  .bind('v', (env) => Vue响应值.Vue响应值('aaa'))
  .bind('p', (env) =>
    Effect.pure(
      Page1.Page1({
        name: env.v,
        on测试事件: () => Effect.empty,
      }),
    ),
  )
  .run((env) => Vue.Vue(env.p, 'app').渲染())
main.运行()
