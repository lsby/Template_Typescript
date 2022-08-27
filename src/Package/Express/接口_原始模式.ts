import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ParsedQs } from 'qs'
import { Aff } from '../Aff/Aff'
import { 中间件 } from './中间件'
import { 接口 } from './接口'

export class 接口_原始模式 implements 接口 {
  static 接口_原始模式(中间件们: 中间件[], 访问路径: string, 接口实现: (req: Request, res: Response) => Aff<null>) {
    return new 接口_原始模式('接口_原始模式', 中间件们, 访问路径, 接口实现)
  }
  private constructor(
    private 构造子: '接口_原始模式',
    private 中间件们: 中间件[],
    private 访问路径: string,
    private 接口实现: (req: Request, res: Response) => Aff<null>,
  ) {}
  取访问路径(): string {
    return this.访问路径
  }
  取使用的中间件(): 中间件[] {
    return this.中间件们
  }
  取接口实现(): (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
  ) => Aff<null> {
    return this.接口实现
  }
}
