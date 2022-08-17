<template>
  <div>Hello {{ props.name }}!</div>
</template>

<script lang="ts" setup>
  const props = defineProps({
    name: String,
  })
</script>
