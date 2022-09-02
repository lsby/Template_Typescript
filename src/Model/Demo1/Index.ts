import { Page1 } from '../../Component/Page1/Index'
import { Aff } from '../../Package/Aff/Aff'
import { Effect } from '../../Package/Effect/Effect'
import { Vue } from '../../Package/Vue/Vue'

var main = Effect.do()
  .bind('p', (env) => Effect.pure(new Page1({ name: 'aaa' }, () => new Aff(async () => ({ name: 'bbb' })))))
  .run((env) => new Vue([{ 路径: '/', 模板: env.p }], [], 'app').渲染())
export var Demo1 = main
