import { Function } from '../Function/Function'

export class Effect<A> {
  static Effect<A>(值: () => A): Effect<A> {
    return new Effect('Effect', 值)
  }
  static pure<A>(a: A): Effect<A> {
    return Effect.Effect(() => a)
  }
  private constructor(构造子: 'Effect', private 值: () => A) {}
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
  static empty: Effect<null> = Effect.Effect(() => null)
  static 提升副作用函数<A>(a: () => A): Effect<A> {
    return Effect.Effect(() => a())
  }
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
