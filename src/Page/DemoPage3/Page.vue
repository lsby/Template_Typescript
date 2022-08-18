<template>
  <div>
    <input v-model="v" />
    <my_button @click="emit('添加列表', v), (v = '')">添加</my_button>
  </div>
  <div>
    <li v-for="item in runEffect(取响应值(列表))">{{ item }}</li>
  </div>
</template>

<script lang="ts" setup>
  import { runEffect } from '@lsby/ts_struct/src/Type/Effect'
  import { ref } from 'vue'
  import { Vue响应值, 取响应值 } from '../../Model/Vue响应值'
  import { 取Vue组件 } from '../../Model/Vue组件'

  const prop = defineProps<{
    列表: Vue响应值<string[]>
    按钮组件: any
  }>()
  const emit = defineEmits<{
    (e: '添加列表', a: string): void
  }>()

  var v = ref('')

  var my_button = runEffect(取Vue组件(prop.按钮组件))
</script>
