import path from 'path'
import { Aff } from '../../Package/Aff/Aff'
import { Express } from '../../Package/Express/Express'
import { 静态路径 } from '../../Package/Express/静态路径'
import { AppEnv } from '../通用模型/AppEnv'

export default new AppEnv(
  ({ DB_HOST, DB_PORT, DB_USER, DB_PWD, DB_NAME, SESSION_SECRET, APP_PORT }) =>
    new Aff(async () => {
      var express实例 = new Express([new 静态路径('/', path.resolve(__dirname, '../../../web'))], [], [], APP_PORT)
      await express实例.启动服务().运行为Promise()
      return null
    }),
)
  .运行()
  .不带回调运行()
