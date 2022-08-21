var dotenv = require('dotenv')
var path = require('path')
var mysql = require('mysql')
var _knex = require('knex')

exports.读取环境变量 = function 读取环境变量(环境名称) {
  switch (环境名称) {
    case 'dev':
      dotenv.config({ path: path.resolve(__dirname, '../../.env/dev.env') })
      break
    case 're':
      dotenv.config({ path: path.resolve(__dirname, '../../.env/re.env') })
      break
    case 'prod':
      dotenv.config({ path: path.resolve(__dirname, '../../.env/prod.env') })
      break
    case 'fix':
      dotenv.config({ path: path.resolve(__dirname, '../../.env/fix.env') })
      break
    default:
      throw new Error(`环境名称 ${环境名称} 未定义`)
  }

  var DB_HOST = process.env['DB_HOST']
  var DB_PORT = Number(process.env['DB_PORT'])
  var DB_USER = process.env['DB_USER']
  var DB_PWD = process.env['DB_PWD']
  var DB_NAME = process.env['DB_NAME']

  if (!DB_HOST) throw new Error('DB_HOST错误')
  if (!DB_PORT) throw new Error('DB_PORT错误')
  if (!DB_USER) throw new Error('DB_USER错误')
  if (!DB_PWD) throw new Error('DB_PWD错误')
  if (!DB_NAME) throw new Error('DB_NAME错误')

  return { DB_HOST, DB_PORT, DB_USER, DB_PWD, DB_NAME }
}
exports.获得环境变量 = function 获得环境变量() {
  switch (process.env['NODE_ENV']) {
    case 'dev':
      return exports.读取环境变量('dev')
    case 're':
      return exports.读取环境变量('re')
    case 'prod':
      return exports.读取环境变量('prod')
    case 'fix':
      return exports.读取环境变量('fix')
    default:
      throw new Error(`环境变量 ${process.env['NODE_ENV']} 未定义`)
  }
}
exports.新建数据库 = async function 新建数据库() {
  var { DB_HOST, DB_PORT, DB_USER, DB_PWD, DB_NAME } = exports.获得环境变量()

  var connection = mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PWD,
  })

  connection.connect()

  await new Promise((res, rej) => {
    connection.query(
      `create database If Not Exists ${DB_NAME} DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci`,
      function (error, results, fields) {
        if (error) return rej(error)
        res(null)
      },
    )
  })

  connection.end()
}
exports.删除所有表 = async function 删除所有表() {
  var { DB_HOST, DB_PORT, DB_USER, DB_PWD, DB_NAME } = exports.获得环境变量()

  var knex = _knex.default({
    client: 'mysql',
    connection: { host: DB_HOST, port: DB_PORT, user: DB_USER, password: DB_PWD, database: DB_NAME },
  })

  try {
    var 删除所有外键约束 = (
      await knex.raw(`
            SELECT concat('alter table ',table_schema,'.',table_name,' DROP FOREIGN KEY ',constraint_name,';')
            FROM information_schema.table_constraints
            WHERE constraint_type='FOREIGN KEY'
            AND table_schema='${DB_NAME}'
        `)
    )[0].map((a) => Object.values(a)[0].trim())
    for (var sql of 删除所有外键约束) await knex.raw(sql)

    var 所有表 = (
      await knex.select('TABLE_NAME').from('information_schema.TABLES').where({ table_schema: DB_NAME })
    ).map((a) => a.TABLE_NAME)
    var 删除所有表 = await Promise.all(所有表.map((a) => knex.schema.dropTable(a)))
  } catch (e) {
    throw e
  } finally {
    await knex.destroy()
  }
}

exports.执行knex_schema = async function 执行knex_schema(schema) {
  var { DB_HOST, DB_PORT, DB_USER, DB_PWD, DB_NAME } = exports.获得环境变量()

  var knex = _knex.default({
    client: 'mysql',
    connection: { host: DB_HOST, port: DB_PORT, user: DB_USER, password: DB_PWD, database: DB_NAME },
  })

  try {
    var cmd = await schema(knex).generateDdlCommands()
    var sqlarr = cmd.sql
      .map((a) => a.sql)
      .sort((a, b) => {
        if (a.indexOf('create table') != -1) return -1
        if (b.indexOf('create table') != -1) return 1
        if (a.indexOf('foreign key') != -1) return 1
        if (b.indexOf('foreign key') != -1) return -1
        return a - b
      })

    await knex.transaction(async (trx) => {
      for (var sql of sqlarr) {
        await trx.raw(sql)
      }
    })
  } catch (e) {
    throw e
  } finally {
    await knex.destroy()
  }
}
