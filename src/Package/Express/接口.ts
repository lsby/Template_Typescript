import { Request, Response } from 'express'
import { Aff } from '../Aff/Aff'
import { 中间件 } from './中间件'

export interface 接口 {
  取访问路径(): string
  取使用的中间件(): 中间件[]
  取接口实现(): (req: Request, res: Response) => Aff<null>
}
