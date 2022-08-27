import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ParsedQs } from 'qs'
import { Aff } from '../Aff/Aff'
import { Debug } from '../Debug/Debug'
import { 中间件 } from './中间件'
import { 接口 } from './接口'
import * as uuid from 'uuid'

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
    return (req, res) =>
      Aff.Aff(async () => {
        var D = Debug.Debug('Package:Express:接口_原始模式')
        var 调用id = uuid.v4()
        var 调用时间 = new Date().getTime()
        D.log('%o', {
          行为: '调用开始',
          调用id,
          路径: req.path,
          参数: req.body,
        }).运行()
        try {
          await this.接口实现(req, res).运行为Promise()
          D.log('%o', {
            行为: '调用结束',
            调用id,
            路径: req.path,
            结果: '成功',
            调用消耗时间: new Date().getTime() - 调用时间,
            参数: req.body,
          }).运行()
        } catch (e) {
          var err = e
          D.error('%o', {
            行为: '调用结束',
            调用id,
            路径: req.path,
            结果: '失败',
            调用消耗时间: new Date().getTime() - 调用时间,
            参数: req.body,
            异常: err,
          })
        }
        return null
      })
  }
}
