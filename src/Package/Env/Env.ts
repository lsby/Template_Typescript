import dotenv from 'dotenv'
import { Aff } from '../Aff/Aff'
import { Either, Left, Right } from '../Either/Either'
import { Err } from '../Err/Err'

// Env
const _环境文件路径: unique symbol = Symbol()
const _app: unique symbol = Symbol()
export type Env<A, E extends Record<string, any>> = {
  [_环境文件路径]: string
  [_app]: (a: E) => Aff<A>
}

export function Env<A, E extends Record<string, any>>(环境文件路径: string, app: (a: E) => Aff<A>): Env<A, E> {
  return { [_环境文件路径]: 环境文件路径, [_app]: app }
}

export function run<A, E extends Record<string, any>>(a: Env<A, E>) {
  dotenv.config({ path: a[_环境文件路径], override: true })
  return a[_app](process.env as any)
}

// 环境对应表对应表
const _环境名称: unique symbol = Symbol()
const _文件路径: unique symbol = Symbol()
export type 环境对应表 = {
  [_环境名称]: string
  [_文件路径]: string
}[]

export function 环境对应表(a: Record<string, string>) {
  var r: 环境对应表 = []

  Object.keys(a).forEach((k) => {
    r.push({ [_环境名称]: k, [_文件路径]: a[k] })
  })

  return r
}

// 函数
export function 从ENV创建<A, E extends Record<string, any>>(
  对应: 环境对应表,
  app: (a: E) => Aff<A>,
): Either<Err, Env<A, E>> {
  if (process.env['NODE_ENV'] == null) return Left(Err('NODE_ENV不存在'))
  var 筛选 = 对应.filter((a) => a[_环境名称] == process.env['NODE_ENV'])
  if (筛选.length == 0) return Left(Err('错误的NodeEnv值:', process.env['NODE_ENV']))
  return Right(Env(筛选[0][_文件路径], app))
}
