import { Kysely, Transaction } from 'kysely'
import { Aff, run } from '../Aff/Aff'
import { Debug } from '../Debug/Debug'

var D = Debug('Package:Kysely')

export function 事务<Database, A>(kysely: Kysely<any>, f: (a: Transaction<Database>) => Aff<A>): Aff<A> {
  return Aff(async () => {
    return kysely.connection().execute(async (db) => {
      return db.transaction().execute(async (trx) => {
        return await run(f(trx))
      })
    })
  })
}
