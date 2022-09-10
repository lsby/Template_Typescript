<template>
  <div>这是主页</div>
  <button @click="页面跳转()">进入</button>
</template>

<script lang="ts" setup>
  import { useRouter, useRoute } from 'vue-router'
  import { inject } from 'vue'
  import { 接口调用者符号, 数据仓库符号 } from '../Types'

  var router = useRouter()
  var route = useRoute()

  var 数据仓库 = inject(数据仓库符号)
  var 接口调用者 = inject(接口调用者符号)

  if (!数据仓库) throw '无法获取数据仓库'
  if (!接口调用者) throw '无法获取接口调用者'

  var 数据 = 数据仓库
  var 接口调用 = 接口调用者

  function 页面跳转() {
    router.push('/page1')
  }
</script>
