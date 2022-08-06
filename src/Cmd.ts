import { Kysely, MysqlDialect } from 'kysely'
import { 获得环境变量 } from './Lib/GetEnv'
import Database from '../tools/types/Database'
import { Effect, liftEffect, runEffect } from './Model/Effect'
import { map } from './Class/函子'
import * as F2 from './Model/Flow2'
import { Array, bind, toJsArray } from './Model/Array'
import * as R2 from './Model/Recursion2'
import { Flow } from './Model/Flow'
import { Recursion } from './Model/Recursion'
import { Maybe } from './Model/Maybe'

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
  // var f1 = Flow((a: number) => a + 1)
  // var f2 = addNode(f1, (a) => a + 1)
  // var x1 = bind(Array([1, 2, 3]), (a) => bind(Array([2, 3, 4]), (b) => Array([a + b])))
  // var x2 = Recursion(
  //   (a) => a <= 100,
  //   (a: number) => a + 1,
  //   (a) => a,
  //   (s, a) => s + a,
  // )
  // var c1 = F2.Flow((a: number) => a)
  // var c2 = R2.Recursion(
  //   (a) => a <= 100,
  //   (a: number) => a + 1,
  //   c1,
  //   (s: any, a: any) => s + a,
  // )
  // console.log(R2.runRecursion(c2, 1, 0))
  // var f1 = new Flow((a: number) => a + 1)
  // var f2 = f1.addNode((a) => a + 1)
  // var f = new Flow((a: number) => a)
  // var f3 = new Recursion(
  //   (a) => a <= 100,
  //   (a: number) => a + 1,
  //   f,
  //   (s: number, a: number) => s + a,
  // )
  // console.log(f3.run(1, 0))

  var x = new Maybe(1)
  var s = map((a: number) => a + 1, x)
}
