export class 静态路径 {
  static 静态路径(访问路径: string, 文件夹路径: string) {
    return new 静态路径('静态路径', 访问路径, 文件夹路径)
  }
  private constructor(private 构造子: '静态路径', private 访问路径: string, private 文件夹路径: string) {}
  取访问路径(): string {
    return this.访问路径
  }
  取文件夹路径(): string {
    return this.文件夹路径
  }
}
