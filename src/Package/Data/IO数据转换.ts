import { Aff } from '../Aff/Aff'
import { Debug } from '../Debug/Debug'
import { Function } from '../Function/Function'
import { 分页数据源 } from './分页数据源'
import { 数据目的 } from './数据目的'

export class IO数据转换<数据, 转换后数据> {
  constructor(
    private 数据源: 分页数据源<数据>,
    private 转换函数: Function<数据, Aff<转换后数据[]>>,
    private 数据目的: 数据目的<转换后数据>,
  ) {}
  执行(): Aff<null> {
    return new Aff(async () => {
      var D = new Debug('Package:Data:IO数据转换')
      var 序数 = 0
      while (true) {
        D.log('准备读取数据 本轮序数是 %d', 序数).运行()
        var 数据 = await this.数据源.分页读取数据(序数).运行为Promise()
        if (数据.length == 0) {
          D.log('IO数据转换结束').运行()
          break
        }
        D.log('序数 %d: 读取了 %d 条数据', 序数, 数据.length).运行()
        for (var ci = 0; ci < 数据.length; ci++) {
          D.log('序数 %d: 开始处理第 %d/%d 条数据', 序数, ci + 1, 数据.length).运行()
          var c = 数据[ci]
          var x = await this.转换函数(c).运行为Promise()
          D.log('序数 %d: 转换过程结束, 获得了 %d 条处理后数据', 序数, x.length).运行()
          for (var di = 0; di < x.length; di++) {
            D.log('序数 %d: 开始写入第 %d/%d 条数据', 序数, di + 1, x.length).运行()
            await this.数据目的.写入数据(x[di]).运行为Promise()
          }
          D.log('序数 %d: 本组写入结束', 序数).运行()
        }
        D.log('序数 %d: 准备开始下一轮', 序数).运行()
        序数++
      }
      return null
    })
  }
}
