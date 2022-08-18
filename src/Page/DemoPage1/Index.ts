import * as Vue模板 from '../../Class/Vue模板'
import { Vue响应值 } from '../../Model/Vue响应值'
var Page = require('./Page.vue').default

// 符号定义
const 类型: unique symbol = Symbol('类型')
const 构造子: unique symbol = Symbol('构造子')
const 参数: unique symbol = Symbol('参数')

// 类型定义
export type DemoPage1<A> = { [类型]: 'DemoPage1'; [构造子]: 'DemoPage1'; [参数]: { 模板: any; props: A } }

// 构造子
export function DemoPage1<
  A extends {
    name: Vue响应值<string>
    onTestEvent: () => void
  },
>(props: A): DemoPage1<A> {
  return { [类型]: 'DemoPage1' as 'DemoPage1', [构造子]: 'DemoPage1' as 'DemoPage1', [参数]: { 模板: Page, props } }
}

// 扩充推导定义
declare module '@lsby/ts_struct/src/Base/K1' {
  interface 一阶类型<A1> {
    DemoPage1: DemoPage1<A1>
  }
}

// 函数
export function 取模板<A>(a: DemoPage1<A>): any {
  return a[参数].模板
}
export function 取参数<A>(a: DemoPage1<A>): Record<string, any> {
  return a[参数].props
}

// 实现类型类
// Vue模板
declare module '../../Class/Vue模板' {
  interface Vue模板<A> {
    DemoPage1的实现: typeof 类型 extends keyof A ? (A[typeof 类型] extends 'DemoPage1' ? true : false) : false
  }
}
Vue模板.增加实现_取模板(function <A>(a: DemoPage1<A>): any {
  if (a[类型] != 'DemoPage1') return Vue模板.NEXT_取模板
  return 取模板(a)
})
Vue模板.增加实现_取参数(function <A>(a: DemoPage1<A>): Record<string, any> {
  if (a[类型] != 'DemoPage1') return Vue模板.NEXT_取参数
  return 取参数(a)
})
