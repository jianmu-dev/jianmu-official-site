<script setup lang="ts"></script>
<template>
  <div class="nav-bottom">
    <div class="copy-info">
      <div class="left">
        <div class="logo"></div>
        <span
          ><a href="https://portal.mulanos.cn/" target="_blank">
            木兰社区孵化项目
          </a></span
        >
      </div>
      <div class="center">
        <span
          ><a href="https://docs.jianmu.dev/" target="_blank">使用手册</a></span
        >
      </div>
      <div class="right">
        <span><a href="mailto:support@jianmu.dev"> 联系我们 </a></span>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.nav-bottom {
  border: 1px solid #e3eaf0;
  height: 64px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .copy-info {
    display: flex;
    align-items: center;
    height: 64px;
    font-size: 14px;
    font-weight: 400;
    color: #042749;
    a {
      color: #042749;
      text-decoration: none;
      &:hover {
        color:#096dd9;
        text-decoration: none;
      }
    }
    .left {
      display: flex;
      align-items: center;
      .logo {
        width: 24px;
        height: 24px;
        background-image: url('@/assets/web/pngs/community-logo.png');
        background-repeat: no-repeat;
        background-size: contain;
        margin-right: 6px;
      }
    }
    .center {
      margin: 0 20px;
      border-left: 1px solid #e3eaf0;
      border-right: 1px solid #e3eaf0;
      padding: 0 20px;
    }
  }
}
</style>
