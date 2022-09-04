import { h, ref, toRaw, VNode } from 'vue'
import { Aff } from '../Aff/Aff'
import { Effect } from '../Effect/Effect'

export abstract class Vue元素<T extends Record<string, unknown>> {
  abstract 获得模板(): VNode
  abstract 获得参数(): T
  abstract 获得事件(): Record<string, (a: T, ...args: any[]) => Aff<T>>
  public _预处理() {
    return new Effect(() => {
      var 模板 = this.获得模板()
      var 参数 = this.获得参数()
      var 事件 = this.获得事件()

      var 实际参数: any = {}
      Object.keys(参数).forEach((n) => {
        实际参数[n] = ref(参数[n])
      })
      Object.keys(事件).forEach((n) => {
        实际参数[n] = (
          (n) =>
          async (...args: any[]) => {
            var 原始值: any = {}
            for (var nx of Object.keys(参数)) {
              原始值[nx] = toRaw(实际参数[nx].value)
            }
            var 返回值 = await 事件[n](原始值, ...args).运行为Promise()
            Object.keys(返回值).forEach((nn) => {
              实际参数[nn].value = 返回值[nn]
            })
          }
        )(n)
      })
      return { 模板, 实际参数 }
    })
  }
  public 转换为组件(): Effect<VNode> {
    return this._预处理().bind((a) => Effect.提升副作用函数(() => h(a.模板, a.实际参数)))
  }
}
