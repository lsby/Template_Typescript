<template>
  <div>
    <input v-model="v" />
    <button @click="v == '' ? null : emit('添加列表', v), (v = '')">添加</button>
  </div>
  <div>
    <li v-for="item in prop.列表.value">{{ item }}</li>
  </div>
</template>

<script lang="ts" setup>
  import { Ref, ref } from 'vue'

  const prop = defineProps<{
    列表: Ref<string[]>
  }>()
  const emit = defineEmits<{
    (e: '添加列表', a: string): void
  }>()

  var v = ref('')
</script>
