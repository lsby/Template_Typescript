import { Request } from 'express'
import { Aff } from '../../../Package/Aff/Aff'
import { 后端远程数据_服务端 } from '../../../Package/Web/后端远程数据_服务端'
import { 数据类型 } from '../Types'

export default (req: Request, 请求: {}, 数据: 后端远程数据_服务端<数据类型>, 页面: 后端远程数据_服务端<string>) =>
  new Aff(async () => {
    await 数据.修改值({ 这是数据: 'bbb' }).运行为Promise()
    return {}
  })
