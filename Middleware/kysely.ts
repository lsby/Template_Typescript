import { NextFunction, Request, Response } from 'express'
import { Kysely, MysqlDialect, MysqlDialectConfig } from 'kysely'
import Database from '../../tools/types/Database'

declare global {
  namespace Express {
    interface Request {
      kysely: Kysely<Database>
    }
  }
}

export default function (dbConf: MysqlDialectConfig) {
  return function (req: Request, res: Response, next: NextFunction) {
    var kysely = new Kysely<Database>({
      dialect: new MysqlDialect(dbConf),
    })
    req.kysely = kysely
    next()
  }
}
