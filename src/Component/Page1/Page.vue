<template>
  <div>Hello {{ name }}!</div>
  <button @click="emit('测试事件')">按钮</button>
</template>

<script lang="ts" setup>
  import { Ref } from 'vue'

  const prop = defineProps<{
    name: Ref<string>
  }>()
  const emit = defineEmits<{
    (e: '测试事件'): void
  }>()
</script>
