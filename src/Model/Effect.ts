class Effect<A> {
  constructor(private f: () => A) {}
  map<B>(f: (a: A) => B): Effect<B> {
    return new Effect(() => f(this.f()))
  }
  run(): A {
    return this.f()
  }
}
