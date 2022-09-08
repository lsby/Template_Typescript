import { InjectionKey, UnwrapNestedRefs } from 'vue'
import { 计算接口调用者 } from '../../Package/Web/WebApp_客户端'

export var 数据仓库符号: InjectionKey<UnwrapNestedRefs<数据类型>> = Symbol()
export var 接口调用者符号: InjectionKey<计算接口调用者<数据类型, 接口类型>> = Symbol()

export type 数据类型 = {
  这是数据: string
}
export type 接口类型 = [
  {
    访问路径: '/api/测试接口1'
    请求类型: {}
    返回类型: {}
  },
  {
    访问路径: '/api/测试接口2'
    请求类型: {}
    返回类型: {}
  },
  {
    访问路径: '/api/测试接口3'
    请求类型: { a: number; b: number }
    返回类型: { 结果: number }
  },
]
