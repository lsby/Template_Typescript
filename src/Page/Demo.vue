<template>
  <div>
    {{ s.msg }}
  </div>
  <div>
    <button @click="e.f()">按钮</button>
  </div>
</template>

<script lang="ts">
  import { reactive } from 'vue'
  export default {
    setup() {
      var s = reactive({
        msg: 'hello, world!',
      })
      var e = {
        f() {
          s.msg = 'hello, vue!'
        },
      }
      return { s, e }
    },
  }
</script>
