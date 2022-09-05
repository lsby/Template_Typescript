import { VNode, RendererNode, RendererElement } from 'vue'
import { Aff } from '../Aff/Aff'
import { Vue元素 } from './Vue元素'
import { h, Ref } from 'vue'
import { 多值选择 } from '../Exp/多值选择'

export type Flex容器设置 = {
  区域?: '块' | '内联'
  方向?: '左右' | '右左' | '上下' | '下上'
  换行?: '否' | '正向' | '逆向'
  主轴对齐方式?: '起点' | '终点' | '居中' | '两端' | '间隔'
  交叉轴对齐方式?: '起点' | '终点' | '居中' | '基线' | '占满'
  多轴对其方式?: '起点' | '终点' | '居中' | '两端' | '间隔' | '占满'
}

export class Flex布局 extends Vue元素<{}> {
  constructor(private 元素们: Flex元素<any>[], private 设置?: Flex容器设置) {
    super()
  }
  获得模板(): VNode<RendererNode, RendererElement, { [key: string]: any }> {
    return h(
      'div',
      {
        style: {
          width: '100%',
          height: '100%',
          ...this.转换Flex容器设置(this.设置),
        },
      },
      this.元素们.map((a) => h('div', { style: this.转换Flex元素设置(a.设置) }, [a.元素.转换为组件().运行()])),
    )
  }
  获得参数(): {} {
    return {}
  }
  获得事件(): Record<string, (a: {}, ...args: any[]) => Aff<{}>> {
    return {}
  }
  private 转换Flex元素设置(a: Flex元素设置 | undefined) {
    return {
      order: a?.排序 || null,
      flexGrow: a?.放大比例 || null,
      flexShrink: a?.缩小比例 || null,
      flexBasis: a?.主轴空间 || null,
      flexSelf: new 多值选择(a, null, [
        [(a) => a?.覆盖交叉轴对齐方式 == '起点', 'flex-start'],
        [(a) => a?.覆盖交叉轴对齐方式 == '终点', 'flex-end'],
        [(a) => a?.覆盖交叉轴对齐方式 == '居中', 'center'],
        [(a) => a?.覆盖交叉轴对齐方式 == '基线', 'baseline'],
        [(a) => a?.覆盖交叉轴对齐方式 == '占满', 'stretch'],
      ]).运行(),
    }
  }
  private 转换Flex容器设置(a: Flex容器设置 | undefined) {
    return {
      display: new 多值选择(a, 'flex', [
        [(a) => a?.区域 == '块', 'flex'],
        [(a) => a?.区域 == '内联', 'inline-flex'],
      ]).运行(),
      flexDirection: new 多值选择(a, 'row', [
        [(a) => a?.方向 == '左右', 'row'],
        [(a) => a?.方向 == '右左', 'row-reverse'],
        [(a) => a?.方向 == '上下', 'column'],
        [(a) => a?.方向 == '下上', 'column-reverse'],
      ]).运行(),
      flexWrap: new 多值选择(a, 'nowrap', [
        [(a) => a?.换行 == '否', 'nowrap'],
        [(a) => a?.换行 == '正向', 'wrap'],
        [(a) => a?.换行 == '逆向', 'wrap-reverse'],
      ]).运行(),
      justifyContent: new 多值选择(a, 'flex-start', [
        [(a) => a?.主轴对齐方式 == '起点', 'flex-start'],
        [(a) => a?.主轴对齐方式 == '终点', 'flex-end'],
        [(a) => a?.主轴对齐方式 == '居中', 'center'],
        [(a) => a?.主轴对齐方式 == '两端', 'space-between'],
        [(a) => a?.主轴对齐方式 == '间隔', 'space-around'],
      ]).运行(),
      alignItems: new 多值选择(a, 'stretch', [
        [(a) => a?.交叉轴对齐方式 == '起点', 'flex-start'],
        [(a) => a?.交叉轴对齐方式 == '终点', 'flex-end'],
        [(a) => a?.交叉轴对齐方式 == '居中', 'center'],
        [(a) => a?.交叉轴对齐方式 == '基线', 'baseline'],
        [(a) => a?.交叉轴对齐方式 == '占满', 'stretch'],
      ]).运行(),
      alignContent: new 多值选择(a, 'stretch', [
        [(a) => a?.多轴对其方式 == '起点', 'flex-start'],
        [(a) => a?.多轴对其方式 == '终点', 'flex-end'],
        [(a) => a?.多轴对其方式 == '居中', 'center'],
        [(a) => a?.多轴对其方式 == '两端', 'space-between'],
        [(a) => a?.多轴对其方式 == '间隔', 'space-around'],
        [(a) => a?.多轴对其方式 == '占满', 'stretch'],
      ]).运行(),
    }
  }
}

export type Flex元素设置 = {
  排序?: number
  放大比例?: number
  缩小比例?: number
  主轴空间?: number
  覆盖交叉轴对齐方式?: '起点' | '终点' | '居中' | '基线' | '占满'
}
export class Flex元素<T extends Record<string, unknown>> {
  constructor(public 元素: Vue元素<T>, public 设置?: Flex元素设置) {}
}
