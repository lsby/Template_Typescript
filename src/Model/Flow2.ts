import { instance转换, 转换Next } from '../Class/转换'

// 类型定义
const 构造子: unique symbol = Symbol('构造子')
const 参数: unique symbol = Symbol('参数')
const 类型名称: unique symbol = Symbol('Flow')
export type Flow<A, B> = { [构造子]: 'Flow'; [参数]: [(a: A) => B, any] }

// 构造子
export function Flow<A, B>(a: (a: A) => B): Flow<A, B> {
  return { [构造子]: 'Flow', [参数]: [a, null] }
}

// 类型类实现
declare module '../Class/转换' {
  interface Instance转换<A> {
    'Flow<A>': typeof 构造子 extends keyof A ? (A[typeof 构造子] extends 'Flow' ? true : false) : false
  }
  interface 转换 {
    <A, B>(a: Flow<A, B>, x: A): B
  }
}
instance转换.push(function (a: any, x: any) {
  if (a[构造子] != 'Flow') return 转换Next
  return runFlow(a, x)
})

// 函数
export function addNode<A, B, C>(a: Flow<A, B>, f: (a: B) => C): Flow<A, C> {
  return Flow((x) => f(a[参数][0](x)))
}
export function runFlow<A, B>(a: Flow<A, B>, x: A): B {
  return a[参数][0](x)
}
