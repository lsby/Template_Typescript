import { Kysely, Transaction } from 'kysely'
import { Aff, run } from '../Aff/Aff'
import { Debug } from '../Debug/Debug'

var D = Debug('Package:Kysely')

/*
  用法:
  事务(req.kysely, (trx: Transaction<Database>) => A.Aff(async () => { ... }))
*/
export function 事务<A>(kysely: Kysely<any>, f: <Database>(a: Transaction<Database>) => Aff<A>): Aff<A> {
  return Aff(async () => {
    return kysely.connection().execute(async (db) => {
      return db.transaction().execute(async (trx) => {
        return await run(f(trx))
      })
    })
  })
}
