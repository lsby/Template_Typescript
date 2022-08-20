/**
 * 描述一个接收环境变量的副作用
 * 需要输入:
 * - 一个函数, 这个函数的参数是环境变量, 返回值是一个副作用.
 */

import { Effect } from '@lsby/ts_pattern'

// 符号定义
const 类型: unique symbol = Symbol('类型')
const 构造子: unique symbol = Symbol('构造子')
const 参数: unique symbol = Symbol('参数')

// 类型定义
export type EnvEffect = {
  [类型]: 'EnvEffect'
  [构造子]: 'EnvEffect'
  [参数]: { 副作用: (env: Record<string, string>) => Effect<null> }
}

// 构造子
export function EnvEffect(副作用: (env: Record<string, string>) => Effect<null>) {
  return {
    [类型]: 'EnvEffect' as 'EnvEffect',
    [构造子]: 'EnvEffect' as 'EnvEffect',
    [参数]: { 副作用 },
  }
}
