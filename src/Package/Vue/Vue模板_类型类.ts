/**
 * 描述一种抽象, 这种抽象可以提供Vue模板和其对应参数.
 */

import { Check } from '@lsby/ts_pattern'
import { error, 联合转元组 } from '@lsby/ts_type_fun'

export interface Vue模板<A> {}

type _IsVue模板<A, keys> = keys extends []
  ? error<['Vue模板:', '类型', A, '没有实现类型类', 'Vue模板']>
  : keys extends [infer a, ...infer as]
  ? a extends keyof Vue模板<A>
    ? Vue模板<A>[a] extends true
      ? true
      : _IsVue模板<A, as>
    : error<['Vue模板:', '类型', A, '键判定失败']>
  : error<['Vue模板:', '类型', A, '解构失败']>
export type IsVue模板<A> = _IsVue模板<A, 联合转元组<keyof Vue模板<A>>>

var 实现们_取模板: any[] = []
export var NEXT_取模板: any = Symbol('NEXT')
export function 增加实现_取模板(f: (...args: any[]) => any) {
  实现们_取模板.push(f)
}
export function 取模板<A extends _Check, _Check = Check<[IsVue模板<A>], A>>(a: A): any {
  for (var 实现 of 实现们_取模板) {
    var r = 实现(...arguments)
    if (r != NEXT_取模板) return r
  }
  throw new Error('没有找到实现')
}

var 实现们_取参数: any[] = []
export var NEXT_取参数: any = Symbol('NEXT')
export function 增加实现_取参数(f: (...args: any[]) => any) {
  实现们_取参数.push(f)
}
export function 取参数<A extends _Check, _Check = Check<[IsVue模板<A>], A>>(a: A): A {
  for (var 实现 of 实现们_取参数) {
    var r = 实现(...arguments)
    if (r != NEXT_取参数) return r
  }
  throw new Error('没有找到实现')
}
