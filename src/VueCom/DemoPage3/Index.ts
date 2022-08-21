import { Vue响应值 } from '../../Package/Vue/Vue_Ref'
import * as Vue模板 from '../../Package/Vue/Vue_Tem'
import { IsVue模板 } from '../../Package/Vue/Vue_Tem'
import { Vue组件 } from '../../Package/Vue/Vue_Com'
var Page = require('./Page.vue').default

// 符号定义
const 类型: unique symbol = Symbol('类型')
const 构造子: unique symbol = Symbol('构造子')
const 参数: unique symbol = Symbol('参数')

// 类型定义
export type DemoPage3<A> = { [类型]: 'DemoPage3'; [构造子]: 'DemoPage3'; [参数]: { 模板: any; props: A } }

// 构造子
export function DemoPage3(按钮组件: Vue组件, 列表: Vue响应值<string[]>, on添加列表: (a: string) => void) {
  return {
    [类型]: 'DemoPage3' as 'DemoPage3',
    [构造子]: 'DemoPage3' as 'DemoPage3',
    [参数]: { 模板: Page, props: { 按钮组件, 列表, on添加列表 } },
  }
}

// 扩充推导定义
declare module '@lsby/ts_pattern' {
  interface 一阶类型<A1> {
    DemoPage3: DemoPage3<A1>
  }
}

// 函数
export function 取模板<A>(a: DemoPage3<A>): any {
  return a[参数].模板
}
export function 取参数<A>(a: DemoPage3<A>): Record<string, any> {
  return a[参数].props
}

// 实现类型类
// Vue模板
declare module '../../Package/Vue/Vue_Tem' {
  interface Vue模板<A> {
    DemoPage3的实现: typeof 类型 extends keyof A ? (A[typeof 类型] extends 'DemoPage3' ? true : false) : false
  }
}
Vue模板.增加实现_取模板(function <A>(a: DemoPage3<A>): any {
  if (a[类型] != 'DemoPage3') return Vue模板.NEXT_取模板
  return 取模板(a)
})
Vue模板.增加实现_取参数(function <A>(a: DemoPage3<A>): Record<string, any> {
  if (a[类型] != 'DemoPage3') return Vue模板.NEXT_取参数
  return 取参数(a)
})
