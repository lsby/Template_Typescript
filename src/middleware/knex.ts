import { NextFunction, Request, Response } from 'express'
import * as knex from 'knex'

declare global {
  namespace Express {
    interface Request {
      /**
       * @deprecated
       * 请尽可能使用kysely, knex只是为了兼容老项目.
       */
      knex: knex.Knex<any, unknown[]>
    }
  }
}

export default function knexM(knexConf: Parameters<typeof knex.default>[0]) {
  var _knex = knex.default(knexConf)
  return function (req: Request, res: Response, next: NextFunction) {
    req.knex = _knex
    next()
  }
}

export var knex_defConf = (conf: knex.Knex.MySqlConnectionConfig) =>
  knexM({
    client: 'mysql',
    connection: conf,
    pool: { min: 0, max: 7 },
    asyncStackTraces: process.env['NODE_ENV'] == 'dev' ? true : false,
  })
