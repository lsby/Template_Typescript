import { RendererElement, RendererNode, VNode } from 'vue'
import { Effect } from '../../Package/Effect/Effect'
import { Vue响应值 } from '../../Package/Vue/Vue响应值'
import { Vue模板 } from '../../Package/Vue/Vue模板'
import Page from './Page.vue'

export class Button2 implements Vue模板 {
  static Button2() {
    return new Button2('Button2')
  }
  private constructor(private 构造子: 'Button2') {}
  获得模板(): VNode<RendererNode, RendererElement, { [key: string]: any }> {
    return Page as any
  }
  获得参数(): Record<string, unknown> {
    return {}
  }
}
