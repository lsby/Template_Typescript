import { Button1 } from '../../Component/Button1/Index'
import { Button2 } from '../../Component/Button2/Index'
import { Page3 } from '../../Component/Page3/Index'
import { Aff } from '../../Package/Aff/Aff'
import { Effect } from '../../Package/Effect/Effect'
import { Vue } from '../../Package/Vue/Vue'
import { Vue响应值 } from '../../Package/Vue/Vue响应值'
import { Vue模板 } from '../../Package/Vue/Vue模板'
import { Vue组件 } from '../../Package/Vue/Vue组件'

function f(按钮构造函数: () => Vue模板) {
  var main = Effect.do()
    .bind('列表', () => Effect.pure(new Vue响应值([] as string[])))
    .bind('按钮', () => Effect.pure(new Vue组件(按钮构造函数())))
    .bind('p', (env) =>
      Effect.pure(
        new Page3(env.按钮, env.列表, (a: string) => Aff.提升Effect(env.列表.设置值([...env.列表.取值().运行(), a]))),
      ),
    )
    .run((env) => new Vue([{ 路径: '/', 模板: env.p }], [], 'app').渲染())
  return main
}

export var Demo3a = f(() => new Button1())
export var Demo3b = f(() => new Button2())
