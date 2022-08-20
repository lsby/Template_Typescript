import { Check } from '@lsby/ts_pattern/src/Base/Check'
import { Effect } from '@lsby/ts_pattern/src/Type/Effect'
import { h, VNode } from 'vue'
import { IsVue模板, 取参数, 取模板 } from './Vue模板_类型类'

// 符号定义
const 类型: unique symbol = Symbol('类型')
const 构造子: unique symbol = Symbol('构造子')
const 参数: unique symbol = Symbol('参数')

// 类型定义
export type Vue组件 = { [类型]: 'Vue组件'; [构造子]: 'Vue组件'; [参数]: { 模板: any } }

// 构造子
export function Vue组件<A extends _Check, _Check = Check<[IsVue模板<A>], A>>(模板: A) {
  return { [类型]: 'Vue组件' as 'Vue组件', [构造子]: 'Vue组件' as 'Vue组件', [参数]: { 模板 } }
}

// 函数
export function 取Vue组件(a: Vue组件): Effect<VNode> {
  return Effect(() => {
    return h(取模板(a[参数].模板 as any), 取参数(a[参数].模板 as any))
  })
}
