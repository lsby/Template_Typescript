export type Aff<A> = () => Promise<A>

export function Aff<A>(a: () => Promise<A>): Aff<A> {
  return a
}

export function Aff_run<A>(a: Aff<A>): Promise<A> {
  return a()
}
export function Aff_map<A, B>(f: (a: A) => B, a: Aff<A>): Aff<B> {
  return Aff(async () => {
    var v = await a()
    return f(v)
  })
}
export function Aff_apply<A, B>(f: Aff<(a: A) => B>, a: Aff<A>): Aff<B> {
  return Aff(async () => {
    var vv = await a()
    var ff = await f()
    return ff(vv)
  })
}
export function Aff_bind<A, B>(a: Aff<A>, f: (a: A) => Aff<B>): Aff<B> {
  return Aff(async () => {
    var v = await a()
    var c = await f(v)()
    return c
  })
}
