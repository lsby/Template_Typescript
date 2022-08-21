/**
 * 描述一个Express接口
 * 通过传入以下数据来创建:
 * - 这个接口依赖的中间件的数组
 * - 访问路径
 * - 实现, 形式是 (req: Request, res: Response) => Promise<null>
 * 实现中必须调用res.send来返回数据
 * 实现最后需要手动return null
 */

import { Request, Response } from 'express'
import { 中间件 } from './Middleware'
import * as 接口类型类 from './Interface'

// 符号定义
const 类型: unique symbol = Symbol('类型')
const 构造子: unique symbol = Symbol('构造子')
const 参数: unique symbol = Symbol('参数')

// 类型定义
export type 接口_底层模式 = {
  [类型]: '接口_底层模式'
  [构造子]: '接口_底层模式'
  [参数]: { 中间件们: 中间件[]; 访问路径: string; 接口实现: (req: Request, res: Response) => Promise<null> }
}

// 构造子
export function 接口_底层模式(
  中间件们: 中间件[],
  访问路径: string,
  接口实现: (req: Request, res: Response) => Promise<null>,
) {
  return {
    [类型]: '接口_底层模式' as '接口_底层模式',
    [构造子]: '接口_底层模式' as '接口_底层模式',
    [参数]: { 中间件们, 访问路径, 接口实现 },
  }
}

// 实现类型类
// 接口类型类
declare module './Interface' {
  interface Express接口<A> {
    接口_底层模式_的实现: typeof 类型 extends keyof A ? (A[typeof 类型] extends '接口_底层模式' ? true : false) : false
  }
}
接口类型类.增加实现(function (a: 接口_底层模式): {
  访问路径: string
  使用的中间件们: 中间件[]
  接口实现: (req: Request, res: Response) => Promise<null>
} {
  if (a[类型] != '接口_底层模式') return 接口类型类.NEXT
  return {
    访问路径: a[参数].访问路径,
    使用的中间件们: a[参数].中间件们,
    接口实现: a[参数].接口实现,
  }
})
