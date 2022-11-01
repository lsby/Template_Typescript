import { Aff, run } from './Package/Aff/Aff'
import { Vue, 运行 } from './Package/Vue/Vue'
import { Vue组件 } from './Package/Vue/Vue组件'
import 按钮 from './Page/Button.vue'
import Page from './Page/Demo.vue'

// app.运行()
var web = Vue(
  [
    {
      路径: '/',
      组件: Vue组件<{ 列表: string[]; 按钮组件: Vue组件<{}> }>(
        Page,
        { 列表: [], 按钮组件: Vue组件(按钮, {}, {}) },
        {
          on添加列表: (a, arg) =>
            Aff(async () => {
              return {
                列表: [...a.列表, arg],
                按钮组件: a.按钮组件,
              }
            }),
        },
      ),
    },
  ],
  [],
  'app',
)

var app = 运行(web)
run(app)
