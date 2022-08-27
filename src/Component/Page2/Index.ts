import { RendererElement, RendererNode, VNode } from 'vue'
import { Aff } from '../../Package/Aff/Aff'
import { Effect } from '../../Package/Effect/Effect'
import { Vue响应值 } from '../../Package/Vue/Vue响应值'
import { Vue模板 } from '../../Package/Vue/Vue模板'
import Page from './Page.vue'

export class Page2 implements Vue模板 {
  static Page2(列表: Vue响应值<string[]>, on添加列表: (a: string) => Aff<null>) {
    return new Page2('Page2', 列表, on添加列表)
  }
  private constructor(
    private 构造子: 'Page2',
    private 列表: Vue响应值<string[]>,
    private on添加列表: (a: string) => Aff<null>,
  ) {}
  获得模板(): VNode<RendererNode, RendererElement, { [key: string]: any }> {
    return Page as any
  }
  获得参数(): Record<string, unknown> {
    return {
      列表: this.列表,
      on添加列表: (a: string) => {
        this.on添加列表(a).运行为Promise()
      },
    }
  }
}
