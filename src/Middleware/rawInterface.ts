import { NextFunction, Request, Response } from 'express'
import * as uuid from 'uuid'

export default function (fun: (req: Request) => Promise<any>) {
  return async function (req: Request, res: Response, next: NextFunction) {
    var 参数 = null
    var 调用id = uuid.v4()
    var 调用时间 = new Date().getTime()

    try {
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
      var 返回值 = await fun(req).catch((e) => {
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
      res.send(返回值)
    } catch (e) {
      console.error({
        行为: '接口调用结束',
        调用id,
        路径: req.path,
        结果: '失败',
        调用消耗时间: new Date().getTime() - 调用时间,
        参数: 参数,
        异常: e,
      })
      res.send(e)
    }
  }
}
