import readlineSync from 'readline-sync'
import { 获得环境变量 } from '../../lib/getEnv'
import { 删除所有表 } from './lib'

async function main() {
    获得环境变量()
    var DB_HOST = process.env['DB_HOST']
    var DB_PORT = Number(process.env['DB_PORT'])
    var DB_USER = process.env['DB_USER']
    var DB_PWD = process.env['DB_PWD']
    var DB_NAME = process.env['DB_NAME']

    if (DB_HOST == null || DB_PORT == null || DB_USER == null || DB_PWD == null || DB_NAME == null) {
        throw '环境变量错误'
    }

    process.stdout.write(`本操作将清除和清空数据库${DB_HOST}:${DB_NAME}, 所有表结构和数据都将丢失, 确定吗?[y/N]`)
    var yes = readlineSync.question()
    if (yes != 'y' && yes != 'Y') {
        console.log('用户取消了操作')
        return
    }

    console.log('删除所有表...')

    await 删除所有表({
        DB_HOST,
        DB_PORT,
        DB_USER,
        DB_PWD,
        DB_NAME,
    })
}
main()
