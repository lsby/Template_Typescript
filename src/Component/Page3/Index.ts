import { RendererElement, RendererNode, VNode } from 'vue'
import { Aff } from '../../Package/Aff/Aff'
import { Vue响应值 } from '../../Package/Vue/Vue响应值'
import { Vue模板 } from '../../Package/Vue/Vue模板'
import { Vue组件 } from '../../Package/Vue/Vue组件'
import Page from './Page.vue'

export class Page3 implements Vue模板 {
  static Page3(按钮组件: Vue组件, 列表: Vue响应值<string[]>, on添加列表: (a: string) => Aff<null>) {
    return new Page3('Page3', 按钮组件, 列表, on添加列表)
  }
  private constructor(
    private 构造子: 'Page3',
    private 按钮组件: Vue组件,
    private 列表: Vue响应值<string[]>,
    private on添加列表: (a: string) => Aff<null>,
  ) {}
  获得模板(): VNode<RendererNode, RendererElement, { [key: string]: any }> {
    return Page as any
  }
  获得参数(): Record<string, unknown> {
    return {
      按钮组件: this.按钮组件,
      列表: this.列表,
      on添加列表: (a: string) => {
        this.on添加列表(a).运行为Promise()
      },
    }
  }
}
