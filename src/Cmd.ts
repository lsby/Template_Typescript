import { Effect } from '@lsby/ts_pattern'
import { Kysely, MysqlDialect } from 'kysely'
import Database from '../tools/types/Database'
import { App, 运行 } from './Model/App/App'
import { Aff, runAff_ } from './Package/Aff/Aff'
import * as Aff_F from './Package/Aff/Aff'
import { Debug, error } from './Package/Debug/Debug'

function _main(): Aff<null, null> {
  var D = Debug('App:Cmd')

  var app = App(({ DB_HOST, DB_PORT, DB_USER, DB_PWD, DB_NAME }) => {
    return Aff(async () => {
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
        await Aff_F.call(null, main(kysely))
        return null
      } catch (e) {
        error(D, '出错了:', e)
      } finally {
        if (kysely != null) kysely.destroy()
        return null
      }
    })
  })
  return 运行(app)
}
runAff_(null, _main())

function main(kysely: Kysely<Database>): Aff<null, null> {
  return Aff(async () => {
    console.log('hello, world!')
    return null
  })
}
