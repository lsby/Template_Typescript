import { WebApp_客户端 } from '../../Package/Web/WebApp_客户端'
import Page1 from './Page1/Index'
import Login from './Login/Index'
import { 接口类型, 接口调用者符号, 数据仓库符号, 数据类型 } from './Types'

localStorage.debug = '*'

export default new WebApp_客户端<数据类型, 接口类型>({
  页面们: [
    { 路径: '/', 元素: new Login() },
    { 路径: '/page1', 元素: new Page1() },
  ],
  插件们: [],
  初始数据: { 这是数据: '' },
  挂载点: 'app',
  数据仓库符号: 数据仓库符号,
  接口仓库符号: 接口调用者符号,
})
  .运行()
  .不带回调运行()
