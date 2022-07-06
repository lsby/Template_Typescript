import dotenv from 'dotenv'
import mysqldump from 'mysqldump'
import path from 'path'
import fs from 'fs'
import { 删除所有表 } from './lib'
var Importer_mysql = require('mysql-import')

async function main() {
  var 来源库env = dotenv.parse(fs.readFileSync(path.resolve(__dirname, '../../../.env/prod.env')))
  var o_DB_HOST = 来源库env['DB_HOST']
  var o_DB_PORT = Number(来源库env['DB_PORT'])
  var o_DB_USER = 来源库env['DB_USER']
  var o_DB_PWD = 来源库env['DB_PWD']
  var o_DB_NAME = 来源库env['DB_NAME']
  if (o_DB_HOST == null || o_DB_PORT == null || o_DB_USER == null || o_DB_PWD == null || o_DB_NAME == null) {
    throw '环境变量错误'
  }
  if (isNaN(o_DB_PORT)) {
    throw '环境变量错误'
  }
  var 来源库 = { host: o_DB_HOST, port: o_DB_PORT, user: o_DB_USER, password: o_DB_PWD, database: o_DB_NAME }

  var 目标库env = dotenv.parse(fs.readFileSync(path.resolve(__dirname, '../../../.env/re.env')))
  var t_DB_HOST = 目标库env['DB_HOST']
  var t_DB_PORT = Number(目标库env['DB_PORT'])
  var t_DB_USER = 目标库env['DB_USER']
  var t_DB_PWD = 目标库env['DB_PWD']
  var t_DB_NAME = 目标库env['DB_NAME']
  if (t_DB_HOST == null || t_DB_PORT == null || t_DB_USER == null || t_DB_PWD == null || t_DB_NAME == null) {
    throw '环境变量错误'
  }
  if (isNaN(t_DB_PORT)) {
    throw '环境变量错误'
  }
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
  importer.onProgress((progress: any) => {
    var percent = Math.floor((progress.bytes_processed / progress.total_bytes) * 10000) / 100
    console.log(`${percent}% Completed`)
  })
  importer
    .import(path.resolve(__dirname, './dump.sql'))
    .then(() => {
      var files_imported = importer.getImported()
      console.log(`${files_imported.length} SQL file(s) imported.`)
    })
    .catch((err: any) => {
      console.error(err)
    })
}

main()
