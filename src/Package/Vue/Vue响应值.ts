import { ref } from 'vue'
import { Effect } from '../Effect/Effect'

export class Vue响应值<A> {
  static Vue响应值<A>(值: A): Effect<Vue响应值<A>> {
    return Effect.Effect(() => {
      return new Vue响应值('Vue响应值', 值)
    })
  }
  private 响应值
  private constructor(private 构造子: 'Vue响应值', 值: A) {
    this.响应值 = ref(值)
  }
  取值(): Effect<A> {
    return Effect.Effect(() => {
      return this.响应值.value as any
    })
  }
  设置值(新值: A): Effect<null> {
    return Effect.Effect(() => {
      this.响应值.value = 新值 as any
      return null
    })
  }
}
