/**
 * 描述一个Express实例
 * 通过传入以下数据来创建:
 * - 接口数组
 * - 静态路径数组
 * - 监听端口
 */

import { Check } from '@lsby/ts_pattern/src/Base/Check'
import { Effect } from '@lsby/ts_pattern/src/Type/Effect'
import express from 'express'
import os from 'os'
import { IsExpress接口, 获得接口描述 } from './Express接口_类型类'
import { 获得中间件实现 } from './中间件'
import * as 静态路径F from './静态路径'
import { 静态路径 } from './静态路径'

// 符号定义
const 类型: unique symbol = Symbol('类型')
const 构造子: unique symbol = Symbol('构造子')
const 参数: unique symbol = Symbol('参数')

// 类型定义
export type Express = {
  [类型]: 'Express'
  [构造子]: 'Express'
  [参数]: { 接口们: any[]; 静态路径们: 静态路径[]; 监听端口: number }
}

// 构造子
export function Express(静态路径们: 静态路径[], 监听端口: number) {
  return {
    [类型]: 'Express' as 'Express',
    [构造子]: 'Express' as 'Express',
    [参数]: { 接口们: [] as any[], 静态路径们, 监听端口 },
  }
}

// 函数
export function 挂载接口<A extends _Check, _Check = Check<[IsExpress接口<A>], A>>(a: Express, 接口: A): Express {
  return {
    [类型]: 'Express' as 'Express',
    [构造子]: 'Express' as 'Express',
    [参数]: { 接口们: [...a[参数].接口们, 接口], 静态路径们: a[参数].静态路径们, 监听端口: a[参数].监听端口 },
  }
}
export function 启动服务(a: Express): Effect<null> {
  return Effect(() => {
    var app = express()

    for (var 静态路径 of a[参数].静态路径们) {
      var 静态配置数据 = 静态路径F.解包(静态路径)
      app.use(静态配置数据.访问路径, express.static(静态配置数据.文件夹路径))
    }

    for (var 接口 of a[参数].接口们) {
      var 描述 = 获得接口描述(接口)
      app.use(function (req, res, next) {
        if (req.path != 描述.访问路径) return next()
        var 中间件列表 = 描述.使用的中间件们
        for (var 中间件 of 中间件列表) {
          var 中间件实现 = 获得中间件实现(中间件)
          中间件实现(req, res, next)
        }
        描述.接口实现(req, res)
      })
    }

    var 监听端口 = a[参数].监听端口
    app.listen(监听端口, () => {
      console.log(`==============`)
      console.log(`start:`)
      console.log(
        `${Object.values(os.networkInterfaces())
          .flat()
          .map((a) => a?.address)
          .map((a) => `\thttp://${a}:${监听端口}`)
          .join('\n')}`,
      )
    })
    return null
  })
}
