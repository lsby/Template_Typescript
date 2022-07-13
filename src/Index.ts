import cookieParser from 'cookie-parser'
import express from 'express'
import fs from 'fs'
import os from 'os'
import path from 'path'
import 中文路径支持 from './Middleware/ChinesePath'
import 接口 from './Middleware/Interface'
import session from './Middleware/Session'
// import { knex_defConf } from './Middleware/Knex'
import kysely from './Middleware/Kysely'
import cors from 'cors'
import { 获得环境变量 } from '../lib/getEnv'

async function main() {
  var { DB_HOST, DB_PORT, DB_USER, DB_PWD, DB_NAME, APP_PORT } = 获得环境变量()

  var app = express()

  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(cookieParser())
  app.use(中文路径支持())
  app.use(kysely({ host: DB_HOST, port: DB_PORT, user: DB_USER, password: DB_PWD, database: DB_NAME }))
  // app.use(knex_defConf({ host: DB_HOST, port: DB_PORT, user: DB_USER, password: DB_PWD, database: DB_NAME }))
  app.use(session({ 检查时间: 1000 * 60 * 30, 过期时间: 1000 * 60 * 30 }))

  app.use('/', express.static(path.resolve(__dirname, '../web')))
  app.use('/Static', express.static(path.resolve(__dirname, '../../src/Page/Static')))
  app.use('/Static_Jquery', express.static(path.resolve(__dirname, '../../node_modules/jquery/dist')))
  app.use('/Static_Layer', express.static(path.resolve(__dirname, '../../node_modules/layer-src/src')))

  var 接口们 = fs.readdirSync(path.resolve(__dirname, './Interface'))
  for (var name of 接口们) {
    var file = await import(`./Interface/${name}/index`)
    app.use(
      接口({
        路径: '/api/' + name,
        实现: file.default,
      }),
    )
  }

  app.listen(APP_PORT, () => {
    console.log(`==============`)
    console.log(`start:`)
    console.log(
      `${Object.values(os.networkInterfaces())
        .flat()
        .map((a) => a?.address)
        .map((a) => `\thttp://${a}:${APP_PORT}`)
        .join('\n')}`,
    )
  })
}

main()
