/**
 * 描述一种抽象, 这种抽象可以提供Express接口的描述.
 * Express接口的描述包括以下部分:
 * - 接口访问路径
 * - 接口使用的中间件们
 * - 接口实现: (req: Request, res: Response) => Promise<null>
 */

import { Check } from '@lsby/ts_pattern'
import { error, 联合转元组 } from '@lsby/ts_type_fun'
import { Request, Response } from 'express'
import { 中间件 } from './中间件'

export interface Express接口<A> {}

type _IsExpress接口<A, keys> = keys extends []
  ? error<['Express接口:', '类型', A, '没有实现类型类', 'Express接口']>
  : keys extends [infer a, ...infer as]
  ? a extends keyof Express接口<A>
    ? Express接口<A>[a] extends true
      ? true
      : _IsExpress接口<A, as>
    : error<['Express接口:', '类型', A, '键判定失败']>
  : error<['Express接口:', '类型', A, '解构失败']>
export type IsExpress接口<A> = _IsExpress接口<A, 联合转元组<keyof Express接口<A>>>

var 实现们: any[] = []
export var NEXT: any = Symbol('NEXT')
export function 增加实现(f: (...args: any[]) => any) {
  实现们.push(f)
}
export function 获得接口描述<A extends _Check, _Check = Check<[IsExpress接口<A>], A>>(
  a: A,
): {
  访问路径: string
  使用的中间件们: 中间件[]
  接口实现: (req: Request, res: Response) => Promise<null>
} {
  for (var 实现 of 实现们) {
    var r = 实现(...arguments)
    if (r != NEXT) return r
  }
  throw new Error('没有找到实现')
}
