import express, { NextFunction, Request, Response } from 'express'
import http from 'http'
import os from 'os'
import socketIO, { Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import url from 'url'
import * as uuid from 'uuid'
import * as A from '../Aff/Aff'
import { Aff } from '../Aff/Aff'
import { Debug, err, log } from '../Debug/Debug'
import * as E from '../Eff/Eff'

var D = Debug('Package:Express')

// 接口
const _路径: unique symbol = Symbol()
const _实现: unique symbol = Symbol()
export type 接口 = {
  [_路径]: string
  [_实现]: (req: Request, res: Response) => Aff<void>
}

export function 接口<R extends { err: string } | { err: null; data: any }>(
  路径: string,
  实现: (req: Request, res: Response) => Aff<R>,
): 接口 {
  return {
    [_路径]: 路径,
    [_实现]: (req: Request, res: Response) =>
      Aff(async () => {
        var 调用id = uuid.v4()
        var 调用时间 = new Date().getTime()
        try {
          E.run(
            log(D, '%o', {
              行为: '调用开始',
              调用id,
              路径: req.path,
              参数: req.body,
            }),
          )
          var c = await A.run(实现(req, res))
          E.run(
            log(D, '%o', {
              行为: '调用结束',
              调用id,
              路径: req.path,
              结果: '成功',
              调用消耗时间: new Date().getTime() - 调用时间,
              参数: req.body,
              返回值: c,
            }),
          )
          res.send(c)
        } catch (e) {
          var errObj = e
          E.run(
            err(D, '%o', {
              行为: '调用结束',
              调用id,
              路径: req.path,
              结果: '失败',
              调用消耗时间: new Date().getTime() - 调用时间,
              参数: req.body,
              异常: errObj,
            }),
          )
          res.send({ err: errObj, data: null })
        }
      }),
  }
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
  [_中间件实现]: (req: Request, res: Response, next: NextFunction) => Aff<void>
}

export function 中间件(实现: (req: Request, res: Response, next: NextFunction) => Aff<void>): 中间件 {
  return { [_中间件实现]: 实现 }
}

export function 包装原始中间件(a: (req: Request, res: Response, next: NextFunction) => void): 中间件 {
  return 中间件((req, res, next) => Aff(async () => a(req, res, next)))
}

// Express
const _中间件们: unique symbol = Symbol()
const _静态路径们: unique symbol = Symbol()
const _接口们: unique symbol = Symbol()
const _监听端口: unique symbol = Symbol()
const _SocketIO事件们: unique symbol = Symbol()

export type SocketIO事件 = {
  事件名称: string
  事件函数: (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => Aff<void>
}

export type Express = {
  [_中间件们]: 中间件[]
  [_静态路径们]: 静态路径[]
  [_接口们]: 接口[]
  [_监听端口]: number
  [_SocketIO事件们]: SocketIO事件[]
}

export function Express<A extends 中间件, B extends 静态路径, C extends 接口>(
  中间件们: A[],
  静态路径们: B[],
  接口们: C[],
  SocketIO事件们: SocketIO事件[],
  监听端口: number,
): Express {
  return {
    [_中间件们]: 中间件们,
    [_静态路径们]: 静态路径们,
    [_接口们]: 接口们,
    [_监听端口]: 监听端口,
    [_SocketIO事件们]: SocketIO事件们,
  }
}

export function run(exp: Express): E.Eff<void> {
  return E.Eff(() => {
    var app = express()

    // 中文路径转换
    app.use(function (req: Request, res: Response, next: NextFunction) {
      var url对象 = url.parse(req.url)
      if (url对象.pathname == null || url对象.path == null) return next()
      req.url = req.originalUrl = url对象.path.replace(url对象.pathname, decodeURIComponent(url对象.pathname))
      next()
    })

    for (let 中间件 of exp[_中间件们]) {
      app.use((...a) => A.run(中间件[_中间件实现](...a)))
    }

    for (let 静态路径 of exp[_静态路径们]) {
      app.use(静态路径[_访问路径], express.static(静态路径[_本地路径]))
    }

    for (let 接口 of exp[_接口们]) {
      app.post(接口[_路径], (req: Request, res: Response) => A.run(接口[_实现](req, res)))
    }

    app.use(function (req, res) {
      res.send('页面不存在')
    })

    var server = http.createServer(app)

    var io = new socketIO.Server(server)
    for (var 事件 of exp[_SocketIO事件们]) {
      io.on(事件.事件名称, (e) => A.run(事件.事件函数(e)))
    }

    server.listen(exp[_监听端口], () => {
      E.run(
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
