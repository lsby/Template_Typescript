import { Request, Response } from 'express'
import { Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { Aff } from '../Aff/Aff'
import { Express } from '../Express/Express'
import { 中间件 } from '../Express/中间件'
import { 静态路径 } from '../Express/静态路径'
import { 后端远程数据_服务端 } from './后端远程数据_服务端'

export interface WebApp接口<数据类型> {
  取访问路径(): string
  取使用的中间件(): 中间件[]
  取接口实现(): (
    req: Request,
    数据: 后端远程数据_服务端<数据类型>,
    页面: 后端远程数据_服务端<string>,
  ) => Aff<Record<string, any>>
}

export class WebApp_服务端<数据类型 extends Record<string, unknown>> {
  constructor(
    private 静态路径们: 静态路径[],
    private 接口们: WebApp接口<数据类型>[],
    private SocketIO事件: {
      事件名称: string
      事件函数: (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => Aff<null>
    }[],
    private 监听端口: number,
    private 数据: 数据类型,
    private 数据同步名称: string = '数据同步事件',
    private 路由同步名称: string = '路由同步事件',
  ) {}
  运行(): Aff<null> {
    return new Aff(async () => {
      var 数据: 后端远程数据_服务端<数据类型>
      var 路由: 后端远程数据_服务端<string>
      return await new Express(
        this.静态路径们,
        this.接口们.map((f) => {
          return {
            取访问路径: f.取访问路径,
            取使用的中间件: f.取使用的中间件,
            取接口实现: () => (req: Request, res: Response) =>
              new Aff(async () => {
                var r = await f.取接口实现()(req, 数据, 路由).运行为Promise()
                res.send(r)
                return null
              }),
          }
        }),
        [
          {
            事件名称: 'connection',
            事件函数: (socket) =>
              new Aff(async () => {
                数据 = await 后端远程数据_服务端.创建(socket, this.数据同步名称, this.数据).运行为Promise()
                路由 = await 后端远程数据_服务端.创建(socket, this.路由同步名称, '/').运行为Promise()
                return null
              }),
          },
          ...this.SocketIO事件,
        ],
        this.监听端口,
      )
        .启动服务()
        .运行为Promise()
    })
  }
}
