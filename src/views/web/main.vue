<script setup lang="ts">
import NavTop from '@/views/web/nav/nav-top.vue';
</script>
<template>
  <div class="main">
    <nav-top/>
    <router-view/>
  </div>
</template>
<style lang="less" scoped>
.main {
  position: relative;
  z-index: 0;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
