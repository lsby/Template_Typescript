<template>
  <div>
    <input v-model="v" />
    <my_button @click="v == '' ? null : emit('添加列表', v), (v = '')">添加</my_button>
  </div>
  <div>
    <li v-for="item in 列表.取值().运行()">{{ item }}</li>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { Vue响应值 } from '../../Package/Vue/Vue响应值'
  import { Vue组件 } from '../../Package/Vue/Vue组件'

  const prop = defineProps<{
    列表: Vue响应值<string[]>
    按钮组件: Vue组件
  }>()
  const emit = defineEmits<{
    (e: '添加列表', a: string): void
  }>()

  var v = ref('')

  var my_button = prop.按钮组件.取组件().运行()
</script>
