import { Effect, runEffect } from '@lsby/ts_pattern'
import { Button1 } from '../VueCom/Button1/Index'
import { Button2 } from '../VueCom/Button2/Index'
import { Vue, 渲染Vue模板 } from '../../Package/Vue/Vue'
import { Vue响应值, 修改响应值, 取响应值 } from '../../Package/Vue/Vue响应值'
import { Vue组件 } from '../../Package/Vue/Vue组件'
import { DemoPage3 } from '../VueCom/DemoPage3/Index'

export function main(): Effect<null> {
  var 按钮1 = Vue组件(Button1())
  var 按钮2 = Vue组件(Button2())
  var 列表 = Vue响应值(['a', 'b', 'c'])
  var on添加列表 = (a: string) => {
    var 值 = runEffect(取响应值(列表))
    var eff = 修改响应值(列表, [...值, a])
    runEffect(eff)
  }

  var 模板 = DemoPage3(按钮1, 列表, on添加列表)
  var vue = Vue(模板)

  return 渲染Vue模板(vue, 'app')
}
