import { 获得环境变量 } from '../src/Lib/GetEnv'
import fs from 'fs'
import path from 'path'
import axios from 'axios'

async function main() {
  var { APP_PORT } = 获得环境变量()

  var names = fs.readdirSync(path.resolve(__dirname, '../src/interface/'))
  console.log(`找到${names.length}个接口`)

  for (var i = 0; i < names.length; i++) {
    var name = names[i]
    console.log(`开始请求接口: ${name} (${i + 1}/${names.length})`)
    await axios({
      method: 'post',
      url: `http://127.0.0.1:${APP_PORT}/api/${encodeURI(name)}`,
      headers: {
        'Content-Type': 'text/plain',
      },
      data: {},
    })
  }
}
main()
