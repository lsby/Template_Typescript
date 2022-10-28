export type Err = {
  原始类型: Error
  错误: string
  堆栈: string
}

export function Err(...a: string[]): Err {
  var e = new Error(a.join(' '))
  return {
    原始类型: e,
    错误: e.message,
    堆栈: e.stack || '',
  }
}
