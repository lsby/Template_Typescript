import { h, ref, toRaw, VNode } from 'vue'
import { Aff, run } from '../Aff/Aff'
import { Eff } from '../Eff/Eff'

const _模板: unique symbol = Symbol()
const _参数: unique symbol = Symbol()
const _事件: unique symbol = Symbol()
export type Vue组件<T extends Record<string, unknown>> = {
  [_模板]: VNode
  [_参数]: T
  [_事件]: Record<string, (a: T, ...args: any[]) => Aff<T>>
}

export function Vue组件<T extends Record<string, unknown>>(
  模板: VNode,
  参数: T,
  事件: Record<string, (a: T, ...args: any[]) => Aff<T>>,
): Vue组件<T> {
  return {
    [_模板]: 模板,
    [_参数]: 参数,
    [_事件]: 事件,
  }
}

export function 取模板和参数<T extends Record<string, unknown>>(a: Vue组件<T>) {
  var 模板 = a[_模板]
  var 参数 = a[_参数]
  var 事件 = a[_事件]

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
        var 返回值 = await run(事件[n](原始值, ...args))
        Object.keys(返回值).forEach((nn) => {
          实际参数[nn].value = 返回值[nn]
        })
      }
    )(n)
  })
  return { 模板, 参数: 实际参数 }
}

export function 转换为Vue元素(a: Vue组件<any>, 前置设置?: Record<string, unknown>): VNode {
  var x = 取模板和参数(a)
  return h(x.模板, { ...前置设置, ...x.参数 })
}
