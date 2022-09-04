<template>
  <div>
    <input v-model="v" />
    <my_button @click="添加列表()">添加</my_button>
    <button @click="Electron测试()">Electron测试</button>
  </div>
  <div>
    <li v-for="item in 列表.value">{{ item }}</li>
  </div>
</template>

<script lang="ts" setup>
  import { Ref, ref } from 'vue'
  import { Vue组件 } from '../../Package/Vue/Vue组件'

  var prop = defineProps<{
    列表: Ref<string[]>
    按钮组件: Ref<Vue组件>
  }>()
  var emit = defineEmits<{
    (e: '添加列表', a: string): Promise<void>
    (e: 'electron测试'): Promise<void>
  }>()

  var v = ref('')
  var my_button = prop.按钮组件.value.取组件().运行()

  async function 添加列表() {
    if (!v.value) return
    await emit('添加列表', v.value)
    v.value = ''
  }
  async function Electron测试() {
    await emit('electron测试')
  }
</script>
