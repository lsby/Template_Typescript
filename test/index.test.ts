import 'mocha'
import { Kysely, MysqlDialect } from 'kysely'
import Database from '../tools/types/Database'
import 测试接口 from '../src/interface/测试接口/index'
import { 获得环境变量 } from '../lib/getEnv'

获得环境变量()
var DB_HOST = process.env['DB_HOST']
var DB_PORT = Number(process.env['DB_PORT'])
var DB_USER = process.env['DB_USER']
var DB_PWD = process.env['DB_PWD']
var DB_NAME = process.env['DB_NAME']

describe('框架测试', function () {
    var kysely = new Kysely<Database>({
        dialect: new MysqlDialect({ host: DB_HOST, port: DB_PORT, user: DB_USER, password: DB_PWD, database: DB_NAME }),
    })
    var req: any = { kysely }

    it('测试接口', async function () {
        var 返回值 = await 测试接口(req, { data: { a: 1, b: 2 } })
        if (返回值.结果 != 3) throw '意外的结果'
    })

    after(async function () {
        kysely.destroy()
    })
})
