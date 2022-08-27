import { h, ref, VNode } from 'vue'
import { Effect } from '../Effect/Effect'
import { Vue模板 } from './Vue模板'

export class Vue组件 {
  static Vue组件(模板: Vue模板): Vue组件 {
    return new Vue组件('Vue组件', 模板)
  }
  private constructor(private 构造子: 'Vue组件', private 模板: Vue模板) {}
  取组件(): Effect<VNode> {
    return Effect.Effect(() => {
      return h(this.模板.获得模板(), this.模板.获得参数())
    })
  }
}
