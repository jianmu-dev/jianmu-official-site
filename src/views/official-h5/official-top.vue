<script setup lang="ts"></script>

<template>
  <!-- logo -->
  <div class="official-logo-container border-bottom-common">
    <img src="@/assets/official-h5/svgs/logo.svg">
    <span class="logo-text">建木</span>
  </div>
  <!-- 建木介绍 -->
  <div class="official-description-container border-bottom-common">
    <div class="jianmu-description-img" />
  </div>
</template>

<style scoped lang="less">
// logo
.official-logo-container {
  width: 100%;
  padding: 33px 30px;
  display: flex;
  align-items: center;
  img {
    width: 201px;
    height: 54px;
  }
  .logo-text {
    font-size: 36px;
    color: #012c53;
    font-weight: 800;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    margin-left: 20px;
    border-left: 1px solid #c2dfff;
  }
}
// 建木描述
.official-description-container {
  width: 100%;
  height: 322px;
  padding: 60px 30px 55px 30px;
  background-image: url('@/assets/official-h5/pngs/jianmu-tree.png');
  background-size: 100%;
  position: relative;
  z-index: 100;
  .jianmu-description-img {
    width: 690px;
    height: 207px;
    background: url('@/assets/official-h5/pngs/jianmu-description.png');
    background-size: 100%;
  }
}
// 公共样式-下边框
.border-bottom-common {
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
