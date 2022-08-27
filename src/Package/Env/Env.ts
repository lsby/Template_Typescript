import { Aff } from '../Aff/Aff'
import dotenv from 'dotenv'

export class Env {
  static Env(环境文件路径: string, 程序: (a: Record<string, string | undefined>) => Aff<null>) {
    return new Env(环境文件路径, 程序)
  }
  private constructor(
    private 环境文件路径: string,
    private 程序: (a: Record<string, string | undefined>) => Aff<null>,
  ) {}
  应用环境(): Aff<null> {
    return Aff.do()
      .bind('_', (env) => Aff.提升副作用函数(() => dotenv.config({ path: this.环境文件路径, override: true })))
      .run((env) => this.程序(process.env))
  }
}
