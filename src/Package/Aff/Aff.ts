import { Effect } from '../Effect/Effect'
import { Either } from '../Either/Either'
import { Function } from '../Function/Function'

export class Aff<A> {
  static Aff<A>(值: () => Promise<A>): Aff<A> {
    return new Aff('Aff', 值)
  }
  private constructor(private 构造子: 'Aff', private 值: () => Promise<A>) {}
  static do<ENV = {}>(st: any[] = []) {
    return {
      bind<S extends string, C>(name: S, x: (a: ENV) => Effect<C>) {
        return Effect.do<ENV & Record<S, C>>([...st, { name, x }])
      },
      run<B>(fr: (env: ENV) => Effect<B>): Effect<B> {
        var 总长度 = st.length
        var env: any = {}
        function f(i: number) {
          return st[i].x(env).bind((a: any) => {
            env[st[i].name] = a
            if (i + 1 >= 总长度) return fr(env)
            return f(i + 1)
          })
        }
        return f(0)
      },
    }
  }
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
  不带回调运行(): Effect<null> {
    var 回调 = (a: any) => {
      return Effect.Effect(() => null)
    }
    return this.运行(回调)
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
