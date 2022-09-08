<template>
  <button @click="e1">ajax事件</button>
  <button @click="e2">socketIO事件1</button>
  <button @click="e3">socketIO事件2</button>
</template>

<script lang="ts" setup>
  import axios from 'axios'
  import socketIO from 'socket.io-client'

  async function e1() {
    var r = await axios.post('/api/测试接口_ED模式', { a: 1, b: 2 })
    console.log(r.data)
  }

  var socket = socketIO()
  socket.on('socket测试2_back', (d: any) => console.log(d))

  async function e2() {
    socket.emit('socket测试1', 'ping', (data: any) => {
      console.log(data)
    })
  }
  async function e3() {
    socket.emit('socket测试2', 'ping')
  }
</script>
