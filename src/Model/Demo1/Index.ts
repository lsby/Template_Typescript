import { Page1 } from '../../Component/Page1/Index'
import { Effect } from '../../Package/Effect/Effect'
import { Vue } from '../../Package/Vue/Vue'
import { Vue响应值 } from '../../Package/Vue/Vue响应值'

var main = Effect.do()
  .bind('v', () => Effect.pure(new Vue响应值('aaa')))
  .bind('p', (env) => Effect.pure(new Page1(env.v, () => env.v.设置值('bbb'))))
  .run((env) => new Vue(env.p, 'app').渲染())
export var Demo1 = main
