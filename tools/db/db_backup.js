var { 获得环境变量 } = require('./lib')
var mysqldump = require('mysqldump')
var path = require('path')
var makeDir = require('make-dir')

async function main() {
  var { DB_HOST, DB_PORT, DB_USER, DB_PWD, DB_NAME } = 获得环境变量()

  await makeDir(path.resolve(__dirname, `../../dump`))
  await mysqldump({
    connection: {
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PWD,
      database: DB_NAME,
    },
    dumpToFile: path.resolve(__dirname, `../../dump/${new Date().getTime()}_${process.env['NODE_ENV']}.sql`),
  })
}

main()
