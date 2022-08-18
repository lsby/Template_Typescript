<template>
  <div>
    <input v-model="v" />
    <button @click="emit('添加列表', v), (v = '')">添加</button>
  </div>
  <div>
    <li v-for="item in runEffect(取值(列表))">{{ item }}</li>
  </div>
</template>

<script lang="ts" setup>
  import { runEffect } from '@lsby/ts_struct/src/Type/Effect'
  import { ref } from 'vue'
  import { Vue响应值, 取值 } from '../../Model/Vue响应值'

  var v = ref('')

  const props = defineProps<{
    列表: Vue响应值<string[]>
  }>()
  const emit = defineEmits<{
    (e: '添加列表', a: string): void
  }>()
</script>
