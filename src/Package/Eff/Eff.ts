export type Eff<A> = () => A

export function Eff<A>(a: () => A): Eff<A> {
  return a
}

export function Eff_计算<A>(a: Eff<A>): A {
  return a()
}
export function Eff_map<A, B>(f: (a: A) => B, a: Eff<A>): Eff<B> {
  return Eff(() => {
    var v = a()
    return f(v)
  })
}
export function Eff_apply<A, B>(f: Eff<(a: A) => B>, a: Eff<A>): Eff<B> {
  return Eff(() => {
    var vv = a()
    var ff = f()
    return ff(vv)
  })
}
export function Eff_bind<A, B>(a: Eff<A>, f: (a: A) => Eff<B>): Eff<B> {
  return Eff(() => {
    var v = a()
    var c = f(v)()
    return c
  })
}
