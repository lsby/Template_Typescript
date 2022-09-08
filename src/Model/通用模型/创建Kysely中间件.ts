import { NextFunction, Request, Response } from 'express'
import { MysqlDialectConfig, Kysely, MysqlDialect } from 'kysely'
import Database from '../../../tools/types/Database'

export function 创建Kysely中间件(dbConf: MysqlDialectConfig) {
  return function (req: Request, res: Response, next: NextFunction) {
    var kysely = new Kysely<Database>({
      dialect: new MysqlDialect(dbConf),
    })
    req.kysely = kysely
    next()
  }
}
