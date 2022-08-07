export class NoDetermine<A> {
  constructor(private data: Array<A>) {}
  static join<A>(a: NoDetermine<NoDetermine<A>>): NoDetermine<A> {
    return new NoDetermine(a.data.map((a) => a.data).flat())
  }
  map<B>(f: (a: A) => B): NoDetermine<B> {
    return new NoDetermine(this.data.map(f))
  }
  apply<B>(f: NoDetermine<(a: A) => B>): NoDetermine<B> {
    return this.map(f.data[0])
  }
  bind<B>(f: (a: A) => NoDetermine<B>): NoDetermine<B> {
    return NoDetermine.join(this.map(f))
  }
}
