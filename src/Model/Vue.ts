import { Check } from '@lsby/ts_struct/src/Base/Check'
import { 参数, 构造子, 类型 } from '@lsby/ts_struct/src/Base/Symbol'
import { Effect } from '@lsby/ts_struct/src/Type/Effect'
import { createApp } from 'vue'
import { IsVue模板, 取模板, 取参数 } from '../Class/Vue模板'

// 类型定义
export type Vue = { [类型]: 'Vue'; [构造子]: 'Vue'; [参数]: { 模板: any } }

// 构造子
export function Vue<A extends _Check, _Check = Check<[IsVue模板<A>], A>>(模板: A) {
  return { [类型]: 'Vue' as 'Vue', [构造子]: 'Vue' as 'Vue', [参数]: { 模板 } }
}

// 函数
export function 渲染Vue对象(a: Vue, 挂载点id: string = 'app'): Effect<null> {
  return Effect(() => {
    var app = createApp(取模板(a[参数].模板), 取参数(a[参数].模板))
    app.mount('#' + 挂载点id)
    return null
  })
}
