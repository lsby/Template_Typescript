import { is转换, 转换 } from '../Class/转换'

// 类型定义
const 构造子: unique symbol = Symbol('构造子')
const 参数: unique symbol = Symbol('参数')
export type Recursion<A, B, C extends is转换<C>> = {
  [构造子]: 'Recursion'
  [参数]: [(a: A) => boolean, (a: A) => A, C, (a: B, b: B) => B]
}

// 构造子
export function Recursion<A, B, C extends is转换<C>>(
  循环条件: (a: A) => boolean,
  循环值迭代式: (a: A) => A,
  函数: C,
  合并式: (a: B, b: B) => B,
): Recursion<A, B, C> {
  return { [构造子]: 'Recursion', [参数]: [循环条件, 循环值迭代式, 函数, 合并式] }
}

// 函数
export function runRecursion<A, B, C extends is转换<C>>(a: Recursion<A, B, C>, x: A, init: B) {
  var 循环条件 = a[参数][0]
  var 循环值迭代式 = a[参数][1]
  var 函数 = a[参数][2]
  var 合并式 = a[参数][3]

  var 当前循环值 = x
  var 当前结果值 = init

  while (1) {
    if (!循环条件(当前循环值)) {
      return 当前结果值
    }
    当前结果值 = 合并式(当前结果值, 转换(函数 as any, 当前循环值))
    当前循环值 = 循环值迭代式(当前循环值)
  }
}
