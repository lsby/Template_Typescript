import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import session from 'express-session'
import path from 'path'
import sessionFileStore from 'session-file-store'
import { Aff } from '../../Package/Aff/Aff'
import { 中间件 } from '../../Package/Express/中间件'
import { 静态路径 } from '../../Package/Express/静态路径'
import { WebApp_服务端 } from '../../Package/Web/WebApp_服务端'
import { AppEnv } from '../通用模型/AppEnv'
import { 创建Kysely中间件 } from '../通用模型/创建Kysely中间件'
import { 接口类型, 数据类型 } from './Types'
import WebApp接口_测试1 from './WebApp接口_测试1/index'
import WebApp接口_测试2 from './WebApp接口_测试2/index'
import WebApp接口_测试3 from './WebApp接口_测试3/index'

export default new AppEnv(
  ({ DB_HOST, DB_PORT, DB_USER, DB_PWD, DB_NAME, SESSION_SECRET, APP_PORT }) =>
    new Aff(async () => {
      var 常用中间件 = [
        new 中间件(cors()),
        new 中间件(express.json()),
        new 中间件(express.urlencoded({ extended: true })),
        new 中间件(cookieParser()),
        new 中间件(
          创建Kysely中间件({ host: DB_HOST, port: DB_PORT, user: DB_USER, password: DB_PWD, database: DB_NAME }),
        ),
        new 中间件(
          session({
            secret: SESSION_SECRET,
            saveUninitialized: false,
            resave: false,
            store: new (sessionFileStore(session))({ path: path.resolve(__dirname, '../../../../sessions') }),
          }),
        ),
      ]

      var wepApp = new WebApp_服务端<数据类型, 接口类型>({
        静态路径们: [new 静态路径('/', path.resolve(__dirname, '../../../web'))],
        数据初始值: { 这是数据: 'aaa' },
        接口们: [
          { 路径: '/api/测试接口1', 中间件: 常用中间件, 实现: WebApp接口_测试1 },
          { 路径: '/api/测试接口2', 中间件: 常用中间件, 实现: WebApp接口_测试2 },
          { 路径: '/api/测试接口3', 中间件: 常用中间件, 实现: WebApp接口_测试3 },
        ],
        SocketIO事件: [],
        监听端口: APP_PORT,
      })
      await wepApp.运行().运行为Promise()
      return null
    }),
)
  .运行()
  .不带回调运行()
