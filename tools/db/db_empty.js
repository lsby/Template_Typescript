var readline = require('readline')
var { 获得环境变量, 删除所有表 } = require('./lib')

function main() {
  var { DB_HOST, DB_PORT, DB_USER, DB_PWD, DB_NAME } = 获得环境变量()

  var RL = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  RL.question(`本操作将清空数据库${DB_HOST}:${DB_NAME}, 所有表结构和数据都将丢失, 确定吗?[y/N]`, function (yes) {
    if (yes != 'y' && yes != 'Y') {
      console.log('用户取消了操作')
      return
    }

    console.log('删除所有表...')
    删除所有表({ DB_HOST, DB_PORT, DB_USER, DB_PWD, DB_NAME }).then((_) => RL.close())
  })
  RL.on('close', function () {})
}
main()
