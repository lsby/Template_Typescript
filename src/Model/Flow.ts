import { 转换 } from '../Class/转换'

export class Flow<A, B> implements 转换<A, B> {
  constructor(private f: (a: A) => B) {}
  addNode<C>(f: (a: B) => C): Flow<A, C> {
    var r = (a: A) => f(this.f(a))
    return new Flow(r)
  }
  run(a: A): B {
    return this.f(a)
  }
  转换(a: A): B {
    return this.run(a)
  }
}
