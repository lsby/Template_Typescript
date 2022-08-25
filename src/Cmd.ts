import { runEffect } from '@lsby/ts_pattern'
import { Kysely, MysqlDialect } from 'kysely'
import Database from '../tools/types/Database'
import { App, 运行 } from './Model/App/App'
import { Aff, runAff_ } from './Package/Aff/Aff'
import { Debug, error, log } from './Package/Debug/Debug'

var D = Debug('App:Cmd')
log(D, '==============')

var app = App(({ DB_HOST, DB_PORT, DB_USER, DB_PWD, DB_NAME }) =>
  Aff(async () => {
    var kysely
    try {
      kysely = new Kysely<Database>({
        dialect: new MysqlDialect({
          host: DB_HOST,
          port: DB_PORT,
          user: DB_USER,
          password: DB_PWD,
          database: DB_NAME,
        }),
      })
      await main(kysely)
    } catch (e) {
      error(D, '出错了:', e)
    } finally {
      if (kysely != null) kysely.destroy()
      return null
    }
  }),
)
runEffect(runAff_(运行(app)))

async function main(kysely: Kysely<Database>) {
  console.log('hello, world!')
}
