import { Kysely } from 'kysely'
import * as _knex from 'knex'
import { 新建表 } from '../db/lib'

function schema(knex) {
    var r = knex.schema
        .createTable('学生表', function (table) {
            table.increments()
            table.string('姓名').notNullable()
            table.enum('性别', ['男', '女']).notNullable()
            table.integer('所属班级').unsigned().notNullable().references('班级表.id')
            table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
        })
        .createTable('班级表', function (table) {
            table.increments()
            table.string('名称').notNullable()
            table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
        })
    return r
}

export async function up(db) {
    await 新建表(schema)
}

export async function down(db) {}
