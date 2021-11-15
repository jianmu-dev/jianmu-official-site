<script setup lang="ts">
import OfficialNode from './official-node.vue';
import OfficialFooter from './official-footer.vue';
import OfficialTop from './official-top.vue';
import OfficialProduct from './official-product.vue';
</script>

<template>
  <div class="official-container">
    <!-- 顶部 -->
    <official-top />
    <!-- 节点相关 -->
    <official-node />
    <!-- 产品相关 -->
    <officialProduct />
    <!-- 底部 -->
    <official-footer />
  </div>
</template>

<style scoped lang="less">
.official-container {
  width: 750px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  color: #042749;
}
</style>
