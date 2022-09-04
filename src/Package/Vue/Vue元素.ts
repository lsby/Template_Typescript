import { h, VNode } from 'vue'
import { Aff } from '../Aff/Aff'
import { Effect } from '../Effect/Effect'

export abstract class Vue元素<T extends Record<string, unknown>> {
  abstract 获得模板(): VNode
  abstract 获得参数(): T
  abstract 获得事件(): Record<string, (a: T, ...args: any[]) => Aff<T>>
  转换为组件(): Effect<VNode> {
    return new Effect(() => {
      return h(this.获得模板(), Object.assign(this.获得参数(), this.获得事件))
    })
  }
}
