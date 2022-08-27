import { RendererElement, RendererNode, VNode } from 'vue'
import { Effect } from '../../Package/Effect/Effect'
import { Vue响应值 } from '../../Package/Vue/Vue响应值'
import { Vue模板 } from '../../Package/Vue/Vue模板'
import Page from './Page.vue'

export class Page1 implements Vue模板 {
  static Page1(name: Vue响应值<string>, on测试事件: () => Effect<null>) {
    return new Page1('Page1', name, on测试事件)
  }
  private constructor(
    private 构造子: 'Page1',
    private name: Vue响应值<string>,
    private on测试事件: () => Effect<null>,
  ) {}
  获得模板(): VNode<RendererNode, RendererElement, { [key: string]: any }> {
    return Page as any
  }
  获得参数(): Record<string, unknown> {
    return {
      name: this.name,
      on测试事件: () => {
        this.on测试事件().运行()
      },
    }
  }
}
