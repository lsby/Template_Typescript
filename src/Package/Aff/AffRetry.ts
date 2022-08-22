/**
 * 描述一个带有重试机制的异步副作用
 * 需要输入:
 * - 实现: Aff
 * - 最多尝试次数: number
 * - 重试间隔时间: number
 */

import { Debug, log } from '../Debug/Debug'
import { Aff, 转为Promise } from './Aff'
var D = Debug('Package:AffRetry')

// 符号定义
const 类型: unique symbol = Symbol('类型')
const 构造子: unique symbol = Symbol('构造子')
const 参数: unique symbol = Symbol('参数')

// 类型定义
export type AffRetry<A> = {
  [类型]: 'AffRetry'
  [构造子]: 'AffRetry'
  [参数]: { 实现: Aff<A>; 最多尝试次数: number; 重试间隔时间: number }
}

// 扩充推导定义
declare module '@lsby/ts_pattern/dist/src/Base/K1' {
  interface 一阶类型<A1> {
    AffRetry: AffRetry<A1>
  }
}

// 构造子
export function AffRetry<A>(实现: Aff<A>, 最多尝试次数: number, 重试间隔时间: number): AffRetry<A> {
  return {
    [类型]: 'AffRetry' as 'AffRetry',
    [构造子]: 'AffRetry' as 'AffRetry',
    [参数]: { 实现, 最多尝试次数, 重试间隔时间 },
  }
}

// 函数
export function genAff<A>(a: AffRetry<A>): Aff<A> {
  return Aff(async () => {
    var 尝试次数 = 0
    var 最后错误 = null
    var 结果 = null
    while (true) {
      if (尝试次数 >= a[参数].最多尝试次数) throw 最后错误
      log(D, '开始第 %d 次尝试...', 尝试次数 + 1)
      try {
        结果 = await 转为Promise(a[参数].实现)
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
