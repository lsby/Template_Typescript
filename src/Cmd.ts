import path from 'path'
import * as A from './Package/Aff/Aff'
import { Debug, log } from './Package/Debug/Debug'
import { App, 环境对应表 } from './Package/Env/Env'

var D = Debug('App:Cmd')

type 环境变量 = {}
var 环境变量表 = 环境对应表({
  dev: path.resolve(__dirname, '../../.env/dev.env'),
  re: path.resolve(__dirname, '../../.env/re.env'),
  prod: path.resolve(__dirname, '../../.env/prod.env'),
  fix: path.resolve(__dirname, '../../.env/fix.env'),
})

var 程序 = (env: 环境变量) => A.提升到Aff(log(D, '你好世界'))

var app = App<环境变量>(环境变量表, 程序)
A.run(app)
