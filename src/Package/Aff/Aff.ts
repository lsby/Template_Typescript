/**
 * 描述一个异步副作用
 * 需要输入:
 * - 函数: () => Promise<A>
 */

import { Effect, runEffect } from '@lsby/ts_pattern'

// 符号定义
const 类型: unique symbol = Symbol('类型')
const 构造子: unique symbol = Symbol('构造子')
const 参数: unique symbol = Symbol('参数')

// 类型定义
export type Aff<A> = {
  [类型]: 'Aff'
  [构造子]: 'Aff'
  [参数]: { 函数: () => Promise<A> }
}

// 扩充推导定义
declare module '@lsby/ts_pattern/dist/src/Base/K1' {
  interface 一阶类型<A1> {
    Aff: Aff<A1>
  }
}

// 构造子
export function Aff<A>(函数: () => Promise<A>) {
  return {
    [类型]: 'Aff' as 'Aff',
    [构造子]: 'Aff' as 'Aff',
    [参数]: { 函数 },
  }
}

// 函数
export function runAff_<A>(a: Aff<A>): Effect<null> {
  return Effect(() => {
    a[参数].函数()
    return null
  })
}
export function runAff<A>(a: Aff<A>, 回调: (a: A) => Effect<null>): Effect<null> {
  return Effect(() => {
    var c = a[参数].函数()
    c.then((a) => 回调(a))
    return null
  })
}
export function 提升Effect到Aff<A>(a: Effect<A>): Aff<A> {
  return Aff(async () => {
    return runEffect(a)
  })
}
export function 转为Promise<A>(a: Aff<A>): Promise<A> {
  return a[参数].函数()
}
