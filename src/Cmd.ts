import { Kysely, MysqlDialect } from 'kysely'
import Database from '../tools/types/Database'
import { App } from './Model/App'
import { Aff } from './Package/Aff/Aff'
import { Debug } from './Package/Debug/Debug'
import { Effect } from './Package/Effect/Effect'

var app = App.App(({ DB_HOST, DB_PORT, DB_USER, DB_PWD, DB_NAME }) =>
  Aff.do()
    .bind('d', (env) => Aff.pure(Debug.Debug('App:Cmd')))
    .run((env) => Aff.提升Effect(env.d.log('hello'))),
)
app.运行().不带回调运行().运行()
