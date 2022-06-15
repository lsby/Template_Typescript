import { Kysely, MysqlDialect } from 'kysely'
import { 获得环境变量 } from '../lib/getEnv'
import Database from '../tools/types/Database'
import * as R from 'ramda'
import L from 'lodash'

async function main(kysely: Kysely<Database>) {
    console.log('hello, world!')
}
async function _main() {
    var { DB_HOST, DB_PORT, DB_USER, DB_PWD, DB_NAME } = 获得环境变量()
    var kysely = new Kysely<Database>({
        dialect: new MysqlDialect({
            host: DB_HOST,
            port: DB_PORT,
            user: DB_USER,
            password: DB_PWD,
            database: DB_NAME,
        }),
    })

    try {
        await main(kysely)
    } catch (e) {
        console.error('出错了:', e)
    } finally {
        await kysely.destroy()
    }
}
_main()
