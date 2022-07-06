<template>
  <div>{{ name }}</div>
  <iframe src="test.html"></iframe>
</template>

<script lang="ts">
  export default {
    setup() {
      var name = 'hello, world!'
      return { name }
    },
  }
</script>
