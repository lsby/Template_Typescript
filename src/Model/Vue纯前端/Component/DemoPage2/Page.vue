<template>
  <div>
    <button @click="返回()">返回</button>
  </div>
</template>

<script lang="ts" setup>
  import { useRouter, useRoute } from 'vue-router'

  var prop = defineProps<{}>()
  var emit = defineEmits<{}>()

  var router = useRouter()
  var route = useRoute()

  async function 返回() {
    router.go(-1)
  }
</script>
