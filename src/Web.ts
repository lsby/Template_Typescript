import { Page1 } from './Component/Page1/Index'
import { Aff } from './Package/Aff/Aff'
import { Effect } from './Package/Effect/Effect'
import { Vue } from './Package/Vue/Vue'
import { Vue响应值 } from './Package/Vue/Vue响应值'

var main: Aff<null> = Aff.Aff(async () => {
  var v = Vue响应值.Vue响应值('aaa').运行()
  var p = Page1.Page1({
    name: v,
    on测试事件: () => Effect.empty,
  })
  Vue.Vue(p, 'app').渲染().运行()
  return null
})

main.不带回调运行().运行()

// doi([['v']])
