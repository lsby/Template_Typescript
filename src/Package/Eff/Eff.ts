const _函数: unique symbol = Symbol()
export type Eff<A> = {
  [_函数]: () => A
}

export function Eff<A>(a: () => A): Eff<A> {
  return { [_函数]: a }
}

export function run<A>(a: Eff<A>): A {
  return a[_函数]()
}
export function map<A, B>(f: (a: A) => B, a: Eff<A>): Eff<B> {
  return Eff(() => {
    var v = a[_函数]()
    return f(v)
  })
}
export function apply<A, B>(f: Eff<(a: A) => B>, a: Eff<A>): Eff<B> {
  return Eff(() => {
    var vv = a[_函数]()
    var ff = f[_函数]()
    return ff(vv)
  })
}
export function bind<A, B>(a: Eff<A>, f: (a: A) => Eff<B>): Eff<B> {
  return Eff(() => {
    var v = a[_函数]()
    var c = f(v)[_函数]()
    return c
  })
}
