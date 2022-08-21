var Importer_mysql = require('mysql-import')
var path = require('path')
var mysqldump = require('mysqldump')
var fs = require('fs')
var { 删除所有表, 读取环境变量 } = require('./lib')
var readline = require('readline')

async function main() {
  var {
    DB_HOST: o_DB_HOST,
    DB_PORT: o_DB_PORT,
    DB_USER: o_DB_USER,
    DB_PWD: o_DB_PWD,
    DB_NAME: o_DB_NAME,
  } = 读取环境变量('prod')
  var 来源库 = { host: o_DB_HOST, port: o_DB_PORT, user: o_DB_USER, password: o_DB_PWD, database: o_DB_NAME }

  var {
    DB_HOST: t_DB_HOST,
    DB_PORT: t_DB_PORT,
    DB_USER: t_DB_USER,
    DB_PWD: t_DB_PWD,
    DB_NAME: t_DB_NAME,
  } = 读取环境变量('dev')
  var 目标库 = { host: t_DB_HOST, port: t_DB_PORT, user: t_DB_USER, password: t_DB_PWD, database: t_DB_NAME }

  var RL = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  RL.question(
    `本操作将清空数据库${t_DB_HOST}:${t_DB_NAME}, 并写入${o_DB_HOST}:${o_DB_NAME}的数据, 确定吗?[y/N]`,
    function (yes) {
      if (yes != 'y' && yes != 'Y') {
        console.log('用户取消了操作')
        return
      }

      mysqldump({
        connection: 来源库,
        dumpToFile: path.resolve(__dirname, './dump.sql'),
      })
        .then((_) => {
          return 删除所有表({
            DB_HOST: t_DB_HOST,
            DB_PORT: t_DB_PORT,
            DB_USER: t_DB_USER,
            DB_PWD: t_DB_PWD,
            DB_NAME: t_DB_NAME,
          })
        })
        .then((_) => {
          var importer = new Importer_mysql(目标库)
          importer.onProgress((progress) => {
            var percent = Math.floor((progress.bytes_processed / progress.total_bytes) * 10000) / 100
            console.log(`${percent}% Completed`)
          })
          importer
            .import(path.resolve(__dirname, './dump.sql'))
            .then(() => {
              var files_imported = importer.getImported()
              console.log(`${files_imported.length} SQL file(s) imported.`)
              fs.unlinkSync(path.resolve(__dirname, './dump.sql'))
              RL.close()
            })
            .catch((err) => {
              console.error(err)
              fs.unlinkSync(path.resolve(__dirname, './dump.sql'))
              RL.close()
            })
        })
    },
  )
  RL.on('close', function () {})
}

main()
