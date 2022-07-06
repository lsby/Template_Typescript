<template>
  <Demo></Demo>
</template>

<script lang="ts">
  import Demo from './Demo.vue'
  export default {
    components: {
      Demo,
    },
    setup() {
      var name = 'Vue'
      return { name }
    },
  }
</script>
