import { Page1 } from './Component/Page1/Index'
import { Effect } from './Package/Effect/Effect'
import { Vue } from './Package/Vue/Vue'
import { Vue响应值 } from './Package/Vue/Vue响应值'

if (process.env.NODE_ENV === 'development') {
  ;(globalThis as any).__VUE_OPTIONS_API__ = true
  ;(globalThis as any).__VUE_PROD_DEVTOOLS__ = true
} else {
  ;(globalThis as any).__VUE_OPTIONS_API__ = false
  ;(globalThis as any).__VUE_PROD_DEVTOOLS__ = false
}

var main = Effect.do()
  .bind('v', (env) => Vue响应值.Vue响应值('aaa'))
  .bind('p', (env) =>
    Effect.pure(
      Page1.Page1({
        name: env.v,
        on测试事件: () => env.v.设置值('bbb'),
      }),
    ),
  )
  .run((env) => Vue.Vue(env.p, 'app').渲染())
main.运行()
