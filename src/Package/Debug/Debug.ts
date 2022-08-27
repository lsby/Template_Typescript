import { debug } from 'debug'
import { Effect } from '../Effect/Effect'

export class Debug {
  private _log
  private _error
  constructor(名称: string) {
    this._log = debug(`${名称}`)
    this._log.log = console.log.bind(console)
    this._error = debug(`${名称}`)
  }
  log(格式: string, ...参数: any[]): Effect<null> {
    return new Effect(() => {
      this._log(格式, ...参数)
      return null
    })
  }
  error(格式: string, ...参数: any[]): Effect<null> {
    return new Effect(() => {
      this._error(格式, ...参数)
      return null
    })
  }
}
