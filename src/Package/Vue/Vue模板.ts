import { VNode } from 'vue'

export interface Vue模板 {
  获得模板(): VNode
  获得参数(): Record<string, unknown>
}
