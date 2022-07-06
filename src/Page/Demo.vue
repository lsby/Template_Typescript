<template>
  {{ name }}
</template>

<script lang="ts">
  export default {
    setup() {
      var name = 'hello, world!'
      return { name }
    },
  }
</script>
