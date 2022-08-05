import { FunctorNext, instanceMap } from '../Class/Functor'

// 类型定义
const 构造子: unique symbol = Symbol('构造子')
const 参数: unique symbol = Symbol('参数')
export type Array<A> = { [构造子]: 'Array'; [参数]: [A[]] }

// 构造子
export function Array<A>(a: A[]): Array<A> {
  return { [构造子]: 'Array', [参数]: [a] }
}

// 类型类实现
declare module '../Class/Functor' {
  interface InstanceFunctor<A> {
    'Array<A>': typeof 构造子 extends keyof A ? (A[typeof 构造子] extends 'Array' ? true : false) : false
  }
  interface map {
    <A, B>(f: (a: A) => B, a: Array<A>): Array<B>
  }
}
instanceMap.push(function (f: any, a: any) {
  if (a[构造子] != 'Array') return FunctorNext
  return map(f, a)
})

// 函数
export function toJsArray<A>(a: Array<A>): A[] {
  return a[参数][0]
}
export function map<A, B>(f: (a: A) => B, a: Array<A>): Array<B> {
  return Array(a[参数][0].map(f))
}
export function flat<A>(a: Array<Array<A>>): Array<A> {
  return Array(a[参数][0].map(toJsArray).flat())
}
export function bind<A, B>(a: Array<A>, f: (a: A) => Array<B>): Array<B> {
  return flat(Array(a[参数][0].map(f)))
}
