import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import session from 'express-session'
import path from 'path'
import sessionFileStore from 'session-file-store'
import { Aff } from '../../Package/Aff/Aff'
import { Express } from '../../Package/Express/Express'
import { 中间件 } from '../../Package/Express/中间件'
import { 接口_ED模式 } from '../../Package/Express/接口_ED模式'
import { 接口_原始模式 } from '../../Package/Express/接口_原始模式'
import { 静态路径 } from '../../Package/Express/静态路径'
import { AppEnv } from '../通用模型/AppEnv'
import { 创建Kysely中间件 } from '../通用模型/创建Kysely中间件'
import 测试接口_ED模式 from './Interface/测试接口_ED模式/Index'
import 测试接口_原始模式 from './Interface/测试接口_原始模式/Index'

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
      var express实例 = new Express(
        [new 静态路径('/', path.resolve(__dirname, '../../../web'))],
        [
          new 接口_原始模式(常用中间件, '/api/测试接口_原始模式', 测试接口_原始模式),
          new 接口_ED模式(常用中间件, '/api/测试接口_ED模式', 测试接口_ED模式),
        ],
        [
          {
            事件名称: 'console',
            事件函数: (socket) =>
              new Aff(async () => {
                console.log('connection')
                return null
              }),
          },
        ],
        APP_PORT,
      )
      await express实例.启动服务().运行为Promise()
      return null
    }),
)
  .运行()
  .不带回调运行()
