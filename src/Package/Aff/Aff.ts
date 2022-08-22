/**
 * 描述一个异步函数
 * 需要输入:
 * - async函数
 */

import { Effect, runEffect } from '@lsby/ts_pattern'

// 符号定义
const 类型: unique symbol = Symbol('类型')
const 构造子: unique symbol = Symbol('构造子')
const 参数: unique symbol = Symbol('参数')

// 类型定义
export type Aff<A, B> = {
  [类型]: 'Aff'
  [构造子]: 'Aff'
  [参数]: { 函数: (a: A) => Promise<B> }
}

// 扩充推导定义
declare module '@lsby/ts_pattern/dist/src/Base/K2' {
  interface 二阶类型<A1, A2> {
    Aff: Aff<A1, A2>
  }
}

// 构造子
export function Aff<A, B>(函数: (a: A) => Promise<B>) {
  return {
    [类型]: 'Aff' as 'Aff',
    [构造子]: 'Aff' as 'Aff',
    [参数]: { 函数 },
  }
}

// 函数
export function runAff_<A, B>(x: A, a: Aff<A, B>): Effect<null> {
  return Effect(() => {
    a[参数].函数(x)
    return null
  })
}
export function runAff<A, B>(x: A, a: Aff<A, B>, 回调: (a: B) => Effect<null>): Effect<null> {
  return Effect(() => {
    var c = a[参数].函数(x)
    c.then((a) => 回调(a))
    return null
  })
}
export function 异步调用<A, B>(x: A, a: Aff<A, B>): Promise<B> {
  return a[参数].函数(x)
}
export function 提升Effect到Aff<A, B>(a: Effect<B>): Aff<A, B> {
  return Aff(async () => {
    return runEffect(a)
  })
}
