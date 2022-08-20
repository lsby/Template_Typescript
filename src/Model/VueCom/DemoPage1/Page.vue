<template>
  <div>Hello {{ runEffect(取响应值(name)) }}!</div>
  <button @click="emit('testEvent')">按钮</button>
</template>

<script lang="ts" setup>
  import { runEffect } from '@lsby/ts_pattern'
  import { Vue响应值, 取响应值 } from '../../../Package/Vue/Vue响应值'

  const prop = defineProps<{
    name: Vue响应值<string>
  }>()
  const emit = defineEmits<{
    (e: 'testEvent'): void
  }>()
</script>
