import { 转换2 } from '../Class/转换2'

export class Flow<A, B> implements 转换2<A, B> {
  constructor(private f: (a: A) => B) {}
  转换2(a: A): B {
    return this.run(a)
  }
  addNode<C>(f: (a: B) => C): Flow<A, C> {
    var r = (a: A) => f(this.f(a))
    return new Flow(r)
  }
  run(a: A): B {
    return this.f(a)
  }
}
