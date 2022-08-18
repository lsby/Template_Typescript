import { Effect, runEffect } from '@lsby/ts_struct/src/Type/Effect'
import { ref } from 'vue'
import { Vue, 渲染Vue对象 } from './Model/Vue'
import { DemoPage1 } from './Page/DemoPage1/Index'

function main(): Effect<null> {
  var 数据 = {
    name: ref('aaa'),
    onTestEvent: () => {
      数据.name.value = 'bbb'
    },
  }
  var 模板 = DemoPage1(数据)
  var vue = Vue(模板)

  return 渲染Vue对象(vue, 'app')
}
runEffect(main())
