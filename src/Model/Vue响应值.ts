import { 参数, 构造子, 类型 } from '@lsby/ts_struct/src/Base/Symbol'
import { Effect } from '@lsby/ts_struct/src/Type/Effect'
import { ref, Ref } from 'vue'

// 类型定义
export type Vue响应值<A> = { [类型]: 'Vue响应值'; [构造子]: 'Vue响应值'; [参数]: { 数据: Ref<A> } }

// 构造子
export function Vue响应值<A>(数据: A) {
  return { [类型]: 'Vue响应值' as 'Vue响应值', [构造子]: 'Vue响应值' as 'Vue响应值', [参数]: { 数据: ref(数据) } }
}

// 扩充推导定义
declare module '@lsby/ts_struct/src/Base/K1' {
  interface 一阶类型<A1> {
    DemoPage1: Vue响应值<A1>
  }
}

// 函数
export function 修改值<A>(a: Vue响应值<A>, 新值: A): Effect<null> {
  return Effect(() => {
    a[参数].数据.value = 新值
    return null
  })
}
export function 取值<A>(a: Vue响应值<A>): Effect<A> {
  return Effect(() => {
    return a[参数].数据.value
  })
}
