<script setup lang="ts">
import { ref, onUpdated } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
// 菜单显隐
const menuVisible = ref<boolean>(false);
document.body.style.overflow = '';
// 打开菜单
const openMenu = () => {
  menuVisible.value = true;
  // 打开菜单溢出部分不滚动
  // document.body.style.overflow = 'hidden';
};
// 关闭菜单
const closeMenu = () => {
  menuVisible.value = false;
  // 关闭菜单后溢出滚动
  // document.body.style.overflow = '';
};
onUpdated(() => {
  document.body.style.overflow = menuVisible.value ? 'hidden' : '';
});
</script>

<template>
  <!-- logo -->
  <div
    class="official-logo-container border-bottom-common"
    v-show="!menuVisible"
  >
    <div class="official-logo">
      <router-link :to="{name:'index'}">
        <img src="@/assets/wap/svgs/logo.svg">
      </router-link>
      <span class="logo-text">建木</span>
    </div>
    <img
      class="menu"
      src="@/assets/wap/svgs/menu.svg"
      @click="openMenu"
    >
  </div>
  <!-- 激活状态顶部 -->
  <div
    v-show="menuVisible"
    class="menu-active"
  >
    <div class="official-logo">
      <router-link :to="{name:'index'}">
        <img src="@/assets/wap/svgs/logo.svg">
      </router-link>
      <span class="logo-text">建木</span>
    </div>
    <img
      class="menu"
      src="@/assets/wap/svgs/close.svg"
      @click="closeMenu"
    >
  </div>
  <!-- 菜单蒙层 -->
  <div
    class="menu-mantle"
    v-if="menuVisible"
    @touchmove.prevent
  >
    <!-- 链接容器 -->
    <div class="link-container">
      <a href="https://hub.jianmu.run/">建木Hub</a>
      <a href="https://blog.jianmu.dev/">博客</a>
<!--      <router-link :to="{name:'contributor'}" :class="[route.path==='/contributor'?'link-active':'']">-->
<!--        <span>贡献者</span>-->
<!--      </router-link>-->
      <a href="https://gitee.com/jianmu-dev/jianmu-ci-server">参与贡献</a>
    </div>
  </div>
</template>

<style scoped lang="less">
// logo
.official-logo-container,.menu-active {
  width: 100%;
  padding: 33px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .official-logo{
    display: flex;
    align-items: center;
    img {
      width: 201px;
      height: 54px;
    }
    .logo-text {
      font-size: 36px;
      font-weight: 800;
      display: inline-block;
      height: 40px;
      line-height: 40px;
      padding-left: 20px;
      margin-left: 20px;
      border-left: 1px solid #c2dfff;
    }
  }
  .menu{
    width:36px;
    height:36px;
  }
}
// 菜单激活状态顶部
.menu-active{
  background:#F0F7FF;
  border-bottom:1px solid rgba(0,0,0,0.05);
}
// 菜单蒙层
.menu-mantle{
  width:100%;
  height:calc(100vh - 120px);
  z-index: 101;
  background:#F6FAFF;
  opacity: .96;
  position:fixed;
  left:0px;
  top:122px;
  // 链接容器
  .link-container{
    .link-active{
      color: #096DD9;
    }
    padding:203px 0 0 60px;
    a{
      display: block;
      margin-bottom:50px;
      font-size:36px;
      color: #012C53;
      &:active,
      &:visited,
      &:link{
        text-decoration: none;
      }
    }
  }
}
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
// 公共样式-下边框
.border-bottom-common {
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
