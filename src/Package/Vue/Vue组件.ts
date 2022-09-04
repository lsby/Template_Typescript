import { h, VNode } from 'vue'
import { Effect } from '../Effect/Effect'
import { Vue元素 } from './Vue元素'

export class Vue组件<T extends Record<string, unknown>> {
  constructor(private 元素: Vue元素<T>) {}
  取组件(): Effect<VNode> {
    return new Effect(() => {
      return h(this.元素.获得模板(), this.元素.获得参数())
    })
  }
  转换为元素(): Vue元素<T> {
    return this.元素
  }
}
