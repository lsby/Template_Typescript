import path from 'path'
import * as A from './Package/Aff/Aff'
import { Debug } from './Package/Debug/Debug'
import { App, 环境对应表 } from './Package/Env/Env'
import { Express, 接口 } from './Package/Express/Express'
import * as Exp from './Package/Express/Express'
import express from 'express'
import cookieParser from 'cookie-parser'
import { Kysely中间件 } from './Package/Express/Kysely中间件'
import Database from '../tools/types/Database'

var D = Debug('App:Cmd')

type 环境变量 = {
  APP_PORT: number
  DB_HOST: string
  DB_PORT: number
  DB_USER: string
  DB_PWD: string
  DB_NAME: string
}
var 环境变量表 = 环境对应表({
  dev: path.resolve(__dirname, '../../.env/dev.env'),
  re: path.resolve(__dirname, '../../.env/re.env'),
  prod: path.resolve(__dirname, '../../.env/prod.env'),
  fix: path.resolve(__dirname, '../../.env/fix.env'),
})

var 程序 = (env: 环境变量) => {
  var exp = Express(
    [
      Exp.包装原始中间件(express.json()),
      Exp.包装原始中间件(express.urlencoded({ extended: true })),
      Exp.包装原始中间件(cookieParser()),
      Kysely中间件<Database>(env.DB_HOST, env.DB_PORT, env.DB_USER, env.DB_PWD, env.DB_NAME),
    ],
    [],
    [
      接口('/api/测试接口', (req, res) =>
        A.Aff(async () => {
          var c = req.body.a + req.body.b
          return { err: null, data: c }
        }),
      ),
    ],
    env.APP_PORT,
  )
  return A.提升到Aff(Exp.run(exp))
}

var app = App<环境变量>(环境变量表, 程序)
A.run(app)
