<template>
  <div>
    <input v-model="v" />
    <my_button @click="添加列表()">添加</my_button>
  </div>
  <div>
    <li v-for="(item, i) in 列表.value" :key="item + i">{{ item }}</li>
  </div>
  <div>
    <button @click="Electron事件()">测试 Electron 事件</button>
  </div>
</template>

<script lang="ts" setup>
  import { Ref, ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { Vue组件, 转换为Vue元素 } from '../Package/Vue/Vue组件'

  var prop = defineProps<{
    列表: Ref<string[]>
    按钮组件: Ref<Vue组件<{}>>
  }>()
  var emit = defineEmits<{
    (e: '添加列表', a: string): Promise<void>
  }>()
  var router = useRouter()
  var route = useRoute()

  var v = ref('')
  var my_button = 转换为Vue元素(prop.按钮组件.value)

  async function 添加列表() {
    if (!v.value) return
    await emit('添加列表', v.value)
    v.value = ''
  }
  async function Electron事件() {
    var r = await window.ipcRenderer.invoke('测试事件', 'ping')
    console.log(r)
  }
</script>
