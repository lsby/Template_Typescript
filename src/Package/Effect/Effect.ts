import { Function } from '../Function/Function'

export class Effect<A> {
  static Effect<A>(值: () => A): Effect<A> {
    return new Effect('Effect', 值)
  }
  private constructor(构造子: 'Effect', private 值: () => A) {}
  运行(): A {
    return this.值()
  }
  map<B>(f: Function<A, B>): Effect<B> {
    return Effect.Effect(() => f(this.值()))
  }
  apply<B>(f: Effect<Function<A, B>>): Effect<B> {
    return Effect.Effect(() => f.值()(this.值()))
  }
  bind<B>(f: Function<A, Effect<B>>): Effect<B> {
    return Effect.Effect(() => f(this.值()).值())
  }
}
