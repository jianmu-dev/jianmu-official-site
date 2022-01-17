<script setup lang="ts">
import { quickStart, doc, example } from '@/utils/constants';
</script>
<template>
  <div class="description">
    <div class="left">
      <div class="top-card"></div>
      <div class="arrow">
        <img src="@/assets/web/pngs/arrow.png" alt="" />
      </div>
      <div class="operation-btns">
        <div class="item quick-start" @click="quickStart">
          <span>快速开始</span>
          <img src="~@/assets/web/svgs/quick-start.svg" />
        </div>
        <div class="item docs" @click="doc">
          <span>文档</span>
          <img src="~@/assets/web/svgs/docs.svg" />
        </div>
        <div class="item demo" @click="example">
          <span>示例</span>
          <img src="~@/assets/web/svgs/demo.svg" />
        </div>
      </div>
    </div>
    <div class="right"></div>
  </div>
</template>
<style lang="less" scoped>
.description {
  display: flex;
  height: 413px;
  margin: -30px 0px 70px 3%;
  justify-content: space-between;
  .left {
    margin-top: 80px;
    .top-card {
      width: 515px;
      height: 222px;
      background-image: url('@/assets/web/svgs/top-card.svg');
      background-repeat: no-repeat;
      background-position: top center;
    }
    .arrow {
      margin-top: 10px;
      width: 114px;
      height: 56px;
      img {
        width: 100%;
      }
    }
    .operation-btns {
      margin-top: 50px;
      display: flex;
      .item {
        color: #042749;
        cursor: pointer;
        user-select: none;
        box-sizing: border-box;
        width: 156px;
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
        box-shadow: 0px 6px 14px 0px #d1d1d1;
        border-radius: 4px;
        margin-right: 40px;
        span {
          font-size: 16px;
        }
        img {
          width: 24px;
          height: 24px;
        }
        &.quick-start {
          background-color: #042749;
          color: #ffffff;
        }
      }
    }
  }
  .right {
    flex-shrink: 0;
    margin-right: 100px;
    margin-top: 80px;
    width: 437px;
    height: 400px;
    background-image: url('@/assets/web/pngs/description.png');
    background-position: top center;
    background-size: contain;
    background-repeat: no-repeat;
  }
}
</style>
