<template>
  <div>
    <input v-model="v" />
    <button @click="v == '' ? null : emit('添加列表', v), (v = '')">添加</button>
  </div>
  <div>
    <li v-for="item in runEffect(取响应值(列表))">{{ item }}</li>
  </div>
</template>

<script lang="ts" setup>
  import { runEffect } from '@lsby/ts_pattern'
  import { ref } from 'vue'
  import { Vue响应值, 取响应值 } from '../../Package/Vue/Vue引用值'

  const prop = defineProps<{
    列表: Vue响应值<string[]>
  }>()
  const emit = defineEmits<{
    (e: '添加列表', a: string): void
  }>()

  var v = ref('')
</script>
