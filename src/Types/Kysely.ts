import { Kysely } from 'kysely'
import Database from '../../tools/types/Database'

declare global {
  namespace Express {
    interface Request {
      kysely: Kysely<Database>
    }
  }
}
