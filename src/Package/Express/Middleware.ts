/**
 * 描述一个Express中间件
 * 通过传入以下数据来创建:
 * - (req, res, next) => void 形式的函数
 */

import { NextFunction, Request, Response } from 'express'

// 符号定义
const 类型: unique symbol = Symbol('类型')
const 构造子: unique symbol = Symbol('构造子')
const 参数: unique symbol = Symbol('参数')

// 类型定义
export type 中间件 = {
  [类型]: '中间件'
  [构造子]: '中间件'
  [参数]: { 实现: (req: Request, res: Response, next: NextFunction) => any }
}

// 构造子
export function 中间件(实现: (req: Request, res: Response, next: NextFunction) => any) {
  return { [类型]: '中间件' as '中间件', [构造子]: '中间件' as '中间件', [参数]: { 实现 } }
}

// 函数
export function 获得中间件实现(a: 中间件): (req: Request, res: Response, next: NextFunction) => any {
  return a[参数].实现
}
