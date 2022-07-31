import path from 'path'
import dotenv from 'dotenv'

export function 获得环境变量() {
  if (process.env['NODE_ENV'] == 'dev') {
    console.log('使用 dev 环境')
    dotenv.config({ path: path.resolve(__dirname, '../../../.env/dev.env') })
  } else if (process.env['NODE_ENV'] == 're') {
    console.log('使用 re 环境')
    dotenv.config({ path: path.resolve(__dirname, '../../../.env/re.env') })
  } else if (process.env['NODE_ENV'] == 'prod') {
    console.log('使用 prod 环境')
    dotenv.config({ path: path.resolve(__dirname, '../../../.env/prod.env') })
  } else if (process.env['NODE_ENV'] == 'fix') {
    console.log('使用 fix 环境')
    dotenv.config({ path: path.resolve(__dirname, '../../../.env/fix.env') })
  } else {
    throw '没有指定运行环境'
  }

  type isNumber = ['DB_PORT', 'APP_PORT']
  var isNumber: isNumber = ['DB_PORT', 'APP_PORT']

  type isString = ['NODE_ENV', 'DB_HOST', 'DB_USER', 'DB_PWD', 'DB_NAME']
  var isString: isString = ['NODE_ENV', 'DB_HOST', 'DB_USER', 'DB_PWD', 'DB_NAME']

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

  var data_Number = isNumber.map((a) => ({ [a]: Number(process.env[a]) })).reduce((s, a) => Object.assign(s, a), {})
  var data_String = isString.map((a) => ({ [a]: process.env[a] })).reduce((s, a) => Object.assign(s, a), {})

  var 存在判断_Number = Object.values(data_Number).filter((a) => isNaN(a))
  var 存在判断_String = Object.values(data_Number).filter((a) => a == null)
  if (存在判断_Number.length != 0 && 存在判断_String.length != 0) {
    throw '环境变量错误'
  }

  var data = { ...data_Number, ...data_String }
  return data as unknown as r
}
