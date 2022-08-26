<template>
  <div>Hello {{ name.取值().运行() }}!</div>
  <button @click="emit('测试事件')">按钮</button>
</template>

<script lang="ts" setup>
  import { Effect } from '../../Package/Effect/Effect'
  import { Vue响应值 } from '../../Package/Vue/Vue响应值'

  const prop = defineProps<{
    name: Vue响应值<string>
  }>()
  const emit = defineEmits<{
    (e: '测试事件'): void
  }>()
</script>
