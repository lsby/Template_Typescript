import { Effect, runEffect } from '@lsby/ts_struct/src/Type/Effect'
import { Vue, 渲染Vue模板 } from '../Model/Vue'
import { Vue响应值, 修改值 } from '../Model/Vue响应值'
import { DemoPage1 } from '../Page/DemoPage1/Index'

export function main(): Effect<null> {
  var 数据 = {
    name: Vue响应值('aaa'),
    onTestEvent: () => {
      var eff = 修改值(数据.name, 'bbb')
      runEffect(eff)
    },
  }
  var 模板 = DemoPage1(数据)
  var vue = Vue(模板)

  return 渲染Vue模板(vue, 'app')
}
