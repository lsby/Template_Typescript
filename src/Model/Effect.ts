import { FunctorNext, instanceMap, isFunctor } from '../Class/Functor'

// 类型定义
const 构造子: unique symbol = Symbol('构造子')
const 参数: unique symbol = Symbol('参数')
export type Effect<A> = { [构造子]: 'Effect'; [参数]: [() => A] }

// 构造子
function Effect<A>(a: () => A): Effect<A> {
  return { [构造子]: 'Effect', [参数]: [a] }
}

// 类型类实现
declare module '../Class/Functor' {
  interface InstanceFunctor<A> {
    'Effect<A>': typeof 构造子 extends keyof A ? (A[typeof 构造子] extends 'Effect' ? true : false) : false
  }
  interface map {
    <A, B>(f: (a: A) => B, a: Effect<A>): Effect<B>
  }
}
instanceMap.push(function (f: any, a: any) {
  if (a[构造子] != 'Effect') return FunctorNext
  return map(f, a)
})

// 函数
export function liftEffect<A>(a: A) {
  return Effect(() => a)
}
export function runEffect<A>(a: Effect<A>): A {
  return a[参数][0]()
}
export function map<A, B>(f: (a: A) => B, a: Effect<A>): Effect<B> {
  return Effect(() => f(a[参数][0]()))
}
