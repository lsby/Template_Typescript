import { Kysely, MysqlDialect } from 'kysely'
import Database from '../tools/types/Database'
import { App } from './Model/App'
import { Aff } from './Package/Aff/Aff'
import { Effect } from './Package/Effect/Effect'

var app = App.App(({ DB_HOST, DB_PORT, DB_USER, DB_PWD, DB_NAME }) => {
  return Aff.Aff(async () => {
    console.log(111)
    return null
  })
})
app.运行().不带回调运行().运行()
