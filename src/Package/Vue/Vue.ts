import { Check } from '@lsby/ts_pattern'
import { Effect } from '@lsby/ts_pattern'
import { createApp } from 'vue'
import { IsVue模板, 取参数, 取模板 } from './Vue模板_类型类'

// 符号定义
const 类型: unique symbol = Symbol('类型')
const 构造子: unique symbol = Symbol('构造子')
const 参数: unique symbol = Symbol('参数')

// 类型定义
export type Vue = { [类型]: 'Vue'; [构造子]: 'Vue'; [参数]: { 模板: any } }

// 构造子
export function Vue<A extends _Check, _Check = Check<[IsVue模板<A>], A>>(模板: A) {
  return { [类型]: 'Vue' as 'Vue', [构造子]: 'Vue' as 'Vue', [参数]: { 模板 } }
}

// 函数
export function 渲染Vue模板(a: Vue, 挂载点id: string): Effect<null> {
  return Effect(() => {
    var 模板 = 取模板(a[参数].模板)
    var 模板参数 = 取参数(a[参数].模板)
    var app = createApp(模板, 模板参数)
    app.mount('#' + 挂载点id)
    return null
  })
}
