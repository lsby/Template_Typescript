import { debug } from 'debug'

export class Debug {
  static Debug(名称: string): Debug {
    return new Debug('Debug', 名称)
  }
  private _log
  private _error
  private constructor(private 构造子: 'Debug', 名称: string) {
    this._log = debug(`${名称}`)
    this._log.log = console.log.bind(console)
    this._error = debug(`${名称}`)
  }
  log(格式: string, ...参数: any[]) {
    this._log(格式, 参数)
  }
  error(格式: string, ...参数: any[]) {
    this._error(格式, 参数)
  }
}
