<template>
  <div>Hello {{ 取响应值(props.name) }}!</div>
  <button @click="emit('testEvent')">按钮</button>
</template>

<script lang="ts" setup>
  import { Vue响应值, 取响应值 } from '../../Model/Vue响应值'

  const props = defineProps<{
    name: Vue响应值<string>
  }>()
  const emit = defineEmits<{
    (e: 'testEvent'): void
  }>()
</script>
