import { Effect } from '../Effect/Effect'
import { Either } from '../Either/Either'
import { Function } from '../Function/Function'

export class Aff<A> {
  static Aff<A>(值: () => Promise<A>): Aff<A> {
    return new Aff('Aff', 值)
  }
  private constructor(private 构造子: 'Aff', private 值: () => Promise<A>) {}
  static 提升Effect<A>(a: Effect<A>): Aff<A> {
    return Aff.Aff(async () => a.运行())
  }
  map<B>(f: Function<A, B>): Aff<B> {
    return Aff.Aff(async () => f(await this.值()))
  }
  apply<B>(f: Aff<Function<A, B>>): Aff<B> {
    return Aff.Aff(async () => (await f.值())(await this.值()))
  }
  bind<B>(f: Function<A, Aff<B>>): Aff<B> {
    return Aff.Aff(async () => await f(await this.值()).值())
  }
  不带回调运行() {
    var 回调 = (a: any) => {
      return Effect.Effect(() => null)
    }
    this.运行(回调)
  }
  运行(回调: Function<Either<Error, A>, Effect<null>>): Effect<null> {
    return Effect.Effect(() => {
      this.值()
        .then((a) => 回调(Either.Right(a)))
        .catch((e) => {
          var _e = e
          if (!(e instanceof Error)) {
            _e = new Error(e)
          }
          回调(Either.Left(_e))
        })
      return null
    })
  }
  运行为Promise(): Promise<A> {
    return this.值()
  }
}
