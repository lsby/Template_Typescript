import { Aff } from '../Aff/Aff'

export interface 分页数据源<数据> {
  分页读取数据(序数: number): Aff<数据[]>
}
