import { 转换 } from '../Class/转换'

export class Recursion<A, B> {
  constructor(
    private 循环条件: (a: A) => boolean,
    private 循环值迭代式: (a: A) => A,
    private 函数: 转换<A, B>,
    private 合并式: (a: B, b: B) => B,
  ) {}
  run(x: A, init: B) {
    var 当前循环值 = x
    var 当前结果值 = init

    while (1) {
      if (!this.循环条件(当前循环值)) {
        return 当前结果值
      }

      当前结果值 = this.合并式(当前结果值, this.函数.转换(当前循环值))
      当前循环值 = this.循环值迭代式(当前循环值)
    }
  }
}
