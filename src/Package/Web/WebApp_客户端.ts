import { 取对象值们 } from '@lsby/ts_type_fun'
import axios from 'axios'
import socketIO from 'socket.io-client'
import { createApp, InjectionKey, reactive, UnwrapNestedRefs } from 'vue'
import * as VueRouter from 'vue-router'
import { Plugin } from 'vue/dist/vue'
import { Aff } from '../Aff/Aff'
import { Debug } from '../Debug/Debug'
import { Vue元素 } from '../Vue/Vue元素'
import App from './Vue.vue'
import { 接口描述类型 } from './WebApp_Type'
import { 后端远程数据_客户端 } from './后端远程数据_客户端'

type _计算接口调用者<数据类型, arr> = arr extends []
  ? {}
  : arr extends [infer a, ...infer as]
  ? 取对象值们<a> extends [infer 路径, infer 请求类型, infer 返回类型]
    ? ((路径: 路径, 参数: 请求类型) => Promise<返回类型>) & _计算接口调用者<数据类型, as>
    : never
  : never
export type 计算接口调用者<数据类型, 接口类型> = _计算接口调用者<数据类型, 接口类型>

export class WebApp_客户端<数据类型 extends Record<string, unknown>, 接口类型 extends 接口描述类型[]> {
  constructor(
    private opt: {
      页面们: { 路径: string; 元素: Vue元素<any> }[]
      插件们: { 插件: Plugin; 配置: any[] }[]
      初始数据: 数据类型
      挂载点: string
      数据仓库符号: InjectionKey<UnwrapNestedRefs<数据类型>>
      接口仓库符号: InjectionKey<计算接口调用者<数据类型, 接口类型>>
      数据同步名称?: string
    },
  ) {}
  运行(): Aff<null> {
    var { 页面们, 插件们, 初始数据, 挂载点, 数据仓库符号, 接口仓库符号, 数据同步名称 = '数据同步事件' } = this.opt
    return new Aff(async () => {
      var D = new Debug('Package:Web:WebApp_客户端')

      var app = createApp(App as any)
      for (var 插件 of 插件们) {
        app.use(插件.插件, 插件.配置)
      }
      var route插件 = VueRouter.createRouter({
        history: VueRouter.createWebHashHistory(),
        routes: 页面们.map((a) => {
          var x = a.元素._预处理().运行()
          return {
            path: a.路径,
            component: x.模板,
            props: x.实际参数,
          }
        }),
      })
      app.use(route插件)
      app.mount('#' + 挂载点)

      var 数据仓库 = reactive(初始数据)
      var 接口仓库 = async (路径: string, 参数: any) => {
        var r = await axios.post(路径, 参数)
        return r.data
      }
      app.provide(数据仓库符号, 数据仓库)
      app.provide(接口仓库符号, 接口仓库 as any)

      var socket = socketIO()
      后端远程数据_客户端
        .创建<数据类型>(
          socket,
          数据同步名称,
          初始数据,
          (数据) =>
            new Aff(async () => {
              D.log('更新数据: %o', 数据).运行()
              Object.keys(数据).forEach((name) => {
                ;(数据仓库 as any)[name] = 数据[name]
              })
              return null
            }),
        )
        .运行()

      return null
    })
  }
}
