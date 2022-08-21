/**
 * 程序入口
 * 需要输入:
 * - 实现: (env) => Aff<null, null>
 * 实现的env已经做了检查和转换.
 * 会自动根据环境变量使用对应的环境文件.
 */

import { Effect } from '@lsby/ts_pattern'
import { Debug, log } from '../../Package/Debug/Debug'
import path from 'path'
import { EnvApp, 附加环境 } from '../../Package/EnvApp/EnvApp'
import { Aff } from '../../Package/Aff/Aff'

// 符号定义
const 类型: unique symbol = Symbol('类型')
const 构造子: unique symbol = Symbol('构造子')
const 参数: unique symbol = Symbol('参数')

// 类型定义
type 环境变量类型 = {
  APP_PORT: number
  DB_HOST: string
  DB_PORT: number
  DB_USER: string
  DB_PWD: string
  DB_NAME: string
  NODE_ENV: string
  SESSION_SECRET: string
}

// 类型定义
export type App = {
  [类型]: 'App'
  [构造子]: 'App'
  [参数]: { 实现: (env: 环境变量类型) => Aff<null, null> }
}

// 构造子
export function App(实现: (env: 环境变量类型) => Aff<null, null>) {
  return {
    [类型]: 'App' as 'App',
    [构造子]: 'App' as 'App',
    [参数]: { 实现 },
  }
}

// 函数
export function 运行(a: App): Aff<null, null> {
  var D = Debug('App')
  var 环境变量路径 = ''
  switch (process.env['NODE_ENV']) {
    case 'dev':
      log(D, '使用环境', 'dev')
      环境变量路径 = path.resolve(__dirname, '../../.env/dev.env')
      break
    case 're':
      log(D, '使用环境', 're')
      环境变量路径 = path.resolve(__dirname, '../../.env/re.env')
      break
    case 'prod':
      log(D, '使用环境', 'prod')
      环境变量路径 = path.resolve(__dirname, '../../.env/prod.env')
      break
    case 'fix':
      log(D, '使用环境', 'fix')
      环境变量路径 = path.resolve(__dirname, '../../.env/fix.env')
      break
    default:
      throw new Error(`环境变量 ${process.env['NODE_ENV']} 未定义`)
  }

  var app = EnvApp(环境变量路径, (env) => {
    return Aff(async () => {
      type isNumber = ['DB_PORT', 'APP_PORT']
      var isNumber: isNumber = ['DB_PORT', 'APP_PORT']

      type isString = ['NODE_ENV', 'DB_HOST', 'DB_USER', 'DB_PWD', 'DB_NAME', 'SESSION_SECRET']
      var isString: isString = ['NODE_ENV', 'DB_HOST', 'DB_USER', 'DB_PWD', 'DB_NAME', 'SESSION_SECRET']

      type r_Number<arr> = arr extends []
        ? []
        : arr extends [infer a, ...infer as]
        ? a extends string
          ? Record<a, number> & r_Number<as>
          : never
        : never
      type r_String<arr> = arr extends []
        ? []
        : arr extends [infer a, ...infer as]
        ? a extends string
          ? Record<a, string> & r_String<as>
          : never
        : never
      type r = r_Number<isNumber> & r_String<isString>

      var data_Number = isNumber.map((a) => ({ [a]: Number(env[a]) })).reduce((s, a) => Object.assign(s, a), {})
      var data_String = isString.map((a) => ({ [a]: env[a] })).reduce((s, a) => Object.assign(s, a), {})

      var 存在判断_Number = Object.keys(data_Number).filter((a) => isNaN(data_Number[a]))
      var 存在判断_String = Object.keys(data_String).filter((a) => data_String[a] == null)
      if (存在判断_Number.length != 0 && 存在判断_String.length != 0) {
        if (存在判断_Number.length != 0) {
          throw new Error(`环境变量错误: ${存在判断_Number[0]}为${data_Number[存在判断_Number[0]]}`)
        } else if (存在判断_String.length != 0) {
          throw new Error(`环境变量错误: ${存在判断_String[0]}为${data_Number[存在判断_String[0]]}`)
        }
      }

      var data = { ...data_Number, ...data_String }

      a[参数].实现(data as unknown as r)
    })
  })
  return 附加环境(app)
}
