import { 联合转元组, error } from '@lsby/ts_type_fun'
export interface Instance转换<A> {}

type _is转换<A, keys> = keys extends []
  ? error<['转换:', '类型', A, '没有实现', '转换']>
  : keys extends [infer a, ...infer as]
  ? a extends keyof Instance转换<A>
    ? Instance转换<A>[a] extends true
      ? any
      : _is转换<A, as>
    : error<['转换:', '类型', A, '键判定失败']>
  : error<['转换:', '类型', A, '解构失败']>
export type is转换<A> = _is转换<A, 联合转元组<keyof Instance转换<A>>>

export var 转换Next = Symbol('next')
export interface 转换 {}
export var 转换: 转换 = function 转换(a: any, x: any): any {
  for (var fn of instance转换) {
    var r = (fn as any)(a, x)
    if (r == 转换Next) {
      continue
    }
    return r
  }
  throw new Error('没有找到转换的实现')
}
export var instance转换: any[] = []
