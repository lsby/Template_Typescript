// import 'mocha'
// import { Kysely, MysqlDialect } from 'kysely'
// import Database from '../tools/types/Database'
// import 测试接口 from '../src/Interface/测试接口/Index'
// import { 获得环境变量 } from '../src/Lib/GetEnv'

// var { DB_HOST, DB_PORT, DB_USER, DB_PWD, DB_NAME, APP_PORT } = 获得环境变量()

// describe('框架测试', function () {
//   var kysely = new Kysely<Database>({
//     dialect: new MysqlDialect({ host: DB_HOST, port: DB_PORT, user: DB_USER, password: DB_PWD, database: DB_NAME }),
//   })
//   var req: any = { kysely }

//   it('测试接口', async function () {
//     var 返回值 = await 测试接口(req, { data: { a: 1, b: 2 } })
//     if (返回值.结果 != 3) throw '意外的结果'
//   })

//   after(async function () {
//     kysely.destroy()
//   })
// })
