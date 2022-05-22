import path from 'path'
import dotenv from 'dotenv'

export function 获得环境变量() {
    if (process.env['NODE_ENV'] == 'development') {
        console.log('使用 dev 环境')
        dotenv.config({ path: path.resolve(__dirname, '../../.env/dev.env') })
    } else if (process.env['NODE_ENV'] == 'release') {
        console.log('使用 release 环境')
        dotenv.config({ path: path.resolve(__dirname, '../../.env/release.env') })
    } else if (process.env['NODE_ENV'] == 'production') {
        console.log('使用 production 环境')
        dotenv.config({ path: path.resolve(__dirname, '../../.env/prod.env') })
    } else {
        throw '没有指定运行环境'
    }
}
