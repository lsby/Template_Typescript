import { Aff } from '../Package/Aff/Aff'
import path from 'path'
import { Effect } from '../Package/Effect/Effect'
import { Env } from '../Package/Env/Env'

type 环境变量类型 = {
  APP_PORT: number
  DB_HOST: string
  DB_PORT: number
  DB_USER: string
  DB_PWD: string
  DB_NAME: string
  NODE_ENV: string
  SESSION_SECRET: string
}

export class App {
  static App(实现: (env: 环境变量类型) => Aff<null>) {
    return new App(实现)
  }
  private constructor(private 实现: (env: 环境变量类型) => Aff<null>) {}
  运行(): Aff<null> {
    return Aff.do()
      .bind('p', () => Aff.提升Effect(this.计算环境文件路径()))
      .run((env) =>
        Env.Env(env.p, (e) =>
          Aff.do()
            .bind('arg', () => Aff.提升Effect(this.类型转换(e)))
            .run((env) => this.实现(env.arg)),
        ).应用环境(),
      )
  }
  private 计算环境文件路径(): Effect<string> {
    return Effect.Effect(() => {
      var 环境变量路径 = ''
      switch (process.env['NODE_ENV']) {
        case 'dev':
          环境变量路径 = path.resolve(__dirname, '../../../.env/dev.env')
          break
        case 're':
          环境变量路径 = path.resolve(__dirname, '../../../.env/re.env')
          break
        case 'prod':
          环境变量路径 = path.resolve(__dirname, '../../../.env/prod.env')
          break
        case 'fix':
          环境变量路径 = path.resolve(__dirname, '../../../.env/fix.env')
          break
        default:
          throw new Error(`环境变量 ${process.env['NODE_ENV']} 未定义`)
      }
      return 环境变量路径
    })
  }
  private 类型转换(env: Record<string, string | undefined>): Effect<环境变量类型> {
    return Effect.Effect(() => {
      type isNumber = ['DB_PORT', 'APP_PORT']
      var isNumber: isNumber = ['DB_PORT', 'APP_PORT']

      type isString = ['NODE_ENV', 'DB_HOST', 'DB_USER', 'DB_PWD', 'DB_NAME', 'SESSION_SECRET']
      var isString: isString = ['NODE_ENV', 'DB_HOST', 'DB_USER', 'DB_PWD', 'DB_NAME', 'SESSION_SECRET']

      type r_Number<arr> = arr extends []
        ? []
        : arr extends [infer a, ...infer as]
        ? a extends string
          ? Record<a, number> & r_Number<as>
          : never
        : never
      type r_String<arr> = arr extends []
        ? []
        : arr extends [infer a, ...infer as]
        ? a extends string
          ? Record<a, string> & r_String<as>
          : never
        : never
      type r = r_Number<isNumber> & r_String<isString>

      var data_Number = isNumber.map((a) => ({ [a]: Number(env[a]) })).reduce((s, a) => Object.assign(s, a), {})
      var data_String = isString.map((a) => ({ [a]: env[a] })).reduce((s, a) => Object.assign(s, a), {})

      var 存在判断_Number = Object.keys(data_Number).filter((a) => isNaN(data_Number[a]))
      var 存在判断_String = Object.keys(data_String).filter((a) => data_String[a] == null)
      if (存在判断_Number.length != 0 && 存在判断_String.length != 0) {
        if (存在判断_Number.length != 0) {
          throw new Error(`环境变量错误: ${存在判断_Number[0]}为${data_Number[存在判断_Number[0]]}`)
        } else if (存在判断_String.length != 0) {
          throw new Error(`环境变量错误: ${存在判断_String[0]}为${data_Number[存在判断_String[0]]}`)
        }
      }

      var data = { ...data_Number, ...data_String }

      return data as unknown as r
    })
  }
}
