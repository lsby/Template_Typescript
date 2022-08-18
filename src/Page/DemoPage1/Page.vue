<template>
  <div>Hello {{ props.name.value }}!</div>
  <button @click="emit('testEvent')">按钮</button>
</template>

<script lang="ts" setup>
  import { Ref } from 'vue'

  const props = defineProps<{
    name: Ref<string>
  }>()
  const emit = defineEmits<{
    (e: 'testEvent'): void
  }>()
</script>
