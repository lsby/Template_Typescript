import cookieParser from 'cookie-parser'
import express from 'express'
import session from 'express-session'
import path from 'path'
import sessionFileStore from 'session-file-store'
// import { knex_defConf } from './Middleware/Knex'
import { runEffect } from '@lsby/ts_pattern'
import cors from 'cors'
import * as 测试接口_ED模式 from './Interface/测试接口_ED模式/Index'
import * as 测试接口_底层模式 from './Interface/测试接口_底层模式/Index'
import kysely from './Middleware/Kysely'
import { App, 运行 } from './Model/App/App'
import { Debug, log } from './Package/Debug/Debug'
import { Express, 启动Express服务, 挂载接口, 添加静态路径, 设置监听端口 } from './Package/Express/Express'
import { 中间件 } from './Package/Express/Middleware'
import { 接口_ED模式 } from './Package/Express/Interface_ED_Mode'
import { 接口_底层模式 } from './Package/Express/Interface_Raw_Mode'
import { 静态路径 } from './Package/Express/StaticFile'

var D = Debug('App:Service')
log(D, '==============')

declare module 'express-session' {
  interface SessionData {
    // 在这里扩展 session 对象
  }
}

var app = App(async ({ DB_HOST, DB_PORT, DB_USER, DB_PWD, DB_NAME, APP_PORT, SESSION_SECRET }) => {
  var 常用中间件 = [
    中间件(cors()),
    中间件(express.json()),
    中间件(express.urlencoded({ extended: true })),
    中间件(cookieParser()),
    中间件(kysely({ host: DB_HOST, port: DB_PORT, user: DB_USER, password: DB_PWD, database: DB_NAME })),
    // 中间件(knex_defConf({ host: DB_HOST, port: DB_PORT, user: DB_USER, password: DB_PWD, database: DB_NAME })),
    中间件(
      session({
        secret: SESSION_SECRET,
        saveUninitialized: false,
        resave: false,
        store: new (sessionFileStore(session))({ path: path.resolve(__dirname, '../../sessions') }),
      }),
    ),
  ]

  var express实例 = Express()
  express实例 = 添加静态路径(静态路径('/', path.resolve(__dirname, '../web')), express实例)
  express实例 = 挂载接口(接口_底层模式(常用中间件, '/api/测试接口_底层模式', 测试接口_底层模式.default), express实例)
  express实例 = 挂载接口(接口_ED模式(常用中间件, '/api/测试接口_ED模式', 测试接口_ED模式.default), express实例)
  express实例 = 设置监听端口(APP_PORT, express实例)
  return runEffect(启动Express服务(express实例))
})
runEffect(运行(app))
