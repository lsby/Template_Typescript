import { Kysely, MysqlDialect } from 'kysely'
import { Aff } from '../Aff/Aff'
import { 中间件 } from './Express'

export function Kysely中间件<Database>(
  DB_HOST: string,
  DB_PORT: number,
  DB_USER: string,
  DB_PWD: string,
  DB_NAME: string,
): 中间件 {
  return 中间件((req, res, next) =>
    Aff(async () => {
      req.kysely = new Kysely<Database>({
        dialect: new MysqlDialect({
          host: DB_HOST,
          port: DB_PORT,
          user: DB_USER,
          password: DB_PWD,
          database: DB_NAME,
        }),
      })
      next()
    }),
  )
}
