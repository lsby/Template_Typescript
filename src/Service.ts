import cookieParser from 'cookie-parser'
import express from 'express'
import session from 'express-session'
import path from 'path'
import sessionFileStore from 'session-file-store'
import cors from 'cors'
import { App } from './Model/App'
import { Aff } from './Package/Aff/Aff'
import { 中间件 } from './Package/Express/中间件'
import { Express } from './Package/Express/Express'
import { 静态路径 } from './Package/Express/静态路径'
import { 接口_原始模式 } from './Package/Express/接口_原始模式'
import 测试接口_原始模式 from './Interface/测试接口_原始模式/Index'
import 测试接口_ED模式 from './Interface/测试接口_ED模式/Index'
import { 接口_ED模式 } from './Package/Express/接口_ED模式'
import kysely from './Middleware/Kysely'

declare module 'express-session' {
  interface SessionData {
    // 在这里扩展 session 对象
  }
}

var app = App.App(({ DB_HOST, DB_PORT, DB_USER, DB_PWD, DB_NAME, SESSION_SECRET, APP_PORT }) =>
  Aff.Aff(async () => {
    var 常用中间件 = [
      中间件.中间件(cors()),
      中间件.中间件(express.json()),
      中间件.中间件(express.urlencoded({ extended: true })),
      中间件.中间件(cookieParser()),
      中间件.中间件(kysely({ host: DB_HOST, port: DB_PORT, user: DB_USER, password: DB_PWD, database: DB_NAME })),
      中间件.中间件(
        session({
          secret: SESSION_SECRET,
          saveUninitialized: false,
          resave: false,
          store: new (sessionFileStore(session))({ path: path.resolve(__dirname, '../../sessions') }),
        }),
      ),
    ]
    var express实例 = Express.Express(
      [静态路径.静态路径('/', path.resolve(__dirname, '../web'))],
      [
        接口_原始模式.接口_原始模式(常用中间件, '/api/测试接口_原始模式', 测试接口_原始模式),
        接口_ED模式.接口_ED模式(常用中间件, '/api/测试接口_ED模式', 测试接口_ED模式),
      ],
      APP_PORT,
    )
    await express实例.启动服务().运行为Promise()
    return null
  }),
).运行()
app.不带回调运行().运行()
