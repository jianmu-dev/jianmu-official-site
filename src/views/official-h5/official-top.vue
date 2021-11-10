<script setup lang="ts"></script>

<template>
  <!-- logo -->
  <div class="official-logo-container border-bottom-common">
    <img src="@/assets/official-h5/svgs/logo.svg">
    <span class="logo-text">建木</span>
  </div>
  <!-- 建木介绍 -->
  <div class="official-description-container border-bottom-common">
    <img src="@/assets/official-h5/pngs/jianmu-description.png">
  </div>
</template>

<style scoped lang="less">
// logo
.official-logo-container {
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
  padding: 60px 30px 55px 30px;
  img {
    display: inline-block;
  }
}
// 公共样式-下边框
.border-bottom-common {
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
