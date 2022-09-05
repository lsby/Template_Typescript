// npm i pdf-img-convert@1.0.6
import { Aff } from '../Aff/Aff'

var pdf2img = require('pdf-img-convert')

export class PDF转base64 {
  constructor(private pdf路径: string, private 页数: number[]) {}
  运行(): Aff<string[]> {
    return new Aff(async () => {
      var c = await pdf2img.convert(this.pdf路径, {
        page_numbers: this.页数,
        base64: true,
      })
      return c.map((a: string) => 'data:image/jpeg;base64,' + a)
    })
  }
}
