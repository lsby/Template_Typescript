// 类型定义
const 构造子: unique symbol = Symbol('构造子')
const 参数: unique symbol = Symbol('参数')
export type Flow<A, B> = { [构造子]: 'Flow'; [参数]: [(a: A) => B, any] }

// 构造子
export function Flow<A, B>(a: (a: A) => B): Flow<A, B> {
  return { [构造子]: 'Flow', [参数]: [a, null] }
}

// 函数
export function addNode<A, B, C>(a: Flow<A, B>, f: (a: B) => C): Flow<A, C> {
  return Flow((x) => f(a[参数][0](x)))
}
export function runFlow<A, B>(a: Flow<A, B>, x: A): B {
  return a[参数][0](x)
}
