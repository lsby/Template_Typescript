// npm i kysely@0.17.1
import { Kysely, sql } from 'kysely'
import { Aff } from '../Aff/Aff'
import { Debug } from '../Debug/Debug'

export class KyselyRawSql<A> {
  constructor(private kysely: Kysely<any>, private sqlStr: string) {}
  执行(): Aff<A[]> {
    return new Aff(async () => {
      var D = new Debug('Package:Data:KyselyRawSql')
      D.log('运行的sql是 %s', this.sqlStr).运行()
      var res = (await sql(this.sqlStr as any).execute(this.kysely)).rows
      return res as A[]
    })
  }
}
