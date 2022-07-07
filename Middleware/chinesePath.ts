import { NextFunction, Request, Response } from 'express'
import url from 'url'

export default function () {
  return function (req: Request, res: Response, next: NextFunction) {
    var url对象 = url.parse(req.url)
    if (url对象.pathname == null || url对象.path == null) return next()
    req.url = req.originalUrl = url对象.path.replace(url对象.pathname, decodeURIComponent(url对象.pathname))
    next()
  }
}
