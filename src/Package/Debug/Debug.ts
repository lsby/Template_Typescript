/**
 * 描述一个Debug模块
 * 需要输入:
 * - 名称
 */

import { debug } from 'debug'

// 符号定义
const 类型: unique symbol = Symbol('类型')
const 构造子: unique symbol = Symbol('构造子')
const 参数: unique symbol = Symbol('参数')

// 类型定义
export type Debug = {
  [类型]: 'Debug'
  [构造子]: 'Debug'
  [参数]: { 名称: string; log: any; error: any }
}

// 构造子
export function Debug(名称: string) {
  var _log = debug(`${名称}`)
  _log.log = console.log.bind(console)
  var _error = debug(`${名称}`)

  return {
    [类型]: 'Debug' as 'Debug',
    [构造子]: 'Debug' as 'Debug',
    [参数]: { 名称, log: _log, error: _error },
  }
}

// 函数
export function log(a: Debug, ...args: any[]): void {
  a[参数].log(...args)
}
export function error(a: Debug, ...args: any[]): void {
  a[参数].error(...args)
}
