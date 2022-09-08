import { RendererElement, RendererNode, VNode } from 'vue'
import { Aff } from '../../../../Package/Aff/Aff'
import { Vue元素 } from '../../../../Package/Vue/Vue元素'
import Page from './Page.vue'

type T = { 按钮组件: Vue元素<{}>; 列表: string[] }
export default class extends Vue元素<T> {
  constructor(private 参数: T, private on添加列表: (old: T, a: string) => Aff<T>) {
    super()
  }
  获得事件(): Record<string, (a: T, ...args: any[]) => Aff<T>> {
    return {
      on添加列表: this.on添加列表,
    }
  }
  获得模板(): VNode<RendererNode, RendererElement, { [key: string]: any }> {
    return Page as any
  }
  获得参数(): T {
    return this.参数
  }
}
