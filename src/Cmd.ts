import { 从ENV创建, run, 环境对应表 } from './Package/Env/Env'
import path from 'path'
import { Aff, Aff_run } from './Package/Aff/Aff'
import { 模式匹配 } from './Package/Either/Either'

function main() {
  var 环境变量 = {
    dev: path.resolve(__dirname, '../.env/dev.env'),
    re: path.resolve(__dirname, '../.env/re.env'),
    prod: path.resolve(__dirname, '../.env/prod.env'),
    fix: path.resolve(__dirname, '../.env/fix.env'),
  }

  var 程序 = (env: {}) =>
    Aff(async () => {
      console.log('你好世界')
    })
  var app = 模式匹配(
    从ENV创建(环境对应表(环境变量), 程序),
    (e) => Aff(async () => console.log(e)),
    (app) => run(app),
  )

  Aff_run(app)
}
main()
