import { Kysely, Transaction } from 'kysely'
import { Aff } from '../Aff/Aff'
import { Function } from '../Function/Function'

export class Kysely事务<Database, A> {
  constructor(private kysely: Kysely<Database>, private f: Function<Transaction<Database>, Aff<A>>) {}
  执行(): Aff<A> {
    return new Aff(async () => {
      return this.kysely.connection().execute(async (db) => {
        return db.transaction().execute(async (trx) => {
          return await this.f(trx).运行为Promise()
        })
      })
    })
  }
}
