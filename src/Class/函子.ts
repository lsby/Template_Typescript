import { Beta规约, Lambda1, Lambda2, Lambda3, Lambda项 } from '@lsby/ts_lambda_type'

export interface 函子<A> {
  map<B>(f: (a: A) => B): 函子<B>
}

// type TT<A> = [A]

// function f<A extends TT, B extends number>(a: A<B>) {}

type MyType<A, B> = [A, B]

type Lambda1转字符串<A> = A extends Lambda1<infer n> ? n : never
type 一阶类型<A> = A extends 'number' ? number : never
type 二阶类型<A, B> = A extends 'Array' ? Array<B> : never
type 三阶类型<A, B, C> = A extends 'MyType' ? MyType<B, C> : never

type Lambda类型翻译<A> = A extends Lambda1<infer n>
  ? 一阶类型<n>
  : A extends Lambda3<infer a, infer b>
  ? 二阶类型<Lambda1转字符串<a>, Lambda类型翻译<b>>
  : never

type TT = Lambda2<'A', Lambda2<'B', Lambda3<Lambda3<Lambda1<'MyType'>, Lambda1<'A'>>, Lambda1<'B'>>>>
type xx = Beta规约<Lambda3<Beta规约<Lambda3<TT, Lambda1<'number'>>>, Lambda1<'string'>>>
type dd = Lambda类型翻译<xx>
