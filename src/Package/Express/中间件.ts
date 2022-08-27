import { Request, Response, NextFunction } from 'express'
import { Aff } from '../Aff/Aff'

export class 中间件 {
  static 中间件(实现: (req: Request, res: Response, next: NextFunction) => void) {
    return new 中间件('中间件', 实现)
  }
  private constructor(
    private 构造子: '中间件',
    private 实现: (req: Request, res: Response, next: NextFunction) => void,
  ) {}
  取实现(): (req: Request, res: Response, next: NextFunction) => void {
    return this.实现
  }
}
