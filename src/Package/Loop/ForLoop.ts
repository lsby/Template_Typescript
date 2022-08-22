/**
 * 描述一个迭代循环
 * 需要输入:
 * - 条件值
 * - 计算值
 * - 循环条件: (条件值) => bool
 * - 计算函数: async (条件值) => 计算值
 * - 合并函数: (计算值, 计算值) => 计算值
 * - 迭代函数: (条件值) => 条件值
 * 程序会先判断循环条件, 若不成立, 直接返回计算值.
 * 否则, 通过计算函数获得值v.
 * 然后通过合并函数将计算值和值v合并为新的计算值.
 * 然后执行迭代函数获得新条件值.
 * 然后判断循环条件, 循环.
 */

import { Effect, runEffect } from '@lsby/ts_pattern'
import dotenv from 'dotenv'
import { Aff } from '../Aff/Aff'
import { Debug, log } from '../Debug/Debug'
var D = Debug('Package:ForLoop')

// 符号定义
const 类型: unique symbol = Symbol('类型')
const 构造子: unique symbol = Symbol('构造子')
const 参数: unique symbol = Symbol('参数')

// 类型定义
export type ForLoop<A, B> = {
  [类型]: 'ForLoop'
  [构造子]: 'ForLoop'
  [参数]: {
    条件值: A
    计算值: B
    循环条件: (a: A) => boolean
    计算函数: (a: A) => Promise<B>
    合并函数: (a: B, b: B) => B
    迭代函数: (a: A) => A
  }
}

// 构造子
export function ForLoop<A, B>(
  条件值: A,
  计算值: B,
  循环条件: (a: A) => boolean,
  计算函数: (a: A) => Promise<B>,
  合并函数: (a: B, b: B) => B,
  迭代函数: (a: A) => A,
) {
  return {
    [类型]: 'ForLoop' as 'ForLoop',
    [构造子]: 'ForLoop' as 'ForLoop',
    [参数]: { 条件值, 计算值, 循环条件, 计算函数, 合并函数, 迭代函数 },
  }
}

// 函数
export function 计算For循环<A, B>(a: ForLoop<A, B>): Aff<B> {
  var aff = Aff(async () => {
    var 条件值 = a[参数].条件值
    var 计算值 = a[参数].计算值
    var 循环条件 = a[参数].循环条件
    var 计算函数 = a[参数].计算函数
    var 合并函数 = a[参数].合并函数
    var 迭代函数 = a[参数].迭代函数

    while (true) {
      if (!循环条件(条件值)) return 计算值
      var v = await 计算函数(条件值)
      var 计算值 = 合并函数(计算值, v)
      var 条件值 = 迭代函数(条件值)
    }
  })
  return aff
}
