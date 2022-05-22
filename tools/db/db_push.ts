import { FileMigrationProvider, Kysely, Migrator, MysqlDialect } from 'kysely'
import path from 'path'
import { 获得环境变量 } from '../../lib/getEnv'
import { 新建数据库 } from './lib'

async function main() {
    获得环境变量()
    var DB_HOST = process.env['DB_HOST']
    var DB_PORT = Number(process.env['DB_PORT'])
    var DB_USER = process.env['DB_USER']
    var DB_PWD = process.env['DB_PWD']
    var DB_NAME = process.env['DB_NAME']

    await 新建数据库()

    var db = new Kysely<any>({
        dialect: new MysqlDialect({ host: DB_HOST, port: DB_PORT, user: DB_USER, password: DB_PWD, database: DB_NAME }),
    })

    var migrator = new Migrator({
        db,
        provider: new FileMigrationProvider(path.resolve(__dirname, '../migrations')),
    })

    var { error, results } = await migrator.migrateToLatest()

    if (results?.length == 0) {
        console.log('没有要更新的描述')
        db.destroy()
    }

    results?.forEach((it) => {
        if (it.status === 'Success') {
            console.log(`migration "${it.migrationName}" was executed successfully`)
        } else if (it.status === 'Error') {
            console.error(`failed to execute migration "${it.migrationName}"`)
        }
        db.destroy()
    })

    if (error) {
        console.error('failed to run `migrateToLatest`')
        console.error(error)
        db.destroy()
    }
}

main()
