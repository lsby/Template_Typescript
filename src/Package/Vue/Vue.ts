import { createApp } from 'vue'
import { Effect } from '../Effect/Effect'
import { Vue模板 } from './Vue模板'

export class Vue {
  static Vue(模板: Vue模板, 挂载点: string): Vue {
    return new Vue('Vue', 模板, 挂载点)
  }
  private constructor(private 构造子: 'Vue', private 模板: Vue模板, private 挂载点: string) {}
  渲染(): Effect<null> {
    return Effect.Effect(() => {
      var 模板 = this.模板.获得模板()
      var 模板参数 = this.模板.获得参数()
      var app = createApp(模板, 模板参数)
      app.mount('#' + this.挂载点)
      return null
    })
  }
}
