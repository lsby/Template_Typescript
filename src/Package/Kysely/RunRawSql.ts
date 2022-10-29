import { Kysely, sql } from 'kysely'
import { Aff } from '../Aff/Aff'
import { Debug, log } from '../Debug/Debug'

var D = Debug('Package:Kysely')

export function runRawSql<A>(kysely: Kysely<any>, sqlStr: string): Aff<A[]> {
  return Aff(async () => {
    log(D, '运行的sql是 %s', sqlStr)
    var res = (await sql(sqlStr as any).execute(kysely)).rows
    return res as A[]
  })
}
