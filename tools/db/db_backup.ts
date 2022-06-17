import mysqldump from 'mysqldump'
import path from 'path'
import { 获得环境变量 } from '../../lib/getEnv'

async function main() {
    var { DB_HOST, DB_PORT, DB_USER, DB_PWD, DB_NAME } = 获得环境变量()
    await mysqldump({
        connection: {
            host: DB_HOST,
            port: DB_PORT,
            user: DB_USER,
            password: DB_PWD,
            database: DB_NAME,
        },
        dumpToFile: path.resolve(__dirname, `../../../dump/${new Date().getTime()}.sql`),
    })
}

main()
