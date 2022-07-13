type Counter = ['Counter', number]

export function mkCounter(n: number): Counter {
  return ['Counter', n]
}
export function warpCounter(c: number): Counter {
  return mkCounter(c)
}
export function unwarpCounter(c: Counter): number {
  return c[1]
}
export function increaseCounter(c: Counter): Counter {
  return warpCounter(unwarpCounter(c) + 1)
}
