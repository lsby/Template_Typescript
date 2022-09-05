export class 多值选择<A, B> {
  constructor(private 输入值: A, private 默认值: B, private 模式们: [(a: A) => boolean, B][]) {}
  运行(): B {
    for (var 模式 of this.模式们) {
      if (模式[0](this.输入值)) return 模式[1]
    }
    return this.默认值
  }
}
