import { AppEnv } from '../../Model/通用模型/AppEnv'
import { Aff } from '../../Package/Aff/Aff'
import { Debug } from '../../Package/Debug/Debug'
import { 创建Kysely } from '../通用模型/创建Kysely'

export default new AppEnv(({ DB_HOST, DB_PORT, DB_USER, DB_PWD, DB_NAME }) =>
  Aff.do()
    .bind('D', () => Aff.pure(new Debug('App:Cmd')))
    .bind('kysely', () => 创建Kysely({ DB_HOST, DB_PORT, DB_USER, DB_PWD, DB_NAME }))
    .run((env) => Aff.提升Effect(env.D.log('hello'))),
)
  .运行()
  .不带回调运行()
