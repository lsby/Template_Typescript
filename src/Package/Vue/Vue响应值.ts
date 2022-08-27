import { ref } from 'vue'
import { Effect } from '../Effect/Effect'

export class Vue响应值<A> {
  private 响应值
  constructor(值: A) {
    this.响应值 = ref(值)
  }
  取值(): Effect<A> {
    return new Effect(() => {
      return this.响应值.value as any
    })
  }
  设置值(新值: A): Effect<null> {
    return new Effect(() => {
      this.响应值.value = 新值 as any
      return null
    })
  }
}
