import { Kysely, MysqlDialect } from 'kysely'
import Database from '../../../tools/types/Database'
import { Aff } from '../../Package/Aff/Aff'

export var 创建Kysely: (env: any) => Aff<Kysely<Database>> = ({ DB_HOST, DB_PORT, DB_USER, DB_PWD, DB_NAME }) =>
  new Aff(async () => {
    return new Kysely<Database>({
      dialect: new MysqlDialect({
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PWD,
        database: DB_NAME,
      }),
    })
  })
