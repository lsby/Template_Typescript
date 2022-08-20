/**
 * 描述一种抽象, 这种抽象可以提供一个需要传入环境变量的副作用.
 * 需要传入环境变量的副作用 的 形式是: (env: Record<string, string | undefined>) => Effect<null>
 */

import { Check, Effect } from '@lsby/ts_pattern'
import { error, 联合转元组 } from '@lsby/ts_type_fun'

export interface EnvEffect<A> {}

type _IsEnvEffect<A, keys> = keys extends []
  ? error<['EnvEffect:', '类型', A, '没有实现类型类', 'EnvEffect']>
  : keys extends [infer a, ...infer as]
  ? a extends keyof EnvEffect<A>
    ? EnvEffect<A>[a] extends true
      ? true
      : _IsEnvEffect<A, as>
    : error<['EnvEffect:', '类型', A, '键判定失败']>
  : error<['EnvEffect:', '类型', A, '解构失败']>
export type IsEnvEffect<A> = _IsEnvEffect<A, 联合转元组<keyof EnvEffect<A>>>

var 实现们: any[] = []
export var NEXT: any = Symbol('NEXT')
export function 增加实现(f: (...args: any[]) => any) {
  实现们.push(f)
}
export function 获得环境副作用<A extends _Check, _Check = Check<[IsEnvEffect<A>], A>>(
  a: A,
): (env: Record<string, string | undefined>) => Effect<null> {
  for (var 实现 of 实现们) {
    var r = 实现(...arguments)
    if (r != NEXT) return r
  }
  throw new Error('没有找到实现')
}
