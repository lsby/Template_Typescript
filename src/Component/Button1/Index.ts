import { RendererElement, RendererNode, VNode } from 'vue'
import { Vue模板 } from '../../Package/Vue/Vue模板'
import Page from './Page.vue'

export class Button1 implements Vue模板 {
  constructor() {}
  获得模板(): VNode<RendererNode, RendererElement, { [key: string]: any }> {
    return Page as any
  }
  获得参数(): Record<string, unknown> {
    return {}
  }
}
