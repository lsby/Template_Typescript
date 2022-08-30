import { Kysely, sql } from 'kysely'
import { Aff } from '../Aff/Aff'
import { Debug } from '../Debug/Debug'

export class KyselyRawSql<A> {
  constructor(private kysely: Kysely<any>, private sql: string) {}
  执行(): Aff<A[]> {
    return new Aff(async () => {
      var D = new Debug('Package:Data:KyselyRawSql')
      D.log('运行的sql是 %s', sql)
      var res = (await sql(this.sql as any).execute(this.kysely)).rows
      return res as A[]
    })
  }
}
