// npm i vue@^3.2.35
import { createApp } from 'vue'
import * as VueRouter from 'vue-router'
import { Effect } from '../Effect/Effect'
import App from './Vue.vue'
import { Vue元素 } from './Vue元素'

export class Vue {
  constructor(
    private 页面们: { 路径: string; 元素: Vue元素<any> }[],
    private 插件们: { 插件: App.Plugin; 配置: any[] }[],
    private 挂载点: string,
  ) {}
  渲染(): Effect<null> {
    return new Effect(() => {
      var app = createApp(App as any)
      for (var 插件 of this.插件们) {
        app.use(插件.插件, 插件.配置)
      }
      app.use(
        VueRouter.createRouter({
          history: VueRouter.createWebHashHistory(),
          routes: this.页面们.map((a) => {
            var x = a.元素._预处理().运行()
            return {
              path: a.路径,
              component: x.模板,
              props: x.实际参数,
            }
          }),
        }),
      )
      app.mount('#' + this.挂载点)
      return null
    })
  }
}
