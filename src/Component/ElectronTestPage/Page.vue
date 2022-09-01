<template>
  <button @click="emit('测试事件')">按钮</button>
</template>

<script lang="ts" setup>
  const emit = defineEmits<{
    (e: '测试事件'): void
  }>()
</script>
