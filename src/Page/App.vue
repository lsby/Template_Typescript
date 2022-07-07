<template>
  <div>
    <Demo></Demo>
  </div>
  <div>
    <LayerTest></LayerTest>
  </div>
</template>

<script lang="ts">
  import Demo from './Demo.vue'
  import LayerTest from './LayerTest.vue'

  export default {
    components: {
      Demo,
      LayerTest,
    },
    setup() {},
  }
</script>
