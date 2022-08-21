/**
 * 描述一个带环境变量的程序
 * 需要输入:
 * - 环境变量文件路径
 * - 接收环境变量的副作用: (env: Record<string, string | undefined>) => Aff<null, null>
 */

import dotenv from 'dotenv'
import { Aff } from '../Aff/Aff'
import { Debug, log } from '../Debug/Debug'

// 符号定义
const 类型: unique symbol = Symbol('类型')
const 构造子: unique symbol = Symbol('构造子')
const 参数: unique symbol = Symbol('参数')

// 类型定义
export type EnvApp = {
  [类型]: 'EnvApp'
  [构造子]: 'EnvApp'
  [参数]: { 环境: string; 副作用: (env: Record<string, string | undefined>) => Aff<null, null> }
}

// 构造子
export function EnvApp(环境: string, 副作用: (env: Record<string, string | undefined>) => Aff<null, null>) {
  return {
    [类型]: 'EnvApp' as 'EnvApp',
    [构造子]: 'EnvApp' as 'EnvApp',
    [参数]: { 环境, 副作用 },
  }
}

// 函数
export function 附加环境(a: EnvApp): Aff<null, null> {
  var D = Debug('EnvApp')
  log(D, '使用的环境变量路径是:', a[参数].环境)
  dotenv.config({ path: a[参数].环境 })
  return a[参数].副作用(process.env)
}
