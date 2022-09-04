import { createApp, ref, toRaw } from 'vue'
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
            var 模板 = a.元素.获得模板()
            var 参数 = a.元素.获得参数()
            var 事件 = a.元素.获得事件()

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

            return {
              path: a.路径,
              component: 模板,
              props: 实际参数,
            }
          }),
        }),
      )
      app.mount('#' + this.挂载点)
      return null
    })
  }
}
