import path from 'path'
import { App } from './Model/App'
import { Aff } from './Package/Aff/Aff'
import { Debug } from './Package/Debug/Debug'
import { Electron } from './Package/Electron/Electron'

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'prod'
}

var app = new App((env) =>
  Aff.do()
    .bind('D', () => Aff.pure(new Debug('App:Electron')))
    .run((env) =>
      Aff.提升Effect(
        new Electron(
          {
            width: 800,
            height: 600,
            html路径: path.resolve(__dirname, '../web/index.html'),
            不安全的暴露IPC: true,
            打开控制台: true,
          },
          [
            {
              事件名: '测试事件',
              实现: (e, a) =>
                new Aff(async () => {
                  console.log(a)
                  return 'pong'
                }),
            },
          ],
        ).启动(),
      ),
    ),
).运行()
app.不带回调运行().运行()