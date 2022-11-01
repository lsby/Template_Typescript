import path from 'path'
import * as A from './Package/Aff/Aff'
import { Debug, log } from './Package/Debug/Debug'
import { Electron, 运行 } from './Package/Electron/Electron'
import { App, 环境对应表 } from './Package/Env/Env'

var D = Debug('App:Cmd')

type 环境变量 = {}
var 环境变量表 = 环境对应表({
  dev: path.resolve(__dirname, '../../.env/dev.env'),
  re: path.resolve(__dirname, '../../.env/re.env'),
  prod: path.resolve(__dirname, '../../.env/prod.env'),
  fix: path.resolve(__dirname, '../../.env/fix.env'),
})

var 程序 = (env: 环境变量) =>
  运行(
    Electron(
      {
        width: 800,
        height: 600,
        html路径: path.resolve(__dirname, '../../dist/web/index.html'),
        不安全的暴露IPC: true,
        打开控制台: true,
      },
      [
        {
          事件名: '测试事件',
          实现: (e, a) =>
            A.Aff(async () => {
              console.log(a)
              return 'pong'
            }),
        },
      ],
    ),
  )

var app = App<环境变量>(环境变量表, 程序)
A.run(app)
