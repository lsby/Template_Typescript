import dotenv from 'dotenv'
import { Aff } from '../Aff/Aff'
import { Either, Left, Right } from '../Either/Either'
import { Err } from '../Err/Err'

export type Env<A, E extends Record<string, any>> = {
  环境文件路径: string
  app: (a: E) => Aff<A>
}

export function Env<A, E extends Record<string, any>>(环境文件路径: string, app: (a: E) => Aff<A>): Env<A, E> {
  return { 环境文件路径, app }
}

export function Env_run<A, E extends Record<string, any>>(a: Env<A, E>) {
  dotenv.config({ path: a.环境文件路径, override: true })
  return a.app(process.env as any)
}

export type NodeEnv对应表 = { 环境名称: string; 文件路径: string }[]
export function Env_NODE_ENV<A, E extends Record<string, any>>(
  对应: NodeEnv对应表,
  app: (a: E) => Aff<A>,
): Either<Err, Env<A, E>> {
  if (process.env['NODE_ENV'] == null) return Left(Err('NODE_ENV不存在'))
  var 筛选 = 对应.filter((a) => a.环境名称 == process.env['NODE_ENV'])
  if (筛选.length == 0) return Left(Err('错误的NodeEnv值:', process.env['NODE_ENV']))
  return Right(Env(筛选[0].文件路径, app))
}
