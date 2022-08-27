import { Function } from '../Function/Function'

export class Either<A, B> {
  static Left<A, B>(值: A): Either<A, B> {
    return new Either('Left', 值) as any
  }
  static Right<A, B>(值: B): Either<A, B> {
    return new Either('Right', 值) as any
  }
  private constructor(private 构造子: 'Left' | 'Right', private 值: A | B) {}
  map<C>(f: Function<B, C>): Either<A, C> {
    if (this.构造子 == 'Left') return this as any
    return Either.Right(f(this.值 as any))
  }
  apply<C, _>(f: Either<_, Function<B, C>>): Either<A, C> {
    if (this.构造子 == 'Left') return this as any
    if (f.构造子 == 'Left') return this as any
    return Either.Right((f.值 as any)(this.值))
  }
  bind<C>(f: Function<B, C>): Either<A, C> {
    if (this.构造子 == 'Left') return this as any
    return Either.Right(f(this.值 as any))
  }
  isLeft(): boolean {
    return this.构造子 == 'Left'
  }
  isRight(): boolean {
    return this.构造子 == 'Right'
  }
  不安全的获取值() {
    return this.值
  }
  getLeft(def: A) {
    if (this.isLeft()) return this.值
    return def
  }
  getRight(def: B) {
    if (this.isRight()) return this.值
    return def
  }
}
