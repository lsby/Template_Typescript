// 将A转换为B的抽象
export interface 转换<A, B> {
  转换(a: A): B
}
