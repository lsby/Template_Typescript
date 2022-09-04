import { RendererElement, RendererNode, VNode } from 'vue'
import { Aff } from '../../Package/Aff/Aff'
import { Vue模板 } from '../../Package/Vue/Vue模板'
import Page from './Page.vue'

type T = {}
export class MyButton implements Vue模板<T> {
  constructor() {}
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
