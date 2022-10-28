type Aff<A> = () => Promise<A>

function Aff<A>(a: () => Promise<A>): Aff<A> {
  return a
}

function Aff_计算<A>(a: Aff<A>): Promise<A> {
  return a()
}
function Aff_map<A, B>(f: (a: A) => B, a: Aff<A>): Aff<B> {
  return Aff(async () => {
    var v = await a()
    return f(v)
  })
}
function Aff_apply<A, B>(f: Aff<(a: A) => B>, a: Aff<A>): Aff<B> {
  return Aff(async () => {
    var vv = await a()
    var ff = await f()
    return ff(vv)
  })
}
function Aff_bind<A, B>(a: Aff<A>, f: (a: A) => Aff<B>): Aff<B> {
  return Aff(async () => {
    var v = await a()
    var c = await f(v)()
    return c
  })
}
