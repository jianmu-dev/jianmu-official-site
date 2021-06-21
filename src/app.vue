<template>
  <div class="app">
    <div class="top">
      <div class="left">
        <div class="logo"/>
        <div class="separator"/>
        <div class="title">持续集成平台</div>
      </div>
      <div class="right">
        <button class="primary">
          <span>参与贡献</span>
          <i class="contribution"/>
        </button>
      </div>
    </div>
    <div class="part-1">
      <div class="left">
        <div class="content">
          <div class="title">持续集成平台</div>
          <div class="subtitle">
            <div>持续集成平台是国产化的开源持续集成平台，</div>
            <div>致力于为国内开发者提供更好的CI/CD使用体验</div>
          </div>
          <div class="operation">
            <button class="large primary">
              <span>快速开始</span>
              <i class="quick-start"/>
            </button>
            <button class="large">
              <span>文档</span>
              <i class="doc"/>
            </button>
            <button class="large">
              <span>示例</span>
              <i class="example"/>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="part-2"></div>
    <div class="part-3"></div>
    <div class="part-4"></div>
    <div class="part-5"></div>
    <div class="part-6"></div>
    <div class="bottom">
      &copy;2012-2020 版权所有 九州云信息科技有限公司 浙ICP备 12032350号-3
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style scoped lang="less">
.app {
  button {
    width: 140px;
    padding: 0 14px 0 22px;
    height: 44px;
    box-shadow: 0 6px 14px 0 #ACC3EE;
    border-radius: 4px;
    background-color: #FFFFFF;
    color: #7B8C9C;
    border-width: 0;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;

    &.large {
      width: 192px;
      height: 56px;
      font-size: 20px
    }

    &.primary {
      background-color: #096DD9;
      color: #FFFFFF;
    }

    i {
      width: 24px;
      height: 24px;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center center;

      &.contribution {
        background-image: url('@/assets/svgs/contribution.svg');
      }

      &.doc {
        background-image: url('@/assets/svgs/doc.svg');
      }

      &.example {
        background-image: url('@/assets/svgs/example.svg');
      }

      &.quick-start {
        background-image: url('@/assets/svgs/quick-start.svg');
      }
    }

    &:active {
      opacity: 80%;
    }
  }

  .top {
    margin: 0 auto;
    max-width: 1600px;
    padding: 0 20px;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      display: flex;
      align-items: center;

      .logo {
        width: 118px;
        height: 30px;
        background-image: url('@/assets/svgs/logo.svg');
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center center;
      }

      .separator {
        margin: 0 18px;
        width: 1px;
        height: 20px;
        background-color: #C2DFFF;
        border-radius: 1px;
        overflow: hidden;
      }

      .title {
        font-size: 24px;
        font-weight: bold;
        color: #042749;
        letter-spacing: 1px;
      }
    }

    .right {

    }
  }

  [class^='part-'] {
    background-repeat: no-repeat;
    background-position: center center;
  }

  .part-1 {
    height: 678px;
    background-image: url('@/assets/images/part-1.png');

    display: flex;

    .left {
      width: 50%;
      height: 100%;

      .content {
        margin-left: auto;
        max-width: 800px;
        height: 100%;

        padding-left: 20px;
        padding-top: 130px;

        .title {
          font-size: 58px;
          font-weight: bold;
          color: #042749;
          letter-spacing: 3px;
        }

        .subtitle {
          margin-top: 33px;
          font-size: 20px;
          color: #042749;
          line-height: 34px;
        }

        .operation {
          margin-top: 99px;

          button + button {
            margin-left: 40px;
          }
        }
      }
    }
  }

  .part-2 {
    height: 833px;
    background-image: url('@/assets/images/part-2.png');
  }

  .part-3 {
    height: 775px;
    background-image: url('@/assets/images/part-3.png');
  }

  .part-4 {
    height: 808px;
    background-image: url('@/assets/images/part-4.png');
  }

  .part-5 {
    height: 895px;
    background-image: url('@/assets/images/part-5.png');
  }

  .part-6 {
    height: 834px;
    background-image: url('@/assets/images/part-6.png');
  }

  .bottom {
    text-align: center;
    height: 80px;
    line-height: 80px;
    background-color: #096DD9;
    font-size: 16px;
    color: #FFFFFF;
  }
}
</style>
