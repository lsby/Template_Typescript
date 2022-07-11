<template>
  <div>
    {{ s.msg }}
  </div>
  <div>
    <button @click="f()">按钮</button>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue'

  var s = reactive({
    msg: 'hello, world!',
  })

  function f() {
    s.msg = 'hello, vue!'
  }
</script>
