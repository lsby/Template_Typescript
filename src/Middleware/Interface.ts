import { NextFunction, Request, Response, Router } from 'express'
import * as uuid from 'uuid'

export interface 请求包裹<T> {
  data: T
}
export interface 返回包裹<T> {
  data: T
  err: string | null
}

export type 接口函数<参数类型, 返回类型> = (req: Request, 参数: 请求包裹<参数类型>) => Promise<返回类型>
export interface 接口<参数类型, 返回类型> {
  路径: string
  实现: 接口函数<参数类型, 返回类型>
}

export default function <参数类型, 返回类型>(描述: 接口<参数类型, 返回类型>) {
  var router = Router()
  router.post(描述.路径, async function (req: Request, res: Response, next: NextFunction) {
    var 参数 = null
    var 调用id = uuid.v4()
    var 调用时间 = new Date().getTime()

    try {
      if (req.body.data == null) {
        req.body.data = {}
      }
      参数 = JSON.stringify(req.body)
      console.log(
        '============================\n' +
          JSON.stringify({
            行为: '接口调用开始',
            调用id,
            路径: req.path,
            参数: 参数,
          }),
      )
      var 返回值 = await 描述.实现(req, req.body).catch((e) => {
        throw e
      })
      console.log({
        行为: '接口调用结束',
        调用id,
        路径: req.path,
        结果: '成功',
        调用消耗时间: new Date().getTime() - 调用时间,
        参数: 参数,
        返回值: JSON.stringify(返回值),
      })
      res.send({ err: null, data: 返回值 })
    } catch (e: any) {
      var e_str = e.toString()
      console.error({
        行为: '接口调用结束',
        调用id,
        路径: req.path,
        结果: '失败',
        调用消耗时间: new Date().getTime() - 调用时间,
        参数: 参数,
        异常: e_str,
      })
      res.send({ err: e_str })
    }
  })
  return router
}
