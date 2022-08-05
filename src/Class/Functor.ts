import { 联合转元组, error } from '@lsby/ts_type_fun'
export interface InstanceFunctor<A> {}

type _isFunctor<A, keys> = keys extends []
  ? error<['Functor:', '类型', A, '没有实现', 'Functor']>
  : keys extends [infer a, ...infer as]
  ? a extends keyof InstanceFunctor<A>
    ? InstanceFunctor<A>[a] extends true
      ? any
      : _isFunctor<A, as>
    : error<['Functor:', '类型', A, '键判定失败']>
  : error<['Functor:', '类型', A, '解构失败']>
export type isFunctor<A> = _isFunctor<A, 联合转元组<keyof InstanceFunctor<A>>>

export var FunctorNext = Symbol('next')
export interface map {}
export var map: map = function map(f: any, a: any) {
  for (var fn of instanceMap) {
    var r = (fn as any)(f, a)
    if (r == FunctorNext) {
      continue
    }
    return r
  }
  throw new Error('没有找到map的实现')
}
export var instanceMap: any[] = []
