<template>
  <div>Hello {{ runEffect(取值(name)) }}!</div>
  <button @click="emit('testEvent')">按钮</button>
</template>

<script lang="ts" setup>
  import { runEffect } from '@lsby/ts_struct/src/Type/Effect'
  import { Vue响应值, 取值 } from '../../Model/Vue响应值'

  const prop = defineProps<{
    name: Vue响应值<string>
  }>()
  const emit = defineEmits<{
    (e: 'testEvent'): void
  }>()
</script>
