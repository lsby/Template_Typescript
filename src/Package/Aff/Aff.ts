import { Effect } from '../Effect/Effect'
import { Either } from '../Either/Either'
import { Function } from '../Function/Function'

export class Aff<A> {
  constructor(private 值: () => Promise<A>) {}
  static do<ENV = {}>(st: any[] = []) {
    return {
      bind<S extends string, C>(name: S, x: (a: ENV) => Aff<C>) {
        return Aff.do<ENV & Record<S, C>>([...st, { name, x }])
      },
      run<B>(fr: (env: ENV) => Aff<B>): Aff<B> {
        var 总长度 = st.length
        if (总长度 == 0) return fr(env)
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
    return new Aff(async () => a.运行())
  }
  static 提升副作用函数<A>(a: () => A): Aff<A> {
    return new Aff(async () => a())
  }
  static pure<A>(a: A): Aff<A> {
    return new Aff(async () => a)
  }
  static throw<B>(e: Error): Aff<B> {
    return new Aff(async () => {
      throw e
    })
  }
  map<B>(f: Function<A, B>): Aff<B> {
    return new Aff(async () => f(await this.值()))
  }
  apply<B>(f: Aff<Function<A, B>>): Aff<B> {
    return new Aff(async () => (await f.值())(await this.值()))
  }
  bind<B>(f: Function<A, Aff<B>>): Aff<B> {
    return new Aff(async () => {
      var v = await this.值()
      var c = await f(v).值()
      return c
    })
  }
  try(): Aff<Either<Error, A>> {
    return new Aff(async () => {
      try {
        var c = await this.值()
        return Either.Right(c)
      } catch (e: any) {
        var _e = e
        if (!(e instanceof Error)) {
          _e = new Error(e)
        }
        return Either.Left(_e as any)
      }
    })
  }
  不带回调运行(): Effect<null> {
    return this.运行(() => Effect.empty)
  }
  运行(回调: Function<A, Effect<null>>): Effect<null> {
    return new Effect(() => {
      this.值().then((a) => 回调(a).运行())
      return null
    })
  }
  尝试运行(回调: Function<Either<Error, A>, Effect<null>>): Effect<null> {
    return new Effect(() => {
      this.值()
        .then((a) => 回调(Either.Right(a)).运行())
        .catch((e) => {
          var _e = e
          if (!(e instanceof Error)) {
            _e = new Error(e)
          }
          回调(Either.Left(_e)).运行()
        })
      return null
    })
  }
  运行为Promise(): Promise<A> {
    return this.值()
  }
}
