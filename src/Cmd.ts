import { Kysely, MysqlDialect } from 'kysely'
import { 获得环境变量 } from './Lib/GetEnv'
import Database from '../tools/types/Database'
import { Effect, liftEffect, runEffect } from './Model/Effect'
import { map } from './Class/Functor'
import { Just, Nothing } from './Model/Maybe'
import { addNode, Flow, runFlow } from './Model/Flow'

async function _main() {
  var { DB_HOST, DB_PORT, DB_USER, DB_PWD, DB_NAME } = 获得环境变量()
  var kysely = new Kysely<Database>({
    dialect: new MysqlDialect({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PWD,
      database: DB_NAME,
    }),
  })

  try {
    await main(kysely)
  } catch (e) {
    console.error('出错了:', e)
  } finally {
    await kysely.destroy()
  }
}
_main()

async function main(kysely: Kysely<Database>) {
  var f1 = Flow(() => 1)
  var f2 = addNode(f1, (a) => a + 1)

  console.log(runFlow(f2))
}
