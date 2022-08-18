import { Check } from '@lsby/ts_pattern/src/Base/Check'
import * as Vue模板 from '../../../Class/Vue模板'
import { IsVue模板 } from '../../../Class/Vue模板'
import { Vue响应值 } from '../../Vue响应值'
var Page = require('./Page.vue').default

// 符号定义
const 类型: unique symbol = Symbol('类型')
const 构造子: unique symbol = Symbol('构造子')
const 参数: unique symbol = Symbol('参数')

// 类型定义
export type Button2<A> = { [类型]: 'Button2'; [构造子]: 'Button2'; [参数]: { 模板: any; props: A } }

// 构造子
export function Button2<B extends _Check, _Check = Check<[IsVue模板<B>], B>>(): Button2<{}> {
  return {
    [类型]: 'Button2' as 'Button2',
    [构造子]: 'Button2' as 'Button2',
    [参数]: { 模板: Page, props: {} },
  }
}

// 扩充推导定义
declare module '@lsby/ts_pattern/src/Base/K1' {
  interface 一阶类型<A1> {
    Button2: Button2<A1>
  }
}

// 函数
export function 取模板<A>(a: Button2<A>): any {
  return a[参数].模板
}
export function 取参数<A>(a: Button2<A>): Record<string, any> {
  return a[参数].props
}

// 实现类型类
// Vue模板
declare module '../../../Class/Vue模板' {
  interface Vue模板<A> {
    BUtton2的实现: typeof 类型 extends keyof A ? (A[typeof 类型] extends 'Button2' ? true : false) : false
  }
}
Vue模板.增加实现_取模板(function <A>(a: Button2<A>): any {
  if (a[类型] != 'Button2') return Vue模板.NEXT_取模板
  return 取模板(a)
})
Vue模板.增加实现_取参数(function <A>(a: Button2<A>): Record<string, any> {
  if (a[类型] != 'Button2') return Vue模板.NEXT_取参数
  return 取参数(a)
})
