import { NextFunction, Request, Response } from 'express'

export default function () {
    return function (req: Request, res: Response, next: NextFunction) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,X-Token')
        res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
        res.header('Content-Type', 'application/json;charset=utf-8')
        next()
    }
}
