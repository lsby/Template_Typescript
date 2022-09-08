<template>
  <div>{{ 数据.这是数据 }}</div>
  <button @click="接口调用('/api/测试接口1', {})">按钮</button>
  <button @click="测试事件()">接口测试</button>
</template>

<script lang="ts" setup>
  import { inject } from 'vue'
  import { 接口调用者符号, 数据仓库符号 } from '../Types'

  var 数据仓库 = inject(数据仓库符号)
  var 接口调用者 = inject(接口调用者符号)

  if (!数据仓库) throw '无法获取数据仓库'
  if (!接口调用者) throw '无法获取接口调用者'

  var 数据 = 数据仓库
  var 接口调用 = 接口调用者

  async function 测试事件() {
    var r = await 接口调用('/api/测试接口3', { a: 1, b: 2 })
    console.log(r)
  }
</script>
