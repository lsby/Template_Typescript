import readlineSync from 'readline-sync'
import { 获得环境变量 } from '../../src/Lib/GetEnv'
import { 删除所有表 } from './lib'

async function main() {
  var { DB_HOST, DB_PORT, DB_USER, DB_PWD, DB_NAME, APP_PORT } = 获得环境变量()

  process.stdout.write(`本操作将清除和清空数据库${DB_HOST}:${DB_NAME}, 所有表结构和数据都将丢失, 确定吗?[y/N]`)
  var yes = readlineSync.question()
  if (yes != 'y' && yes != 'Y') {
    console.log('用户取消了操作')
    return
  }

  console.log('删除所有表...')

  await 删除所有表({
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PWD,
    DB_NAME,
  })
}
main()
