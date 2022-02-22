<script setup lang="ts"></script>

<template>
  <!-- 底部 -->
  <div class="official-footer">
    <img
      src="@/assets/wap/pngs/mulan.png"
      class="mulan-icon"
    >
    <div class="links">
      <a
        class="link"
        href="https://portal.mulanos.cn"
      >木兰社区孵化项目</a>
      <i class="line" />
      <a
        class="link"
        href="https://docs.jianmu.dev"
      >使用手册</a>
      <i class="line" />
      <a
        class="link"
        href="mailto:support@jianmu.dev"
      >联系我们</a>
    </div>
  </div>
</template>

<style scoped lang="less">
// 底部
.official-footer {
  width: 100%;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #e3eaf0;
  .mulan-icon {
    width: 44px;
    height: 44px;
  }
  .links {
    display: flex;
    align-items: center;
    color: #385775;
    font-size: 20px;
    .line {
      display: inline-block;
      width: 1px;
      height: 14px;
      background: #e3eaf0;
    }
    .link {
      display: inline-block;
      padding: 0 20px;
      &:active{
        color: #096dd9;
      }
    }
    .link:first-child {
      padding-left: 10px;
    }
  }
}
</style>
