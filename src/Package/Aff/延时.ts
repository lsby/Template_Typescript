import { Aff } from './Aff'

export class 延时 {
  constructor(private 毫秒: number) {}
  转换到Aff(): Aff<null> {
    return new Aff(async () => {
      await new Promise((res, rej) => {
        setTimeout(() => {
          res(null)
        }, this.毫秒)
      })
      return null
    })
  }
}
