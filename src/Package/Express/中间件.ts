import { NextFunction, Request, Response } from 'express'

export class 中间件 {
  constructor(private 实现: (req: Request, res: Response, next: NextFunction) => void) {}
  取实现(): (req: Request, res: Response, next: NextFunction) => void {
    return this.实现
  }
}
