// npm i express@^4.17.3
import express, { NextFunction, Request, Response } from 'express'
import http from 'http'
import os from 'os'
import socketIO, { Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import url from 'url'
import { Aff } from '../Aff/Aff'
import { Debug } from '../Debug/Debug'
import { 接口 } from './接口'
import { 静态路径 } from './静态路径'

export class Express {
  constructor(
    private 静态路径们: 静态路径[],
    private 接口们: 接口[],
    private SocketIO事件: {
      [key: string]: (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => void
    },
    private 监听端口: number,
  ) {}
  启动服务(): Aff<null> {
    return new Aff(async () => {
      var D = new Debug('Package:Express')
      var app = express()

      // 中文路径转换
      app.use(function (req: Request, res: Response, next: NextFunction) {
        var url对象 = url.parse(req.url)
        if (url对象.pathname == null || url对象.path == null) return next()
        req.url = req.originalUrl = url对象.path.replace(url对象.pathname, decodeURIComponent(url对象.pathname))
        next()
      })

      for (var 静态路径 of this.静态路径们) {
        app.use(静态路径.取访问路径(), express.static(静态路径.取文件夹路径()))
      }

      for (var 接口 of this.接口们) {
        app.use(
          ((接口) =>
            async function (req, res, next) {
              if (req.path != 接口.取访问路径()) return next()
              var 中间件列表 = 接口.取使用的中间件()
              for (var 中间件 of 中间件列表) {
                var 中间件实现 = 中间件.取实现()
                await new Promise((resP, rejP) => 中间件实现(req, res, resP))
              }
              await 接口.取接口实现()(req, res).运行为Promise()
            })(接口),
        )
      }

      app.use(function (req, res) {
        res.send('页面不存在')
      })

      var server = http.createServer(app)
      var io = new socketIO.Server(server)
      for (var name of Object.keys(this.SocketIO事件)) {
        io.on(name, this.SocketIO事件[name])
      }

      var 监听端口 = this.监听端口
      server.listen(监听端口, () => {
        D.log(
          '已启动: %O',
          Object.values(os.networkInterfaces())
            .flat()
            .map((a) => a?.address)
            .map((a) => `http://${a}:${监听端口}`),
        ).运行()
      })
      return null
    })
  }
}
