// 类型定义
const 构造子: unique symbol = Symbol('构造子')
const 参数: unique symbol = Symbol('参数')
export type Flow<A> = { [构造子]: 'Flow'; [参数]: [() => A, any] }

// 构造子
export function Flow<A>(a: () => A): Flow<A> {
  return { [构造子]: 'Flow', [参数]: [a, null] }
}

// 函数
export function addNode<A, B>(a: Flow<A>, f: (a: A) => B): Flow<B> {
  return Flow(() => f(a[参数][0]()))
}
export function runFlow<A>(a: Flow<A>): A {
  return a[参数][0]()
}
