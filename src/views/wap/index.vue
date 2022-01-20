<script setup lang="ts">
import OfficialNode from './official-node.vue';
import OfficialTop from './official-top.vue';
import OfficialProduct from './official-product.vue';
</script>

<template>
  <div class="home">
    <!-- 顶部 -->
    <official-top />
    <!-- 建木介绍 -->
    <div class="official-description-container border-bottom-common">
      <div class="jianmu-description-img" />
    </div>
    <!-- 节点相关 -->
    <official-node />
    <!-- 产品相关 -->
    <officialProduct />
  </div>
</template>

<style scoped lang="less">
.home{
  // 建木描述
  .official-description-container {
    width: 100%;
    height: 322px;
    padding: 60px 30px 55px 30px;
    background-image: url('@/assets/wap/pngs/jianmu-tree.png');
    background-size: 100%;
    position: relative;
    z-index: 100;
    .jianmu-description-img {
      width: 690px;
      height: 207px;
      background: url('@/assets/wap/pngs/jianmu-description.png');
      background-size: 100%;
    }
  }
}
</style>
