import { 函子 } from '../Class/函子'

export class Maybe<A> implements 函子<A> {
  constructor(private value: null | A) {}
  map<B>(f: (a: A) => B): Maybe<B> {
    if (this.value == null) return this as any
    return new Maybe(f(this.value))
  }
}
