<template>
  <div>
    <button @click="Electron测试()">Electron测试</button>
  </div>
</template>

<script lang="ts" setup>
  var emit = defineEmits<{
    (e: 'electron测试'): Promise<void>
  }>()

  async function Electron测试() {
    await emit('electron测试')
  }
</script>
