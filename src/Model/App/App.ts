/**
 * 程序入口, 实现EnvEffect.
 */

import { Effect } from '@lsby/ts_pattern'
import * as EnvEffect from '../../Package/EnvApp/EnvEffect'
import { IsEnvEffect } from '../../Package/EnvApp/EnvEffect'

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
  [参数]: { 副作用: (env: 环境变量类型) => Effect<null> }
}

// 构造子
export function App(副作用: (env: 环境变量类型) => Effect<null>) {
  return {
    [类型]: 'App' as 'App',
    [构造子]: 'App' as 'App',
    [参数]: { 副作用 },
  }
}

// 实现类型类
// EnvEffect
declare module '../../Package/EnvApp/EnvEffect' {
  interface EnvEffect<A> {
    App的实现: typeof 类型 extends keyof A ? (A[typeof 类型] extends 'App' ? true : false) : false
  }
}
EnvEffect.增加实现(function (a: App): (env: Record<string, string | undefined>) => Effect<null> {
  if (a[类型] != 'App') return EnvEffect.NEXT

  return (env) => {
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

    return a[参数].副作用(data as unknown as r)
  }
})
