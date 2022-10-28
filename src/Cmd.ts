import { Env_NODE_ENV, Env_run } from './Package/Env/Env'
import path from 'path'
import { Aff, Aff_run } from './Package/Aff/Aff'
import { Either_case } from './Package/Either/Either'

function main() {
  var 环境变量 = [
    { 环境名称: 'dev', 文件路径: path.resolve(__dirname, '../.env/dev.env') },
    { 环境名称: 're', 文件路径: path.resolve(__dirname, '../.env/re.env') },
    { 环境名称: 'prod', 文件路径: path.resolve(__dirname, '../.env/prod.env') },
    { 环境名称: 'fix', 文件路径: path.resolve(__dirname, '../.env/fix.env') },
  ]

  var 程序 = (env: {}) =>
    Aff(async () => {
      console.log('你好世界')
    })
  var app = Either_case(
    Env_NODE_ENV(环境变量, 程序),
    (e) => Aff(async () => console.log(e)),
    (app) => Env_run(app),
  )

  Aff_run(app)
}
main()
