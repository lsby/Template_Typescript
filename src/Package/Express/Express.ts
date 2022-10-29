import express, { NextFunction, Request, Response } from 'express'
import { Aff } from '../Aff/Aff'
import url from 'url'
import http from 'http'
import os from 'os'
import { Debug, log } from '../Debug/Debug'
import * as Eff from '../Eff/Eff'

var D = Debug('Package:Express')

// 接口
const _路径: unique symbol = Symbol()
const _实现: unique symbol = Symbol()
export type 接口 = {
  [_路径]: string
  [_实现]: (req: Request, res: Response) => void
}

export function 接口<R extends { err: string } | { err: null; data: any }>(
  路径: string,
  实现: (req: Request, res: Response) => Aff<R>,
): 接口 {
  return { [_路径]: 路径, [_实现]: 实现 }
}

// 静态路径
const _访问路径: unique symbol = Symbol()
const _本地路径: unique symbol = Symbol()
export type 静态路径 = {
  [_访问路径]: string
  [_本地路径]: string
}

export function 静态路径(访问路径: string, 本地路径: string): 静态路径 {
  return { [_访问路径]: 访问路径, [_本地路径]: 本地路径 }
}

// 中间件
const _中间件实现: unique symbol = Symbol()
export type 中间件 = {
  [_中间件实现]: (req: Request, res: Response, next: NextFunction) => any
}

export function 中间件(实现: (req: Request, res: Response, next: NextFunction) => any) {
  return { [_中间件实现]: 实现 }
}

// Express
const _中间件们: unique symbol = Symbol()
const _静态路径们: unique symbol = Symbol()
const _接口们: unique symbol = Symbol()
const _监听端口: unique symbol = Symbol()
export type Express = {
  [_中间件们]: 中间件[]
  [_静态路径们]: 静态路径[]
  [_接口们]: 接口[]
  [_监听端口]: number
}

export function Express<A extends 中间件, B extends 静态路径, C extends 接口>(
  中间件们: A[],
  静态路径们: B[],
  接口们: C[],
  监听端口: number,
): Express {
  return { [_中间件们]: 中间件们, [_静态路径们]: 静态路径们, [_接口们]: 接口们, [_监听端口]: 监听端口 }
}

export function run(exp: Express): Eff.Eff<void> {
  return Eff.Eff(() => {
    var app = express()

    // 中文路径转换
    app.use(function (req: Request, res: Response, next: NextFunction) {
      var url对象 = url.parse(req.url)
      if (url对象.pathname == null || url对象.path == null) return next()
      req.url = req.originalUrl = url对象.path.replace(url对象.pathname, decodeURIComponent(url对象.pathname))
      next()
    })

    for (var 中间件 of exp[_中间件们]) {
      app.use(中间件[_中间件实现])
    }

    for (var 静态路径 of exp[_静态路径们]) {
      app.use(静态路径[_访问路径], express.static(静态路径[_本地路径]))
    }

    for (var 接口 of exp[_接口们]) {
      app.post(接口[_路径], 接口[_实现])
    }

    app.use(function (req, res) {
      res.send('页面不存在')
    })

    var server = http.createServer(app)
    server.listen(exp[_监听端口], () => {
      Eff.run(
        log(
          D,
          '已启动: %O',
          Object.values(os.networkInterfaces())
            .flat()
            .map((a) => a?.address)
            .map((a) => `http://${a}:${exp[_监听端口]}`),
        ),
      )
    })
  })
}
