import { createApp } from 'vue'
import * as VueRouter from 'vue-router'
import { Effect } from '../Effect/Effect'
import App from './App.vue'
import { Vue模板 } from './Vue模板'

export class Vue {
  constructor(
    private 页面们: { 路径: string; 模板: Vue模板 }[],
    private 插件: { 插件: App.Plugin; 配置: any[] }[],
    private 挂载点: string,
  ) {}
  渲染(): Effect<null> {
    return new Effect(() => {
      var app = createApp(App as any)
      for (var 插件 of this.插件) {
        app.use(插件.插件, 插件.配置)
      }
      app.use(
        VueRouter.createRouter({
          history: VueRouter.createWebHashHistory(),
          routes: this.页面们.map((a) => ({ path: a.路径, component: a.模板.获得模板(), props: a.模板.获得参数() })),
        }),
      )
      app.mount('#' + this.挂载点)
      return null
    })
  }
}
