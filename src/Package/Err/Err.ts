const _原始类型: unique symbol = Symbol()
const _错误: unique symbol = Symbol()
const _堆栈: unique symbol = Symbol()
export type Err = {
  [_原始类型]: Error
  [_错误]: string
  [_堆栈]: string
}

export function Err(...a: string[]): Err {
  var e = new Error(a.join(' '))
  return {
    [_原始类型]: e,
    [_错误]: e.message,
    [_堆栈]: e.stack || '',
  }
}
