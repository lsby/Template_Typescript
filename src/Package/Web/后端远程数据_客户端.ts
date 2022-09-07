import socketIO from 'socket.io-client/build/esm/socket'
import { Aff } from '../Aff/Aff'
import { Effect } from '../Effect/Effect'

export class 后端远程数据_客户端<T> {
  static 创建<T>(
    socket: socketIO.Socket,
    事件名称: string,
    初始值: T,
    修改回调: (a: T) => Aff<null>,
  ): Effect<后端远程数据_客户端<T>> {
    return new Effect(() => {
      var r = new 后端远程数据_客户端(初始值, 修改回调)
      socket.on(事件名称, async (a, back) => {
        await r._不安全的设置值(a).运行为Promise()
        back()
      })
      return r
    })
  }

  private 数据: T
  private constructor(初始值: T, private 修改回调: (a: T) => Aff<null>) {
    this.数据 = 初始值
  }
  private _不安全的设置值(值: T): Aff<null> {
    return Aff.提升副作用函数(() => (this.数据 = 值)).bind((_) => this.修改回调(this.数据))
  }
  取值(): Effect<T> {
    return new Effect(() => {
      return this.数据
    })
  }
}
