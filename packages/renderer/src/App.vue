<script setup lang="ts">
  import { ipcRenderer } from 'electron'
  import path from 'path'
  console.log('vu1e', import.meta.env.VITE_SERVICE)
  console.log('icon', path.join(process.cwd()))
  ipcRenderer.on('mounted', (e: any, ...args) => {
    console.log('mounted', args)
  })
</script>

<template>
  <div class="logo-box"> 测试 </div>
</template>

<style></style>
