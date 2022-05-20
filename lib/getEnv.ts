import path from 'path'
import dotenv from 'dotenv'

export function 获得环境变量() {
    if (process.env['NODE_ENV'] == 'development') {
        console.log('使用 dev 环境')
        dotenv.config({ path: path.resolve(__dirname, '../../.env/dev.env') })
    } else if (process.env['NODE_ENV'] == 'release') {
        console.log('使用 release 环境')
        dotenv.config({ path: path.resolve(__dirname, '../../.env/release.env') })
    } else if (process.env['NODE_ENV'] == 'production') {
        console.log('使用 production 环境')
        dotenv.config({ path: path.resolve(__dirname, '../../.env/prod.env') })
    } else {
        throw '没有指定运行环境'
    }

    var NODE_ENV = process.env['NODE_ENV']
    var DB_HOST = process.env['DB_HOST']
    var DB_PORT = Number(process.env['DB_PORT'])
    var DB_USER = process.env['DB_USER']
    var DB_PWD = process.env['DB_PWD']
    var DB_NAME = process.env['DB_NAME']
    var APP_PORT = Number(process.env['APP_PORT'])

    if (
        DB_HOST == null ||
        DB_PORT == null ||
        DB_USER == null ||
        DB_PWD == null ||
        DB_NAME == null ||
        APP_PORT == null
    ) {
        throw '环境变量错误'
    }
    if (isNaN(DB_PORT) || isNaN(APP_PORT)) {
        throw '环境变量错误'
    }

    return { NODE_ENV, DB_HOST, DB_PORT, DB_USER, DB_PWD, DB_NAME, APP_PORT }
}
