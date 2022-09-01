import { Debug } from '../Debug/Debug'
import { Aff } from './Aff'

export class 带重试的Aff<A> {
  constructor(private 副作用: Aff<A>, private 最大重试次数: number, private 重试间隔: number) {}
  转换到Aff(): Aff<A> {
    return new Aff(async () => {
      var D = new Debug('Package:Aff:带重试的Aff')
      var 重试次数 = 0
      var 最后错误

      while (true) {
        if (重试次数 >= this.最大重试次数) break
        D.log('开始第 %d 次尝试', 重试次数 + 1).运行()
        try {
          var c = await this.副作用.运行为Promise()
          D.log('运行成功').运行()
          return c
        } catch (e) {
          D.log('运行失败, 错误 %o, 等待 %d 毫秒后重新尝试', e, this.重试间隔).运行()
          重试次数++
          最后错误 = e
          await new Promise((res, rej) => {
            setTimeout(() => {
              res(null)
            }, this.重试间隔)
          })
        }
      }
      D.error('尝试了 %d 次, 均失败, 最后的错误是 %o', 最后错误).运行()
      throw 最后错误
    })
  }
}
