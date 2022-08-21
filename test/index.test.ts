import 'mocha'
import { add } from '../src/Index'

function 断言相等(a: any, b: any) {
  if (JSON.stringify(a) == JSON.stringify(b)) return
  throw new Error(`${JSON.stringify(a)} 不等于 ${JSON.stringify(b)}`)
}

describe('测试', function () {
  断言相等(add(1, 2), 3)
})
