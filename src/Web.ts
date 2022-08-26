// function main() {
//   // return Demo1.main()
//   // return Demo2.main()
//   // return Demo3.main()
// }

import { Page1 } from './Component/Page1/Index'
import { Aff } from './Package/Aff/Aff'
import { Effect } from './Package/Effect/Effect'
import { Vue } from './Package/Vue/Vue'
import { Vue响应值 } from './Package/Vue/Vue响应值'

var main: Effect<null> = Vue.Vue(
  Page1.Page1({
    name: Vue响应值.Vue响应值('aaa'),
    on测试事件: () => Effect.Effect(() => null),
  }),
  'app',
).渲染()

main.运行()
