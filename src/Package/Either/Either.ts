const _构造子: unique symbol = Symbol()
const _值: unique symbol = Symbol()
export type Either<A, B> = { [_构造子]: 'Left'; [_值]: A } | { [_构造子]: 'Right'; [_值]: B }

export function Left<A, B>(a: A): Either<A, B> {
  return { [_构造子]: 'Left', [_值]: a }
}
export function Right<A, B>(a: B): Either<A, B> {
  return { [_构造子]: 'Right', [_值]: a }
}

export function 模式匹配<A, B, C>(a: Either<A, B>, l: (a: A) => C, r: (a: B) => C): C {
  if (a[_构造子] == 'Left') return l(a[_值])
  return r(a[_值])
}
