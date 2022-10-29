import { debug } from 'debug'
import { Eff } from '../Eff/Eff'

const _log: unique symbol = Symbol()
const _err: unique symbol = Symbol()
export type Debug = {
  [_log]: (格式: string, ...参数: any[]) => Eff<void>
  [_err]: (格式: string, ...参数: any[]) => Eff<void>
}

export function Debug(名称: string): Debug {
  var c = debug(`${名称}`)
  c.log = console.log.bind(console)
  return {
    [_log]: (...a) => Eff(() => c(...a)),
    [_err]: (...a) => Eff(() => debug(`${名称}`)(...a)),
  }
}

export function log(d: Debug, 格式: string, ...参数: any[]): Eff<void> {
  return d[_log](格式, ...参数)
}
export function err(d: Debug, 格式: string, ...参数: any[]): Eff<void> {
  return d[_err](格式, ...参数)
}
