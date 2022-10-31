import { createApp } from 'vue'
import * as VueRouter from 'vue-router'
import { Plugin } from 'vue/dist/vue'
import { Aff } from '../Aff/Aff'
import App from './Vue.vue'
import { Vue组件, 取模板和参数 } from './Vue组件'

const _页面们: unique symbol = Symbol()
const _插件们: unique symbol = Symbol()
const _挂载点: unique symbol = Symbol()
export type 页面 = { 路径: string; 组件: Vue组件<any> }
export type 插件 = { 插件: Plugin; 配置: any[] }
export type Vue = {
  [_页面们]: 页面[]
  [_插件们]: 插件[]
  [_挂载点]: string
}

export function Vue(页面们: 页面[], 插件们: 插件[], 挂载点: string): Vue {
  return {
    [_页面们]: 页面们,
    [_插件们]: 插件们,
    [_挂载点]: 挂载点,
  }
}

export function 运行(a: Vue): Aff<void> {
  return Aff(async () => {
    var app = createApp(App as any)
    for (var 插件 of a[_插件们]) {
      app.use(插件.插件, 插件.配置)
    }
    app.use(
      VueRouter.createRouter({
        history: VueRouter.createWebHashHistory(),
        routes: a[_页面们].map((a) => {
          var x = 取模板和参数(a.组件)
          return {
            path: a.路径,
            component: x.模板,
            props: x.参数,
          }
        }),
      }),
    )
    app.mount('#' + a[_挂载点])
  })
}
