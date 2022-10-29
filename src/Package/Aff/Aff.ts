const _函数: unique symbol = Symbol()
export type Aff<A> = {
  [_函数]: () => Promise<A>
}

export function Aff<A>(a: () => Promise<A>): Aff<A> {
  return { [_函数]: a }
}

export function Aff_run<A>(a: Aff<A>): Promise<A> {
  return a[_函数]()
}
export function Aff_map<A, B>(f: (a: A) => B, a: Aff<A>): Aff<B> {
  return Aff(async () => {
    var v = await a[_函数]()
    return f(v)
  })
}
export function Aff_apply<A, B>(f: Aff<(a: A) => B>, a: Aff<A>): Aff<B> {
  return Aff(async () => {
    var vv = await a[_函数]()
    var ff = await f[_函数]()
    return ff(vv)
  })
}
export function Aff_bind<A, B>(a: Aff<A>, f: (a: A) => Aff<B>): Aff<B> {
  return Aff(async () => {
    var v = await a[_函数]()
    var c = await f(v)[_函数]()
    return c
  })
}
