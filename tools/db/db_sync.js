var Importer_mysql = require('mysql-import')
var path = require('path')
var mysqldump = require('mysqldump')
var { 删除所有表, 读取环境变量 } = require('./lib')

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

  await mysqldump({
    connection: 来源库,
    dumpToFile: path.resolve(__dirname, './dump.sql'),
  })

  await 删除所有表({
    DB_HOST: t_DB_HOST,
    DB_PORT: t_DB_PORT,
    DB_USER: t_DB_USER,
    DB_PWD: t_DB_PWD,
    DB_NAME: t_DB_NAME,
  })

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
    })
    .catch((err) => {
      console.error(err)
    })
}

main()
