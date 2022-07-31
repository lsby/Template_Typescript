<template>
  <div>
    {{ s.msg }}
  </div>
  <div>
    <button @click="f()">按钮</button>
    <button @click="toLayerTest()">切换页面</button>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  var router = useRouter()
  var route = useRoute()

  var s = reactive({
    msg: 'hello, world!',
  })

  function f() {
    s.msg = 'hello, vue!'
  }

  function toLayerTest() {
    router.push({ path: '/LayerTest' })
  }
</script>
