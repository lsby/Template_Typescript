export class 静态路径 {
  constructor(private 访问路径: string, private 文件夹路径: string) {}
  取访问路径(): string {
    return this.访问路径
  }
  取文件夹路径(): string {
    return this.文件夹路径
  }
}
