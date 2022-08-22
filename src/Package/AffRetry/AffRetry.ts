/**
 * 描述一个带有重试机制的异步副作用
 * 需要输入:
 * - 实现: Aff
 * - 最多尝试次数: number
 * - 重试间隔时间: number
 */

import { Check, Eq, 取二阶类型参数1, 取二阶类型参数2, 取二阶类型构造子 } from '@lsby/ts_pattern'
import { Aff, 异步调用 } from '../Aff/Aff'
import { Debug, log } from '../Debug/Debug'
var D = Debug('Package:AffRetry')

// 符号定义
const 类型: unique symbol = Symbol('类型')
const 构造子: unique symbol = Symbol('构造子')
const 参数: unique symbol = Symbol('参数')

// 类型定义
export type AffRetry<A, B> = {
  [类型]: 'AffRetry'
  [构造子]: 'AffRetry'
  [参数]: { 实现: Aff<A, B>; 最多尝试次数: number; 重试间隔时间: number }
}

// 扩充推导定义
declare module '@lsby/ts_pattern' {
  interface 二阶类型<A1, A2> {
    AffRetry: AffRetry<A1, A2>
  }
}

// 构造子
export function AffRetry<
  AffAB extends _Check,
  A = 取二阶类型参数1<AffAB>,
  B = 取二阶类型参数2<AffAB>,
  _Check = Check<[Eq<取二阶类型构造子<AffAB>, 'Aff'>], AffAB>,
>(实现: AffAB, 最多尝试次数: number, 重试间隔时间: number): AffRetry<A, B> {
  return {
    [类型]: 'AffRetry' as 'AffRetry',
    [构造子]: 'AffRetry' as 'AffRetry',
    [参数]: { 实现: 实现 as any, 最多尝试次数, 重试间隔时间 },
  }
}

// 函数
export function genAff<A, B>(a: AffRetry<A, B>): Aff<A, B> {
  return Aff(async (x: A) => {
    var 尝试次数 = 0
    var 最后错误 = null
    var 结果 = null
    while (true) {
      if (尝试次数 >= a[参数].最多尝试次数) throw 最后错误
      log(D, '开始第 %d 次尝试...', 尝试次数 + 1)
      try {
        结果 = await 异步调用(x, a[参数].实现)
        break
      } catch (e) {
        log(D, '出现了错误 %O, 这是第 %d 次尝试, 最多可以尝试 %d 次.', e, 尝试次数 + 1, a[参数].最多尝试次数)
        最后错误 = e
        log(D, '等待 %d 毫秒后重试...', a[参数].重试间隔时间)
        await new Promise((res, rej) => {
          setTimeout(() => {
            res(null)
          }, a[参数].重试间隔时间)
        })
        尝试次数++
        continue
      }
    }
    return 结果
  })
}
