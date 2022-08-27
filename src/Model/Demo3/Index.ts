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
    .bind('列表', () => Vue响应值.Vue响应值([] as string[]))
    .bind('按钮', () => Effect.pure(Vue组件.Vue组件(按钮构造函数())))
    .bind('p', (env) =>
      Effect.pure(
        Page3.Page3(env.按钮, env.列表, (a: string) => Aff.提升Effect(env.列表.设置值([...env.列表.取值().运行(), a]))),
      ),
    )
    .run((env) => Vue.Vue(env.p, 'app').渲染())
  return main
}

export var Demo3a = f(Button1.Button1)
export var Demo3b = f(Button2.Button2)
