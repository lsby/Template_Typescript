import { 打包, 解包 } from '../Lib/Type_ISO'

export type Counter = { __TYPE__: 'Counter' }
type _Counter = number
declare module '../Lib/Type_ISO' {
  interface 打包 {
    (a: _Counter): Counter
  }
  interface 解包 {
    (a: Counter): _Counter
  }
}

export function mkCounter(n: number): Counter {
  return 打包(n)
}
export function increaseCounter(c: Counter): Counter {
  return 打包(解包(c) + 1)
}
