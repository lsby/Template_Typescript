export class Maybe<A> {
  constructor(private value: null | A) {}
  map<B>(f: (a: A) => B): Maybe<B> {
    if (this.value == null) return this as any
    return new Maybe(f(this.value))
  }
}
