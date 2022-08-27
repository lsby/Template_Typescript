import ts_type_check from '@lsby/ts_type_check'
import { Request } from 'express'
import path from 'path'
import { Aff } from '../../Package/Aff/Aff'
import { 请求数据, 返回数据 } from './Data'

var 验证器 = ts_type_check(path.resolve(__dirname, './Data.d.ts'))
export default (req: Request, 参数: 请求数据): Aff<返回数据> => {
  return Aff.Aff(async () => {
    var check = await 验证器.check('请求数据', 参数)
    if (!check.valid) throw check.errors.map((a) => a.stack).join(', ')

    return { 结果: 参数.a + 参数.b }
  })
}
