import { Kysely, MysqlDialect } from 'kysely'
import { 获得环境变量 } from './Lib/GetEnv'
import Database from '../tools/types/Database'
import { Effect, liftEffect, runEffect } from './Model/Effect'
import { map } from './Class/Functor'
import { Just, Nothing } from './Model/Maybe'

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
  var x1 = liftEffect(1)
  var y2 = map((a) => a + 1, x1)
  var z1 = Nothing()
  var z2 = map((a: unknown) => (a as any) + 1, z1)
  var z3 = Just(1)
  var z4 = map((a) => a + 1, z3)

  console.log(z4)
}
