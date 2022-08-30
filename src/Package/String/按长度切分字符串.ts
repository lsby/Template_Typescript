export class 按长度切分字符串 {
  constructor(private 内容: string, private 长度: number) {}
  切分(): string[] {
    var 分片内容 = this.内容.substring(0, this.长度)
    var 剩余内容 = this.内容.substring(this.长度)
    if (剩余内容.length == 0) {
      return [分片内容]
    }
    return [分片内容, ...new 按长度切分字符串(剩余内容, this.长度).切分()]
  }
  带序号切分(): { 内容: string; 序号: number }[] {
    var c = this.切分()
    return c.map((a, i) => ({ 内容: a, 序号: i }))
  }
}
