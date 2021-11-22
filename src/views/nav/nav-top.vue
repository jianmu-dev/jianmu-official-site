<script setup lang="ts">
import { hub, contribution } from '@/utils/constants';
</script>
<template>
  <div class="nav-top">
    <div class="nav-wrapper">
      <div class="logo-area">
        <div class="logo">
          <a href="/">
            <img src="~@/assets/svgs/jianmu-logo.svg" />
          </a>
        </div>
        <div class="divider-line"></div>
        <h2 class="jianmu">建木</h2>
      </div>
      <div class="link-area">
        <div class="node-library-link item" @click="hub">
          <span>节点库</span>
          <img src="~@/assets/svgs/node-library-link-icon.svg" />
        </div>
        <div class="attribution-link item" @click="contribution">
          <span>参与贡献</span>
          <img src="~@/assets/svgs/attribution-link-icon.svg" />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.nav-top {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 2px 10px 0px #eff0f3;
  .nav-wrapper {
    max-width: 1600px;
    height: 70px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo-area {
      margin-left: 3%;
      display: flex;
      align-items: center;

      .logo {
        width: 122px;
        img {
          width: 100%;
        }
      }
      .divider-line {
        margin: 0 15px;
        width: 1px;
        height: 20px;
        background: #c2dfff;
        border-radius: 1px;
      }
      .jianmu {
        font-weight: 800;
        color: #042749;
        letter-spacing: 1px;
        font-size: 24px;
      }
    }
    .link-area {
      margin-right: 3%;
      display: flex;
      .item {
        cursor: pointer;
        user-select: none;
        &.node-library-link {
          background-color: #042749;
          margin-right: 40px;
        }
        &.attribution-link {
          background-color: #fff;
          color: #042749;
        }
        border-radius: 4px;
        box-shadow: 0px 4px 10px 0px #dadada;
        width: 140px;
        height: 44px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        color: #ffffff;
        padding: 10px 15px;
        span {
          font-size: 16px;
        }
        img {
          width: 24px;
          height: 24px;
        }
      }
    }
  }
}
</style>
