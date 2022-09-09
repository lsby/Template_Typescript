import { Aff } from '../../Package/Aff/Aff'
import { Debug } from '../../Package/Debug/Debug'
import { Flex元素, Flex布局 } from '../../Package/Vue/Flex布局'
import { Vue } from '../../Package/Vue/Vue'
import DemoPage from './Component/DemoPage/Index'
import DemoPage2 from './Component/DemoPage2/Index'
import { MyButton } from './Component/MyButton/Index'

localStorage.debug = '*'

var page2 = new Flex布局([
  new Flex元素(
    new Flex布局([new Flex元素(new DemoPage2({})), new Flex元素(new DemoPage2({}))], {
      方向: '上下',
      主轴对齐方式: '间隔',
      交叉轴对齐方式: '居中',
    }),
  ),
  new Flex元素(new Flex布局([new Flex元素(new DemoPage2({}))], { 主轴对齐方式: '居中', 交叉轴对齐方式: '居中' })),
])

export default Aff.do()
  .bind('D', () => Aff.pure(new Debug('App:Web')))
  .bind('按钮', () => Aff.pure(new MyButton()))
  .bind('p', (env) =>
    Aff.pure(
      new DemoPage(
        { 列表: ['a', 'b', 'c'], 按钮组件: env.按钮 },
        (old, a) =>
          new Aff(async () => ({
            ...old,
            列表: [...old.列表, a],
          })),
      ),
    ),
  )
  .bind('page2', (env) => Aff.pure(page2))
  .run((env) =>
    Aff.提升Effect(
      new Vue(
        [
          { 路径: '/', 元素: env.p },
          { 路径: '/page2', 元素: env.page2 },
        ],
        [],
        'app',
      ).渲染(),
    ),
  )
  .不带回调运行()
