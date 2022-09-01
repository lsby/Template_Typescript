import { RendererElement, RendererNode, VNode } from 'vue'
import { Aff } from '../../Package/Aff/Aff'
import { Vue模板 } from '../../Package/Vue/Vue模板'
import Page from './Page.vue'

export class ElectronTestPage implements Vue模板 {
  constructor(private on测试事件: () => Aff<null>) {}
  获得模板(): VNode<RendererNode, RendererElement, { [key: string]: any }> {
    return Page as any
  }
  获得参数(): Record<string, unknown> {
    return {
      on测试事件: () => {
        this.on测试事件().不带回调运行().运行()
      },
    }
  }
}
