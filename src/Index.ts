import cookieParser from 'cookie-parser'
import express from 'express'
import session from 'express-session'
import path from 'path'
import sessionFileStore from 'session-file-store'
import 中文路径支持 from './Middleware/ChinesePath'
// import { knex_defConf } from './Middleware/Knex'
import { runEffect, Effect } from '@lsby/ts_pattern'
import cors from 'cors'
import * as 测试接口_ED模式 from './Interface/测试接口_ED模式/Index'
import * as 测试接口_底层模式 from './Interface/测试接口_底层模式/Index'
import { 获得环境变量 } from './Lib/GetEnv'
import kysely from './Middleware/Kysely'
import { Express, 启动服务, 挂载接口 } from './Package/Express/Express'
import { 中间件 } from './Package/Express/中间件'
import { 接口_ED模式 } from './Package/Express/接口_ED模式'
import { 接口_底层模式 } from './Package/Express/接口_底层模式'
import { 静态路径 } from './Package/Express/静态路径'

declare module 'express-session' {
  interface SessionData {
    // 在这里扩展 session 对象
  }
}

async function main(): Promise<Effect<null>> {
  var { DB_HOST, DB_PORT, DB_USER, DB_PWD, DB_NAME, APP_PORT, SESSION_SECRET } = 获得环境变量()

  var 常用中间件 = [
    中间件(cors()),
    中间件(express.json()),
    中间件(express.urlencoded({ extended: true })),
    中间件(cookieParser()),
    中间件(中文路径支持()),
    中间件(kysely({ host: DB_HOST, port: DB_PORT, user: DB_USER, password: DB_PWD, database: DB_NAME })),
    // 中间件(knex_defConf({ host: DB_HOST, port: DB_PORT, user: DB_USER, password: DB_PWD, database: DB_NAME })),
    中间件(
      session({
        secret: SESSION_SECRET,
        saveUninitialized: false,
        resave: false,
        store: new (sessionFileStore(session))(),
      }),
    ),
  ]

  var express实例 = Express([静态路径('/', path.resolve(__dirname, '../web'))], APP_PORT)
  express实例 = 挂载接口(express实例, 接口_底层模式(常用中间件, '/api/测试接口_底层模式', 测试接口_底层模式.default))
  express实例 = 挂载接口(express实例, 接口_ED模式(常用中间件, '/api/测试接口_ED模式', 测试接口_ED模式.default))

  return 启动服务(express实例)
}
main().then((eff) => runEffect(eff))
