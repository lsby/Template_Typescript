export type Either<A, B> = { 构造子: 'Left'; 值: A } | { 构造子: 'Right'; 值: B }

export function Left<A, B>(a: A): Either<A, B> {
  return { 构造子: 'Left', 值: a }
}
export function Right<A, B>(a: B): Either<A, B> {
  return { 构造子: 'Right', 值: a }
}

export function Either_case<A, B, C>(a: Either<A, B>, l: (a: A) => C, r: (a: B) => C): C {
  if (a.构造子 == 'Left') return l(a.值)
  return r(a.值)
}
