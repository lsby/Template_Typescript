import { RendererElement, RendererNode, VNode } from 'vue'
import { Aff } from '../../Package/Aff/Aff'
import { Vue模板 } from '../../Package/Vue/Vue模板'
import Page from './Page.vue'

type T = { name: string }
export class Page1 implements Vue模板<T> {
  constructor(private 参数: T, private on测试事件: () => Aff<T>) {}
  获得事件(): Record<string, (a: T, ...args: any[]) => Aff<T>> {
    return {
      on测试事件: this.on测试事件,
    }
  }
  获得模板(): VNode<RendererNode, RendererElement, { [key: string]: any }> {
    return Page as any
  }
  获得参数(): T {
    return this.参数
  }
}
