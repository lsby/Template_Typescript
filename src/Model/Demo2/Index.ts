import { Page2 } from '../../Component/Page2/Index'
import { Aff } from '../../Package/Aff/Aff'
import { Effect } from '../../Package/Effect/Effect'
import { Vue } from '../../Package/Vue/Vue'

var main = Effect.do()
  .bind('p', () =>
    Effect.pure(new Page2({ 列表: ['a', 'b', 'c'] }, (old, a) => new Aff(async () => ({ 列表: [...old.列表, a] })))),
  )
  .run((env) => new Vue([{ 路径: '/', 模板: env.p }], [], 'app').渲染())
export var Demo2 = main
