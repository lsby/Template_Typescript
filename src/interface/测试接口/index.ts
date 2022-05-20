import { Request } from 'express'
import { 请求包裹 } from '../../middleware/interface'
import { 请求数据, 返回数据 } from './data'
import path from 'path'
import ts_type_check from '@lsby/ts_type_check'

var 验证器 = ts_type_check(path.resolve(__dirname, './data.d.ts'))
export default async (req: Request, 参数: 请求包裹<请求数据>): Promise<返回数据> => {
    var check = await 验证器.check('请求数据', 参数.data)
    if (!check.valid) throw check.errors.map((a) => a.stack).join(', ')

    return { 结果: 参数.data.a + 参数.data.b }
}
