import { 取对象值们 } from '@lsby/ts_type_fun'
import { Request, Response } from 'express'
import { Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { Aff } from '../Aff/Aff'
import { Express } from '../Express/Express'
import { 中间件 } from '../Express/中间件'
import { 静态路径 } from '../Express/静态路径'
import { 接口描述类型 } from './WebApp_Type'
import { 后端远程数据_服务端 } from './后端远程数据_服务端'

type _计算接口描述<数据类型, arr> = arr extends []
  ? []
  : arr extends [infer a, ...infer as]
  ? 取对象值们<a> extends [infer 路径, infer 请求类型, infer 返回类型]
    ? [
        {
          路径: 路径
          中间件: 中间件[]
          实现: (
            req: Request,
            请求数据: 请求类型,
            数据管理器: 后端远程数据_服务端<数据类型>,
            页面管理器: 后端远程数据_服务端<string>,
          ) => Aff<返回类型>
        },
        ..._计算接口描述<数据类型, as>,
      ]
    : never
  : never
type 计算接口描述<数据类型, 接口类型> = _计算接口描述<数据类型, 接口类型>

export class WebApp_服务端<数据类型 extends Record<string, unknown>, 接口类型 extends 接口描述类型[]> {
  constructor(
    private opt: {
      静态路径们: 静态路径[]
      数据初始值: 数据类型
      接口们: 计算接口描述<数据类型, 接口类型>
      SocketIO事件: {
        事件名称: string
        事件函数: (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => Aff<null>
      }[]
      监听端口: number
      数据同步名称?: string
      页面同步名称?: string
    },
  ) {}
  运行(): Aff<null> {
    var {
      静态路径们,
      数据初始值,
      接口们,
      SocketIO事件,
      监听端口,
      数据同步名称 = '数据同步事件',
      页面同步名称: 页面同步名称 = '页面同步事件',
    } = this.opt

    return new Aff(async () => {
      var 数据管理器: 后端远程数据_服务端<数据类型>
      var 页面管理器: 后端远程数据_服务端<string>
      return await new Express(
        静态路径们,
        Object.keys(接口们).map((name) => {
          var 接口描述 = (接口们 as any)[name]
          return {
            取访问路径: () => 接口描述.路径,
            取使用的中间件: () => 接口描述.中间件,
            取接口实现: () => (req: Request, res: Response) =>
              new Aff(async () => {
                var r = await 接口描述.实现(req, req.body, 数据管理器, 页面管理器).运行为Promise()
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
                数据管理器 = await 后端远程数据_服务端.创建(socket, 数据同步名称, 数据初始值).运行为Promise()
                页面管理器 = await 后端远程数据_服务端.创建(socket, 页面同步名称, '/').运行为Promise()
                return null
              }),
          },
          ...SocketIO事件,
        ],
        监听端口,
      )
        .启动服务()
        .运行为Promise()
    })
  }
}
