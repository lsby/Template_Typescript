/**
 * 描述一个带环境变量的程序
 * 需要输入:
 * - 环境变量文件路径
 * - 接收环境变量的程序: Aff<Record<string, string | undefined>, null>
 */

import { Effect } from '@lsby/ts_pattern'
import dotenv from 'dotenv'
import { Aff } from '../Aff/Aff'
import { Debug, log } from '../Debug/Debug'
import * as Aff_F from '../Aff/Aff'

// 符号定义
const 类型: unique symbol = Symbol('类型')
const 构造子: unique symbol = Symbol('构造子')
const 参数: unique symbol = Symbol('参数')

// 类型定义
export type EnvApp = {
  [类型]: 'EnvApp'
  [构造子]: 'EnvApp'
  [参数]: { 环境文件: string; 程序: Aff<Record<string, string | undefined>, null> }
}

// 构造子
export function EnvApp(环境文件: string, 程序: Aff<Record<string, string | undefined>, null>) {
  return {
    [类型]: 'EnvApp' as 'EnvApp',
    [构造子]: 'EnvApp' as 'EnvApp',
    [参数]: { 环境文件, 程序 },
  }
}

// 函数
export function 附加环境(a: EnvApp): Effect<null> {
  var D = Debug('EnvApp')
  dotenv.config({ path: a[参数].环境文件 })
  log(D, '使用的环境文件路径是:', a[参数].环境文件)
  return Aff_F.runAff_(process.env, a[参数].程序)
}
