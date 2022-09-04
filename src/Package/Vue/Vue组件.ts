import { h, VNode } from 'vue'
import { Effect } from '../Effect/Effect'
import { Vue模板 } from './Vue模板'

export class Vue组件<T extends Record<string, unknown>> {
  constructor(private 模板: Vue模板<T>) {}
  取组件(): Effect<VNode> {
    return new Effect(() => {
      return h(this.模板.获得模板(), this.模板.获得参数())
    })
  }
  转换为模板(): Vue模板<T> {
    return this.模板
  }
}
