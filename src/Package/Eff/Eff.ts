type Eff<A> = () => A

function Eff<A>(a: () => A): Eff<A> {
  return a
}

function Eff_计算<A>(a: Eff<A>): A {
  return a()
}
function Eff_map<A, B>(f: (a: A) => B, a: Eff<A>): Eff<B> {
  return Eff(() => {
    var v = a()
    return f(v)
  })
}
function Eff_apply<A, B>(f: Eff<(a: A) => B>, a: Eff<A>): Eff<B> {
  return Eff(() => {
    var vv = a()
    var ff = f()
    return ff(vv)
  })
}
function Eff_bind<A, B>(a: Eff<A>, f: (a: A) => Eff<B>): Eff<B> {
  return Eff(() => {
    var v = a()
    var c = f(v)()
    return c
  })
}
