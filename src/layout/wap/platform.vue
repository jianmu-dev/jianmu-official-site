<script setup lang="ts">
import OfficialFooter from '@/views/wap/official-footer.vue';
</script>

<template>
  <div class="platform">
    <div class="views">
      <router-view/>
    </div>
    <!-- 底部 -->
    <official-footer />
  </div>
</template>

<style scoped lang="less">
.platform {
  .views{
    min-height: calc(100vh - 88px);
  }
  width: 750px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  color: #042749;
}
</style>
