import { Aff } from '../Aff/Aff'

export interface 数据目的<数据> {
  写入数据(数据: 数据): Aff<null>
}
