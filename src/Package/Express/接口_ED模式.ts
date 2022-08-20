/**
 * 描述一个Express接口
 * 通过传入以下数据来创建:
 * - 这个接口依赖的中间件的数组
 * - 访问路径
 * - 实现, 形式是 (req: Request, 参数: Record<string, any>) => Promise<Record<string, any>>
 * 实现中的'参数'字段是req.body
 * 最后接口会返回{err: ?, data: ?}格式
 * 实现的返回值将被填充为{err: ?, data: ?}中的data部分, err会填充为null
 * 如果实现throw, 错误将被填充为{err: ?, data: ?}的err部分, data会填充为null
 */

import { Request, Response } from 'express'
import { 中间件 } from './中间件'
import * as 接口类型类 from './Express接口_类型类'
import * as uuid from 'uuid'

// 符号定义
const 类型: unique symbol = Symbol('类型')
const 构造子: unique symbol = Symbol('构造子')
const 参数: unique symbol = Symbol('参数')

// 类型定义
export type 接口_ED模式 = {
  [类型]: '接口_ED模式'
  [构造子]: '接口_ED模式'
  [参数]: {
    中间件们: 中间件[]
    访问路径: string
    接口实现: (req: Request, 参数: any) => Promise<Record<string, any>>
  }
}

// 构造子
export function 接口_ED模式(
  中间件们: 中间件[],
  访问路径: string,
  接口实现: (req: Request, 参数: any) => Promise<Record<string, any>>,
) {
  return {
    [类型]: '接口_ED模式' as '接口_ED模式',
    [构造子]: '接口_ED模式' as '接口_ED模式',
    [参数]: { 中间件们, 访问路径, 接口实现 },
  }
}

// 实现类型类
// 接口类型类
declare module './Express接口_类型类' {
  interface Express接口<A> {
    接口_ED模式_的实现: typeof 类型 extends keyof A ? (A[typeof 类型] extends '接口_ED模式' ? true : false) : false
  }
}
接口类型类.增加实现(function (a: 接口_ED模式): {
  访问路径: string
  使用的中间件们: 中间件[]
  接口实现: (req: Request, res: Response) => Promise<null>
} {
  if (a[类型] != '接口_ED模式') return 接口类型类.NEXT
  return {
    访问路径: a[参数].访问路径,
    使用的中间件们: a[参数].中间件们,
    接口实现: async function (req: Request, res: Response) {
      var 调用id = uuid.v4()
      var 调用时间 = new Date().getTime()
      try {
        console.log({
          行为: '接口ED模式: 调用开始',
          调用id,
          路径: req.path,
          参数: 参数,
        })
        var c = await a[参数].接口实现(req, req.body)
        console.log({
          行为: '接口ED模式: 调用结束',
          调用id,
          路径: req.path,
          结果: '成功',
          调用消耗时间: new Date().getTime() - 调用时间,
          参数: req.body,
          返回值: c,
        })
        res.send({ err: null, data: c })
      } catch (e) {
        var err = e
        console.error({
          行为: '接口调用结束',
          调用id,
          路径: req.path,
          结果: '失败',
          调用消耗时间: new Date().getTime() - 调用时间,
          参数: 参数,
          异常: err,
        })
        res.send({ err: err, data: null })
      }
      return null
    },
  }
})
