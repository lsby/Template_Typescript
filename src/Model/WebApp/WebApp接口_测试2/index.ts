import { Request } from 'express'
import { Aff } from '../../../Package/Aff/Aff'
import { 后端远程数据_服务端 } from '../../../Package/Web/后端远程数据_服务端'
import { 数据类型 } from '../Types'

export default (req: Request, 请求: { a: number; b: number }, 数据: 后端远程数据_服务端<数据类型>) =>
  new Aff(async () => {
    return { 结果: 请求.a + 请求.b }
  })
