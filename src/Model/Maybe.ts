import { FunctorNext, instanceMap, isFunctor } from '../Class/Functor'

// 类型定义
const 构造子: unique symbol = Symbol('构造子')
const 参数: unique symbol = Symbol('参数')
export type Maybe<A> = { [构造子]: 'Just'; [参数]: [A] } | { [构造子]: 'Nothing'; [参数]: [] }

// 构造子
export function Just<A>(a: A): Maybe<A> {
  return { [构造子]: 'Just', [参数]: [a] }
}
export function Nothing<A>(): Maybe<A> {
  return { [构造子]: 'Nothing', [参数]: [] }
}

// 类型类实现
declare module '../Class/Functor' {
  interface InstanceFunctor<A> {
    'Maybe<A>': typeof 构造子 extends keyof A ? (A[typeof 构造子] extends 'Maybe' ? true : false) : false
  }
  interface map {
    <A, B>(f: (a: A) => B, a: Maybe<A>): Maybe<B>
  }
}
instanceMap.push(function (f: any, a: any) {
  if (a[构造子] != 'Maybe') return FunctorNext
  return map(f, a)
})

// 函数
export function pure<A>(a: A) {
  return Just(a)
}
export function map<A, B>(f: (a: A) => B, a: Maybe<A>): Maybe<B> {
  if (a[构造子] == 'Nothing') return Nothing()
  return Just(f(a[参数][0]))
}
