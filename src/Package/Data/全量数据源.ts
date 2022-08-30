import { Aff } from '../Aff/Aff'

export interface 全量数据源<数据> {
  读取数据(): Aff<数据>
}
