import { Aff } from '../Aff/Aff'
import dotenv from 'dotenv'

export class Env {
  constructor(private 环境文件路径: string, private 程序: (a: Record<string, string | undefined>) => Aff<null>) {}
  应用环境(): Aff<null> {
    return Aff.do()
      .bind('_', () => Aff.提升副作用函数(() => dotenv.config({ path: this.环境文件路径, override: true })))
      .run(() => this.程序(process.env))
  }
}
