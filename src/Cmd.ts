import { Kysely, MysqlDialect } from 'kysely'
import Database from '../tools/types/Database'
import { App } from './Model/App'
import { Aff } from './Package/Aff/Aff'
import { Debug } from './Package/Debug/Debug'

var 创建kysely: (env: any) => Aff<Kysely<Database>> = ({ DB_HOST, DB_PORT, DB_USER, DB_PWD, DB_NAME }) =>
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

var app = new App(({ DB_HOST, DB_PORT, DB_USER, DB_PWD, DB_NAME }) =>
  Aff.do()
    .bind('d', () => Aff.pure(new Debug('App:Cmd')))
    .bind('kysely', () => 创建kysely({ DB_HOST, DB_PORT, DB_USER, DB_PWD, DB_NAME }))
    .run((env) => Aff.提升Effect(env.d.log('hello'))),
).运行()
app.不带回调运行().运行()
