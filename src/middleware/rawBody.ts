import { NextFunction, Request, Response } from 'express'

declare global {
    namespace Express {
        interface Request {
            rawBody: Promise<string>
        }
    }
}

export default function (opt: { path: string[] }) {
    return function (req: Request, res: Response, next: NextFunction) {
        if (!opt.path.includes(req.path)) {
            return next()
        }
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
