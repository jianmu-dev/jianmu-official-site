<script setup lang="ts">
import NavTop from '@/views/web/nav/nav-top.vue';
import NavBottom from '@/views/web/nav/nav-bottom.vue';
</script>
<template>
  <div class="main">
    <nav-top/>
    <router-view class='main-view'/>
    <nav-bottom></nav-bottom>
  </div>
</template>
<style lang="less" scoped>
.main {
  position: relative;
  z-index: 0;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  .main-view{
    min-height: calc(100vh - 128px);
  }
}
</style>
