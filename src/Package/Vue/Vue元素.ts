import { VNode } from 'vue'
import { Aff } from '../Aff/Aff'

export interface Vue元素<T extends Record<string, unknown>> {
  获得模板(): VNode
  获得参数(): T
  获得事件(): Record<string, (a: T, ...args: any[]) => Aff<T>>
}
