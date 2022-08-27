<template>
  <div>
    <input v-model="v" />
    <button @click="v == '' ? null : emit('添加列表', v), (v = '')">添加</button>
  </div>
  <div>
    <li v-for="item in 列表.取值().运行()">{{ item }}</li>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { Vue响应值 } from '../../Package/Vue/Vue响应值'

  const prop = defineProps<{
    列表: Vue响应值<string[]>
  }>()
  const emit = defineEmits<{
    (e: '添加列表', a: string): void
  }>()

  var v = ref('')
</script>
