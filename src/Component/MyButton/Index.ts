import { RendererElement, RendererNode, VNode } from 'vue'
import { Aff } from '../../Package/Aff/Aff'
import { Vue元素 } from '../../Package/Vue/Vue元素'
import Page from './Page.vue'

type T = {}
export class MyButton extends Vue元素<T> {
  constructor() {
    super()
  }
  获得事件(): Record<string, (a: T, ...args: any[]) => Aff<T>> {
    return {}
  }
  获得模板(): VNode<RendererNode, RendererElement, { [key: string]: any }> {
    return Page as any
  }
  获得参数(): T {
    return {}
  }
}
