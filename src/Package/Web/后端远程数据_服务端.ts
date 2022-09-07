import { Socket } from 'socket.io'
import { Aff } from '../Aff/Aff'
import { Effect } from '../Effect/Effect'

export class 后端远程数据_服务端<T> {
  static 创建<T>(socket: Socket, 事件名称: string, 初始值: T): Aff<后端远程数据_服务端<T>> {
    return new Aff(async () => {
      var r = new 后端远程数据_服务端(socket, 事件名称, 初始值)
      await r.修改值(初始值).运行为Promise()
      return r
    })
  }

  private 数据: T
  private constructor(private socket: Socket, private 事件名称: string, 初始值: T) {
    this.数据 = 初始值
  }
  取值(): Effect<T> {
    return new Effect(() => {
      return this.数据
    })
  }
  修改值(值: T): Aff<null> {
    return new Aff(async () => {
      await new Promise((res, rej) => {
        this.数据 = 值
        this.socket.emit(this.事件名称, this.数据, () => {
          res(null)
        })
      })
      return null
    })
  }
}
