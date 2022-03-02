<script setup lang="ts">
import { hub, contribution, blog } from '@/utils/constants';
import { useRoute } from 'vue-router';
const route = useRoute();
</script>
<template>
  <div class="nav-top">
    <div class="nav-wrapper">
      <div class="logo-area">
        <div class="logo">
          <router-link :to="{name:'index'}">
            <img src="~@/assets/web/svgs/jianmu-logo.svg" />
            </router-link>
        </div>
        <div class="divider-line"></div>
        <h2 class="jianmu">建木</h2>
      </div>
      <div class="link-area">
        <a :href="hub" target="_blank" class="link-item">
          <span>建木Hub</span>
        </a>
        <a :href="blog" target="_blank" class="link-item">
          <span>博客</span>
        </a>
        <router-link :to="{name:'contributor'}" :class="['link-item',route.path==='/contributor'?'link-active':'']">
          <span>贡献者</span>
        </router-link>
        <a :href='contribution' target="_blank" class="link-item">
          <span>参与贡献</span>
        </a>
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
    height: 64px;
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
      display: flex;
      margin-right: 3%;
      .link-item{
        &.link-active{
          color: #096DD9;
        }
        margin-right: 37px;
        font-size: 16px;
        font-weight: 500;
        color: #042749;
        text-decoration: none;
        &:last-child{
          margin-right: 0px;
        }
        &:hover{
          color: #096DD9;
        }
      }
    }
  }
}
</style>
