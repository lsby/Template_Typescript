/**
 * 描述一个Express静态路径
 * 通过传入以下数据来创建:
 * - 访问路径
 * - 本地文件夹路径
 */

// 符号定义
const 类型: unique symbol = Symbol('类型')
const 构造子: unique symbol = Symbol('构造子')
const 参数: unique symbol = Symbol('参数')

// 类型定义
export type 静态路径 = { [类型]: '静态路径'; [构造子]: '静态路径'; [参数]: { 访问路径: string; 文件夹路径: string } }

// 构造子
export function 静态路径(访问路径: string, 文件夹路径: string) {
  return { [类型]: '静态路径' as '静态路径', [构造子]: '静态路径' as '静态路径', [参数]: { 访问路径, 文件夹路径 } }
}

// 函数
export function 解包(a: 静态路径): { 访问路径: string; 文件夹路径: string } {
  return a[参数]
}
