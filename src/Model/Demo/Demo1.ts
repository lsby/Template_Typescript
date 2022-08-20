import { Effect, runEffect } from '@lsby/ts_pattern'
import { Vue, 渲染Vue模板 } from '../../Package/Vue/Vue'
import { Vue响应值, 修改响应值 } from '../../Package/Vue/Vue响应值'
import { DemoPage1 } from '../VueCom/DemoPage1/Index'

export function main(): Effect<null> {
  var name = Vue响应值('aaa')
  var onTestEvent = () => {
    var eff = 修改响应值(name, 'bbb')
    runEffect(eff)
  }

  var 模板 = DemoPage1(name, onTestEvent)
  var vue = Vue(模板)

  return 渲染Vue模板(vue, 'app')
}
