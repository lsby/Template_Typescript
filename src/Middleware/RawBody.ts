import { NextFunction, Request, Response } from 'express'

declare global {
  namespace Express {
    interface Request {
      rawBody: Promise<string>
    }
  }
}

export default function () {
  return function (req: Request, res: Response, next: NextFunction) {
    req.rawBody = new Promise((resolve) => {
      var buf = ''
      req.on('data', (x) => (buf += x))
      req.on('end', () => {
        resolve(buf)
      })
    })
    next()
  }
}
