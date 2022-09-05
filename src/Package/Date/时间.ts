// npm i moment@^2.29.4
import moment from 'moment'
moment.locale('zh-cn')

export class 时间 {
  private 数据
  static 今天的头(): 时间 {
    return new 时间(moment().startOf('day'))
  }
  static 今天的尾(): 时间 {
    return new 时间(moment().endOf('day'))
  }
  static 本周的头(): 时间 {
    return new 时间(moment().startOf('week'))
  }
  static 本周的尾(): 时间 {
    return new 时间(moment().endOf('week'))
  }
  static 本月的头(): 时间 {
    return new 时间(moment().startOf('month'))
  }
  static 本月的尾(): 时间 {
    return new 时间(moment().endOf('month'))
  }
  constructor(inp?: moment.MomentInput) {
    var _数据 = moment(inp)
    if (_数据.unix() == NaN) throw new Error('输入时间无法解析')
    this.数据 = _数据
  }
  增加天(n: number): 时间 {
    return new 时间(this.数据.clone().add(n, 'day'))
  }
  减少天(n: number): 时间 {
    return new 时间(this.数据.clone().subtract(n, 'day'))
  }
  增加周(n: number): 时间 {
    return new 时间(this.数据.clone().add(n, 'week'))
  }
  减少周(n: number): 时间 {
    return new 时间(this.数据.clone().subtract(n, 'week'))
  }
  增加月(n: number): 时间 {
    return new 时间(this.数据.clone().add(n, 'month'))
  }
  减少月(n: number): 时间 {
    return new 时间(this.数据.clone().subtract(n, 'month'))
  }
  天的头(): 时间 {
    return new 时间(this.数据.clone().startOf('day'))
  }
  天的尾(): 时间 {
    return new 时间(this.数据.clone().endOf('day'))
  }
  周的头(): 时间 {
    return new 时间(this.数据.clone().startOf('week'))
  }
  周的尾(): 时间 {
    return new 时间(this.数据.clone().endOf('week'))
  }
  月的头(): 时间 {
    return new 时间(this.数据.clone().startOf('month'))
  }
  月的尾(): 时间 {
    return new 时间(this.数据.clone().endOf('month'))
  }
  格式化(格式: string): string {
    return this.数据.format(格式)
  }
  转到数据库格式(): string {
    return this.格式化('YYYY-MM-DD HH:mm:ss')
  }
  获得10位unix时间(): number {
    return this.数据.unix()
  }
  获得13位unix时间(): number {
    return this.数据.unix() * 1000
  }
}
