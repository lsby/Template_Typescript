import ts_type_check from '@lsby/ts_type_check'
import { Request, Response } from 'express'
import path from 'path'
import { Aff } from '../../Package/Aff/Aff'

var 验证器 = ts_type_check(path.resolve(__dirname, './Data.d.ts'))
export default (req: Request, res: Response): Aff<null> => {
  return Aff(async () => {
    var 参数 = req.body
    var check = await 验证器.check('请求数据', 参数)
    if (!check.valid) {
      res.send({ err: check.errors.map((a) => a.stack).join(', '), data: null })
      return null
    }

    res.send({ err: null, data: { 结果: 参数.a + 参数.b } })
    return null
  })
}
