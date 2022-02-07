<script setup lang="ts">
import NavTop from '@/views/web/nav/nav-top.vue';
import NavBottom from '@/views/web/nav/nav-bottom.vue';
import { onBeforeRouteUpdate } from 'vue-router';
import { ref } from 'vue';
import sleep from '@/utils/sleep';
const refresh = ref<boolean>(true);
onBeforeRouteUpdate(async (to, from, next) => {
  // 带有不刷新元信息，或者在同一界面中不做刷新
  if (to.meta.noRefresh || to.path === from.path) {
    next();
    return;
  }
  refresh.value = false;
  await sleep(0);
  refresh.value = true;
  next();
});
</script>
<template>
  <div class="platform">
    <nav-top/>
    <router-view class='main-view' v-if="refresh">
    </router-view>
    <nav-bottom></nav-bottom>
  </div>
</template>
<style lang="less" scoped>
.platform {
  position: relative;
  z-index: 0;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  .main-view {
    min-height: calc(100vh - 128px);
  }
}
</style>
