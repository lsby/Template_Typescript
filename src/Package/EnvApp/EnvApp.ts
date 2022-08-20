/**
 * 描述一个带环境变量的程序
 * 需要输入:
 * - 环境变量名称
 * - 接收环境变量的副作用
 */

import { EnvEffect } from './EnvEffect'

// 符号定义
const 类型: unique symbol = Symbol('类型')
const 构造子: unique symbol = Symbol('构造子')
const 参数: unique symbol = Symbol('参数')

// 类型定义
export type EnvApp = {
  [类型]: 'EnvApp'
  [构造子]: 'EnvApp'
  [参数]: { 环境名称: string; 副作用: EnvEffect }
}

// 构造子
export function EnvApp(环境名称: string, 副作用: EnvEffect) {
  return {
    [类型]: 'EnvApp' as 'EnvApp',
    [构造子]: 'EnvApp' as 'EnvApp',
    [参数]: { 环境名称, 副作用 },
  }
}
