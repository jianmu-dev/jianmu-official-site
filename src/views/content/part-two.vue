<script setup lang="ts">
import { ref } from 'vue';
import { dsl, workFlow } from '@/utils/constants';
const tabIndex = ref<number>(0);
const tabClick = (index: number) => {
  tabIndex.value = index;
};
</script>
<template>
  <div class="part-two">
    <div class="part-two-left">
      <h1 class="title">配置即代码</h1>
      <div class="desc">
        提供声明式语法将流程代码化，通过代码库进行版本控制，快速实现幂等部署与故障恢复。
      </div>
    </div>
    <div class="part-two-right">
      <div class="tab-btns">
        <div
          :class="['item', tabIndex === 0 ? 'active' : '']"
          @click="tabClick(0)"
        >
          <img src="~@/assets/svgs/pip-bright.svg" v-if="tabIndex === 0" />
          <img src="~@/assets/svgs/pip-dark.svg" v-else />
          <span>管道</span>
        </div>
        <div
          :class="['item', tabIndex === 1 ? 'active' : '']"
          @click="tabClick(1)"
        >
          <img v-if="tabIndex === 1" src="~@/assets/svgs/workflow-bright.svg" />
          <img src="~@/assets/svgs/workflow-dark.svg" v-else />
          <span>流程</span>
        </div>
      </div>
      <div class="tab-content">
        <jm-dsl-editor
          :value="dsl"
          readonly
          v-if="tabIndex === 0"
        ></jm-dsl-editor>
        <jm-dsl-editor :value="workFlow" readonly v-else></jm-dsl-editor>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.part-two {
  height: 765px;
  margin-top: -40px;
  background-image: url('@/assets/svgs/pr-2-bg.svg');
  background-repeat: no-repeat;
  background-size: 110% 110%;
  background-position: top center;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  .part-two-left {
    color: #042749;
    margin-top: 135px;
    margin-right: 50px;
    width: 326px;
    .title {
      font-size: 32px;
    }
    .desc {
      margin-top: 30px;
      width: 326px;
      font-size: 16px;
      line-height: 30px;
    }
  }
  .part-two-right {
    flex-grow: 1;
    margin-top: 86px;
    display: flex;
    flex-direction: column;
    position: relative;
    .tab-btns {
      position: absolute;
      align-self: flex-end;
      display: flex;
      .item {
        display: flex;
        border: 1px solid #eff4f9;
        justify-content: center;
        align-items: center;
        padding: 5px;
        width: 136px;
        height: 40px;
        cursor: pointer;
        user-select: none;
        background-color: #fff;
        color: #042749;
        img {
          width: 24px;
          height: 24px;
        }
        span {
          margin-left: 10px;
        }
        &.active {
          background-color: #19253b;
          border: 1px solid transparent;
          color: #ffffff;
        }
        &:nth-child(2) {
          margin-left: 10px;
        }
      }
    }
    .tab-content {
      background-color: #1a253b;
      padding: 30px 0;
      margin-top: 52px;
      height: 550px;
      width: 100%;
      box-shadow: 0px 0px 40px 0px #768094;
      ::v-deep(.jm-dsl-editor) {
        .CodeMirror {
          &.cm-s-ayu-mirage {
            &.CodeMirror-wrap {
              // padding: 24px 0;
              .CodeMirror-scroll {
                .CodeMirror-sizer {
                  .CodeMirror-lines {
                    > div {
                      padding: 0 5px;
                    }
                    .CodeMirror-code {
                      border-left: 1px solid #293f67;
                    }
                  }
                }
                .CodeMirror-gutters {
                  .CodeMirror-gutter {
                    text-align: center;
                    &.CodeMirror-linenumbers {
                      padding-right: 14px;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
