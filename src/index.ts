import cookieParser from 'cookie-parser'
import express from 'express'
import fs from 'fs'
import os from 'os'
import path from 'path'
import 中文路径支持 from './middleware/chinesePath'
import 接口 from './middleware/interface'
import session from './middleware/session'
import allowOrigin from './middleware/allowOrigin'
import knex from './middleware/knex'
import kysely from './middleware/kysely'
import { 获得环境变量 } from '../lib/getEnv'

async function main() {
    获得环境变量()

    var DB_HOST = process.env['DB_HOST']
    var DB_PORT = Number(process.env['DB_PORT'])
    var DB_USER = process.env['DB_USER']
    var DB_PWD = process.env['DB_PWD']
    var DB_NAME = process.env['DB_NAME']
    var APP_PORT = Number(process.env['APP_PORT'])

    var app = express()

    // 跨域
    // app.all('*', allowOrigin())

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser())
    app.use(中文路径支持())
    app.use(kysely({ host: DB_HOST, port: DB_PORT, user: DB_USER, password: DB_PWD, database: DB_NAME }))
    // app.use(
    //     knex({
    //         client: 'mysql',
    //         connection: { host: DB_HOST, port: DB_PORT, user: DB_USER, password: DB_PWD, database: DB_NAME },
    //         pool: { min: 0, max: 7 },
    //         asyncStackTraces: NODE_ENV == 'development' ? true : false,
    //     }),
    // )
    app.use(session({ 检查时间: 1000 * 60 * 30, 过期时间: 1000 * 60 * 30 }))

    app.get('/', (req, res) => res.end('hello, world!'))

    var 接口们 = fs.readdirSync(path.resolve(__dirname, './interface'))
    for (var name of 接口们) {
        var file = await import(`./interface/${name}/index`)
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
