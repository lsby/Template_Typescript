/**
 * 描述一个Express实例
 * 通过传入以下数据来创建:
 * - 接口数组
 * - 静态路径数组
 * - 监听端口
 */

import { Check } from '@lsby/ts_pattern'
import { Effect } from '@lsby/ts_pattern'
import express from 'express'
import os from 'os'
import { 获得中间件实现 } from './Middleware'
import * as 静态路径F from './StaticFile'
import { 静态路径 } from './StaticFile'
import { NextFunction, Request, Response } from 'express'
import url from 'url'
import { Debug, log } from '../Debug/Debug'
import { IsExpress接口, 获得接口描述 } from './Interface'
import { 转为Promise } from '../Aff/Aff'
var D = Debug('Package:Express')

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
function _不安全的创建Express(接口们: any, 静态路径们: any, 监听端口: any) {
  return {
    [类型]: 'Express' as 'Express',
    [构造子]: 'Express' as 'Express',
    [参数]: { 接口们, 静态路径们, 监听端口 },
  }
}
export function Express(监听端口: number): Express {
  return _不安全的创建Express([], [], 监听端口)
}

// 函数
export function 添加静态路径(静态路径: 静态路径, a: Express): Express {
  return _不安全的创建Express(a[参数].接口们, [...a[参数].静态路径们, 静态路径], a[参数].监听端口)
}
export function 挂载接口<A extends _Check, _Check = Check<[IsExpress接口<A>], A>>(接口: A, a: Express): Express {
  return _不安全的创建Express([...a[参数].接口们, 接口], a[参数].静态路径们, a[参数].监听端口)
}
export function 启动Express服务(a: Express): Effect<null> {
  return Effect(() => {
    if (isNaN(a[参数].监听端口)) {
      throw new Error('监听端口为NaN')
    }

    var app = express()

    // 中文路径转换
    app.use(function (req: Request, res: Response, next: NextFunction) {
      var url对象 = url.parse(req.url)
      if (url对象.pathname == null || url对象.path == null) return next()
      req.url = req.originalUrl = url对象.path.replace(url对象.pathname, decodeURIComponent(url对象.pathname))
      next()
    })

    for (var 静态路径 of a[参数].静态路径们) {
      console.log(静态路径)
      var 静态配置数据 = 静态路径F.解包(静态路径)
      app.use(静态配置数据.访问路径, express.static(静态配置数据.文件夹路径))
    }

    for (var 接口 of a[参数].接口们) {
      var 描述 = 获得接口描述(接口)
      app.use(
        ((描述) =>
          async function (req, res, next) {
            if (req.path != 描述.访问路径) return next()
            var 中间件列表 = 描述.使用的中间件们
            for (var 中间件 of 中间件列表) {
              var 中间件实现 = 获得中间件实现(中间件)
              await new Promise((resP, rejP) => 中间件实现(req, res, resP))
            }
            await 转为Promise(描述.接口实现(req, res))
          })(描述),
      )
    }

    app.use(function (req, res) {
      res.send('页面不存在')
    })

    var 监听端口 = a[参数].监听端口
    app.listen(监听端口, () => {
      log(
        D,
        '已启动: %O',
        Object.values(os.networkInterfaces())
          .flat()
          .map((a) => a?.address)
          .map((a) => `http://${a}:${监听端口}`),
      )
    })
    return null
  })
}
