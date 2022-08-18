import { Effect, runEffect } from '@lsby/ts_struct/src/Type/Effect'
import { Vue, 渲染Vue模板 } from '../Model/Vue'
import { Vue响应值, 修改响应值, 取响应值 } from '../Model/Vue响应值'
import { DemoPage2 } from '../Page/DemoPage2/Index'

export function main(): Effect<null> {
  var 数据 = {
    列表: Vue响应值(['a', 'b', 'c'] as string[]),
    on添加列表: (a: string) => {
      var 值 = runEffect(取响应值(数据.列表))
      var eff = 修改响应值(数据.列表, [...值, a])
      runEffect(eff)
    },
  }
  var 模板 = DemoPage2(数据)
  var vue = Vue(模板)

  return 渲染Vue模板(vue, 'app')
}
