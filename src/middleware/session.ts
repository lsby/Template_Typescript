import { NextFunction, Request, Response } from 'express'

declare global {
  namespace Express {
    interface Request {
      get_session?: () => 用户session数据
      set_session?: (数据: 用户session数据) => void
    }
  }
}

export interface 用户session数据 {
  [key: string]: string
}
export interface 用户session对象 {
  creationTime: number
  updateTime: number
  data: 用户session数据
}
export interface 用户session对象们 {
  [user_id: string]: 用户session对象
}

var 会话池: 用户session对象们 = {}

export default function (opt: { 检查时间: number; 过期时间: number }) {
  if (opt.检查时间 != 0) {
    setInterval(function () {
      var 要删除的 = []
      for (var 用户id in 会话池) {
        var 会话 = 会话池[用户id]
        if (new Date().getTime() - 会话.updateTime > opt.过期时间) {
          要删除的.push(用户id)
        }
      }
      for (var id of 要删除的) {
        delete 会话池[id]
      }
    }, opt.检查时间)
  }

  return function (req: Request, res: Response, next: NextFunction) {
    req.body.user_id = req.body.user_id || req.cookies.user_id || null

    if (req.body.user_id == null) {
      next()
      return
    }

    if (会话池[req.body.user_id] == null) {
      会话池[req.body.user_id] = {
        data: {},
        creationTime: new Date().getTime(),
        updateTime: new Date().getTime(),
      }
    }

    req.get_session = () => 会话池[req.body.user_id].data
    req.set_session = (data: 用户session数据) => {
      会话池[req.body.user_id].data = data
      会话池[req.body.user_id].updateTime = new Date().getTime()
    }

    next()
  }
}
