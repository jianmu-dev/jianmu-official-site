<script setup lang="ts"></script>
<template>
  <div class="bottom-block">
    <div class="copy-info">
      ©2020-{{ new Date().getFullYear() }} 版权所有 九州云信息科技有限公司
      <span>邮箱：</span
      ><span><a href="mailto:support@jianmu.dev">support@jianmu.dev</a></span>
    </div>
  </div>
</template>
<style lang="less" scoped>
.bottom-block {
  border: 1px solid #e3eaf0;
  height: 64px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .copy-info {
    width: 577px;
    font-size: 16px;
    font-weight: 400;
    color: #042749;
    span:nth-child(1) {
      margin-left: 25px;
    }
    a {
      text-decoration: none;
      color: #042749;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
