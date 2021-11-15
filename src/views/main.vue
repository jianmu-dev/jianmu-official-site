<script setup lang="ts">
import { ref, onMounted, getCurrentInstance, onBeforeUnmount } from 'vue';
import { nodeSearch } from '@/api/node-search';
import { INodeDefinitionVo } from '@/api/dto/node-search';
import { IPageVo } from '@/api/dto/common';
import { START_PAGE_NUM } from '@/utils/rest/constants';
import {
  dsl,
  workFlow,
  hub,
  contribution,
  quickStart,
  doc,
  example,
} from '@/utils/constants';
const nodeSearchDate = ref<IPageVo<INodeDefinitionVo>>();
const height = ref<number>(10);
const offsetHeight = ref<number>(0);
const { proxy } = getCurrentInstance() as any;
const scrollContainerRef = ref<HTMLElement>();
// main 元素
const mainRef = ref<HTMLElement>();
// 卷轴最外层元素
const scrollRef = ref<HTMLElement>();
// 第一根卷轴
const scrollBarRef = ref<HTMLElement>();
// 第二根卷轴
const scrollBarBottomRef = ref<HTMLElement>();
const scrollTop = ref<number>(0);
const scrollInterval = ref<any>();
const preHeight = ref<number>(0);
const animateScroll = (height: number) => {
  if (scrollInterval.value) {
    clearInterval(scrollInterval.value);
    scrollInterval.value = undefined;
  }
  if (preHeight.value === 0) {
    preHeight.value = height;
  }

  if (height < preHeight.value) {
    if (preHeight.value - height > 50) {
      // 60为动画开始时的高度，大于50即可完全隐藏卷轴
      preHeight.value = height + 50;
    }
  } else if (height - preHeight.value > document.documentElement.clientHeight) {
    preHeight.value = height - document.documentElement.clientHeight;
  }

  let h: number = preHeight.value;
  scrollInterval.value = setInterval(() => {
    if (h === height) {
      clearInterval(scrollInterval.value);
      scrollInterval.value = undefined;
      return;
    }

    if (height >= preHeight.value) {
      h += 5;
      if (h > height) {
        h = height;
      }
    } else {
      h -= 1;
      if (h < height) {
        h = height;
      }
    }

    preHeight.value = h;
    scrollContainerRef.value!.style.height = h + 'px';
  }, 1);
};
// 处理卷轴上下滚动时动态调整显示内容高度
const scrollHeightHandler = () => {
  // const _this = scrollContainerRef.value;
  let h = 0;
  // 如果当前滚动高度小于上一次的滚动高度，向上滚动
  if ((mainRef.value?.scrollTop as number) < scrollTop.value) {
    if (
      mainRef.value!.clientHeight <= 693
        ? mainRef.value!.scrollTop >
          4749 - height.value + (693 - mainRef.value!.clientHeight) + 60
        : mainRef.value!.scrollTop > 4749 - height.value
    ) {
      h = 4808;
    } else {
      // 将main元素的滚动高度，复制一份
      scrollTop.value = mainRef.value?.scrollTop as number;
      // 高度小于693
      if (mainRef.value!.clientHeight <= 693) {
        h =
          height.value + scrollTop.value - (693 - mainRef.value!.clientHeight);
        offsetHeight.value = height.value + scrollTop.value;
      } else {
        h = height.value + scrollTop.value;
        offsetHeight.value = height.value + scrollTop.value;
      }
    }
  } else {
    // 将main元素的滚动高度，复制一份
    scrollTop.value = mainRef.value?.scrollTop as number;
    // 向下滚动
    if (
      mainRef.value!.clientHeight <= 693
        ? mainRef.value!.scrollTop >
          4749 - height.value + (693 - mainRef.value!.clientHeight)
        : mainRef.value!.scrollTop > 4749 - height.value
    ) {
      h = 4808;
    } else {
      // 卷轴的高度=初始高度+main的滚动偏移值
      if (mainRef.value!.clientHeight <= 693) {
        h =
          height.value + scrollTop.value - (693 - mainRef.value!.clientHeight);
        offsetHeight.value = height.value + scrollTop.value;
      } else {
        h = height.value + scrollTop.value;
        offsetHeight.value = height.value + scrollTop.value;
      }
    }
  }
  if (h < height.value) {
    h = height.value;
  }
  // _this!.style.height = h + 'px';
  animateScroll(h);
};
const initScroll = (): void => {
  // 解决浏览器窗口缩放后，页面出现空白的问题
  mainRef.value?.scrollTo(0, 0);
  // 卷轴的初始高度
  height.value =
    document.documentElement.clientHeight -
    (scrollBarRef.value!.offsetTop - document.documentElement.scrollTop) -
    (scrollBarRef.value!.clientHeight * 2 + height.value);
  if (height.value < 10) {
    // 屏幕展示的区域小的时候，将卷轴饿高度设置为10，让其折叠
    height.value = 10;
  }
  scrollContainerRef.value!.style.height = `${height.value}px`;
};
onMounted(() => {
  mainRef.value?.addEventListener('scroll', scrollHeightHandler);
  // 监听window的缩放，重新调整卷轴的默认高度
  window.addEventListener('resize', initScroll);
  // 初始卷轴的默认初始显示高度
  initScroll();
});
onMounted(async () => {
  try {
    nodeSearchDate.value = await nodeSearch({
      pageNum: START_PAGE_NUM,
      pageSize: 21,
    });
  } catch (err) {
    proxy.$thow(err, proxy);
  }
});
onBeforeUnmount(() => {
  // 取消监听事件
  window.removeEventListener('resize', initScroll);
  mainRef.value?.removeEventListener('scroll', scrollHeightHandler);
});
const tabIndex = ref<number>(0);
const tabClick = (index: number) => {
  tabIndex.value = index;
};
</script>
<template>
  <div class="main" ref="mainRef">
    <div class="container">
      <div class="header">
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
            <img src="~@/assets/svgs/\node-library-link-icon.svg" />
          </div>
          <div class="attribution-link item" @click="contribution">
            <span>参与贡献</span>
            <img src="~@/assets/svgs/attribution-link-icon.svg" />
          </div>
        </div>
      </div>
      <div class="content-bg">
        <div class="content-wrapper">
          <div class="description">
            <div class="left">
              <div class="top-card">
                <!-- <img src="~@/assets/pngs/top-card.png" /> -->
              </div>
              <div class="operation-btns">
                <div class="item quick-start" @click="quickStart">
                  <span>快速开始</span>
                  <img src="~@/assets/svgs/quick-start.svg" />
                </div>
                <div class="item docs" @click="doc">
                  <span>文档</span>
                  <img src="~@/assets/svgs/docs.svg" />
                </div>
                <div class="item demo" @click="example">
                  <span>示例</span>
                  <img src="~@/assets/svgs/demo.svg" />
                </div>
              </div>
            </div>
            <div class="right"></div>
          </div>
          <div class="scroll" ref="scrollRef">
            <div class="scroll-bar" ref="scrollBarRef">
              <img src="~@/assets/pngs/bar-top.png" />
            </div>
            <div class="scroll-container" ref="scrollContainerRef">
              <div class="scroll-wrapper">
                <div class="scroll-content" ref="scrollContentRef">
                  <div class="pr-1">
                    <h1 class="pr-1-title">建木持续集成平台</h1>
                    <span class="pr-1-desc"
                      >建木持续集成平台基于建木，致力于为国内开发者与DevOps人员提供极致用户体验，提升开发、上线、运维的效率，让软件用户专注于提供业务价值。</span
                    >
                    <div class="the-transition">
                      <img src="~@/assets/pngs/the-transition.png" />
                    </div>
                  </div>
                  <div class="pr-2">
                    <div class="pr-2-left">
                      <h1 class="title">配置即代码</h1>
                      <div class="desc">
                        提供声明式语法将流程代码化，通过代码库进行版本控制，快速实现幂等部署与故障恢复。
                      </div>
                    </div>
                    <div class="pr-2-right">
                      <div class="tab-btns">
                        <div
                          :class="['item', tabIndex === 0 ? 'active' : '']"
                          @click="tabClick(0)"
                        >
                          <img
                            src="~@/assets/svgs/pip-bright.svg"
                            v-if="tabIndex === 0"
                          />
                          <img src="~@/assets/svgs/pip-dark.svg" v-else />
                          <span>管道</span>
                        </div>
                        <div
                          :class="['item', tabIndex === 1 ? 'active' : '']"
                          @click="tabClick(1)"
                        >
                          <img
                            v-if="tabIndex === 1"
                            src="~@/assets/svgs/workflow-bright.svg"
                          />
                          <img src="~@/assets/svgs/workflow-dark.svg" v-else />
                          <span>流程</span>
                        </div>
                      </div>
                      <div class="pip-content tab-content">
                        <jm-dsl-editor
                          :value="dsl"
                          readonly
                          v-if="tabIndex === 0"
                        ></jm-dsl-editor>
                        <jm-dsl-editor
                          :value="workFlow"
                          readonly
                          v-else
                        ></jm-dsl-editor>
                      </div>
                    </div>
                  </div>
                  <div class="pr-3">
                    <h1 class="title">流程可视化</h1>
                    <span class="desc"
                      >流程配置可视化，任务编排与执行状态一目了然。</span
                    >
                    <el-carousel
                      indicator-position="outside"
                      arrow="never"
                      pause-on-hover
                      height="600px"
                    >
                      <el-carousel-item>
                        <img src="~@/assets/pngs/1.png" />
                      </el-carousel-item>
                      <el-carousel-item>
                        <img src="~@/assets/pngs/2.png" />
                      </el-carousel-item>
                      <el-carousel-item>
                        <img src="~@/assets/pngs/3.png" />
                      </el-carousel-item>
                      <el-carousel-item>
                        <img src="~@/assets/pngs/4.png" />
                      </el-carousel-item>
                    </el-carousel>
                    <div class="shadow"></div>
                  </div>
                  <div class="pr-4">
                    <h1 class="title">节点生态</h1>
                    <span class="desc"
                      >使用官方与社区提供的节点自由组合，灵活满足各类需求。
                    </span>
                    <span>贡献节点，分享自己的成果。</span>
                    <div class="icon-wrapper">
                      <div
                        class="icon-item"
                        v-for="item in nodeSearchDate?.content"
                        :key="item.id"
                      >
                        <div class="icon">
                          <a
                            :href="`https://hub.jianmu.dev/${item.ownerRef}/${item.ref}`"
                          >
                            <img
                              :src="`${item.icon}?imageView2/2/w/82/h/82/interlace/1/q/100`"
                            />
                          </a>
                        </div>
                        <span class="icon-desc"
                          ><a
                            :href="`https://hub.jianmu.dev/${item.ownerRef}/${item.ref}`"
                          >
                            {{ item.name }}
                          </a></span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="pr-5">
                    <h1 class="title">平台中立</h1>
                    <span class="desc"
                      >无平台倾向性，用户可根据需要自行选择。
                    </span>
                    <div class="platform">
                      <div class="platform-item">
                        <div class="icon">
                          <img src="~@/assets/svgs/github.svg" />
                        </div>
                        <h1 class="name">Github</h1>
                      </div>
                      <div class="platform-item">
                        <div class="icon">
                          <img src="~@/assets/svgs/gitlab.svg" />
                        </div>
                        <h1 class="name">Gitlab</h1>
                      </div>
                      <div class="platform-item">
                        <div class="icon">
                          <img src="~@/assets/svgs/gitee.svg" />
                        </div>
                        <h1 class="name">Gitee</h1>
                      </div>
                      <div class="platform-item">
                        <div class="icon">
                          <img src="~@/assets/svgs/gitea.svg" />
                        </div>
                        <h1 class="name">Gitea</h1>
                      </div>
                      <div class="platform-item">
                        <div class="icon">
                          <img src="~@/assets/svgs/bitbucket.svg" />
                        </div>
                        <h1 class="name">Bitbucket</h1>
                      </div>
                      <div class="platform-item">
                        <div class="icon">
                          <img src="~@/assets/pngs/coding.png" />
                        </div>
                        <h1 class="name">Coding</h1>
                      </div>
                    </div>
                  </div>
                  <div class="pr-6">
                    <h1 class="title">产品特性</h1>
                    <div class="pr-6-content">
                      <div class="feat-item">
                        <div class="desc-img">
                          <img src="~@/assets/svgs/pr-6-1-icon.svg" />
                        </div>
                        <div class="desc-content">
                          <h3 class="heading">配置即代码</h3>
                          <span class="desc">
                            支持GitOps使用模型，可实现更快的部署和恢复并提高应用系统可靠性。
                          </span>
                        </div>
                      </div>
                      <div class="feat-item">
                        <div class="desc-img">
                          <img src="~@/assets/svgs/pr-6-2-icon.svg" />
                        </div>
                        <div class="desc-content">
                          <h3 class="heading">环境隔离性</h3>
                          <span class="desc">
                            无需担心环境的不一致性，每个环境都在隔离的容器内运行，运行后自动销毁回收。
                          </span>
                        </div>
                      </div>
                      <div class="feat-item">
                        <div class="desc-img">
                          <img src="~@/assets/pngs/pr-6-3-icon.png" />
                        </div>
                        <div class="desc-content">
                          <h3 class="heading">流程可视化</h3>
                          <span class="desc">
                            可清晰地看到流程的运转细节，让团队了解CI/CD流程在实际场景中将如何运作。
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="pr-7">
                    <h1 class="title">所属社区</h1>
                    <div class="pr-7-content">
                      <div class="left">
                        <img src="~@/assets/pngs/pr-7-1.png" />
                      </div>
                      <div class="right">
                        “木兰开源社区”建立于2019年8月，是国家重点研发计划重点专项“云计算和大数据开源社区生态系统”的核心成果。旨在促进产学研用各方开源领域的交流，推动国家科技创新成果开源，加强企业、科教研单位和行业用户之间的沟通，推动开源成果转化落地，同时为各类开源项目提供中立托管，保证开源项目的持续发展不受第三方影响，通过更加开放的方式来打造和完善开源社区生态。
                      </div>
                    </div>
                  </div>
                  <div class="pr-8">
                    <div class="cooperator">
                      <div class="cooperator-wrapper">
                        <div class="cooper-item item-1">
                          <img src="~@/assets/pngs/pr-8-1.png" />
                        </div>
                        <div class="cooper-item item-2">
                          <img src="~@/assets/pngs/pr-8-2.png" />
                        </div>
                        <div class="cooper-item item-3">
                          <img src="~@/assets/pngs/pr-8-3.png" />
                        </div>
                        <div class="cooper-item item-4">
                          <img src="~@/assets/pngs/pr-8-4.png" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="pr-bottom">
                    <div class="left">
                      <div class="qrcode">
                        <img src="~@/assets/pngs/qrcode.png" />
                      </div>
                    </div>
                    <div class="right">
                      <div class="top">
                        九州云在“开源·赋能云边变⾰”的理想和共同⽬标指引下，重新对DevOps
                        &
                        OpsDev领域中共性、有价值的需求做了⼀次完整的梳理和重写，最终以“建⽊”开源项⽬的形态呈现。
                      </div>
                      <div class="bottom">
                        <span>项⽬官⽹：</span
                        ><a href="https://jianmu.dev">https://jianmu.dev</a>
                        <br />
                        <span>项⽬托管：</span
                        ><a href="https://gitee.com/jianmu-dev"
                          >https://gitee.com/jianmu-dev</a
                        >
                        <span>项⽬文档：</span
                        ><a href="https://docs.jianmu.dev"
                          >https://docs.jianmu.dev</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="scroll-bar-bottom" ref="scrollBarBottomRef">
              <img src="~@/assets/pngs/bar-bottom.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-block">
      <div class="copy-info">
        ©2020-{{ new Date().getFullYear() }} 版权所有 九州云信息科技有限公司
        <span>邮箱：</span
        ><span><a href="mailto:support@jianmu.dev">support@jianmu.dev</a></span>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.main {
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  .container {
    .header {
      max-width: 1600px;
      margin: 0 auto;
      display: flex;
      height: 90px;
      align-items: center;
      justify-content: space-between;
      .logo-area {
        margin-left: 2%;
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
          color: #012c53;
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
          padding: 10px;
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
    .content-bg {
      height: 5566px;
      background-repeat: no-repeat;
      background-position: top center;
      background-image: url('@/assets/pngs/main-bg.png');
      .content-wrapper {
        max-width: 1600px;
        margin: 0 auto;
        .description {
          display: flex;
          height: 413px;
          margin: -30px 0px 70px 2%;
          justify-content: space-between;
          .left {
            margin-top: 80px;
            .top-card {
              width: 515px;
              height: 222px;
              background-image: url('@/assets/svgs/top-card.svg');
              background-repeat: no-repeat;
              background-position: top center;
            }
            .operation-btns {
              margin-top: 100px;
              display: flex;
              .item {
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
            background-image: url('@/assets/pngs/description.png');
            background-position: top center;
            background-size: contain;
            background-repeat: no-repeat;
          }
        }
        .scroll {
          // margin-top: 160px;
          margin-top: 150px;
          .scroll-bar,
          .scroll-bar-bottom {
            height: 30px;
            max-width: 99%;
            margin: 0 auto;
            img {
              height: 100%;
              width: 100%;
            }
          }
          .scroll-container {
            overflow: hidden;
            margin: -5px auto;
            position: relative;
            z-index: 11;
            .scroll-wrapper {
              max-width: 90%;
              background-color: #f2f4f7;
              margin: 0 auto;
              padding: 30px;
              .scroll-content {
                background-color: #fff;
                .pr-1 {
                  padding-top: 90px;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  color: #042749;
                  .pr-1-title {
                    font-size: 40px;
                    font-weight: 600;
                  }
                  .pr-1-desc {
                    margin-top: 44px;
                    width: 676px;
                    font-size: 16px;
                    line-height: 30px;
                  }
                  .the-transition {
                    width: 122px;
                    margin-top: 30px;
                    img {
                      width: 100%;
                    }
                  }
                }
                .pr-2 {
                  height: 765px;
                  background-image: url('@/assets/svgs/pr-2-bg.svg');
                  background-repeat: no-repeat;
                  background-size: 110% 110%;
                  background-position: top center;
                  display: flex;
                  justify-content: space-between;
                  padding: 20px;
                  .pr-2-left {
                    color: #042749;
                    margin-top: 110px;
                    margin-right: 50px;
                    width: 326px;
                    .title {
                      font-size: 32px;
                    }
                    .desc {
                      width: 326px;
                      font-size: 16px;
                      line-height: 30px;
                    }
                  }
                  .pr-2-right {
                    flex-grow: 1;
                    margin-top: 86px;
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    .tab-btns {
                      position: absolute;
                      z-index: 1;
                      align-self: flex-end;
                      display: flex;
                      .item {
                        display: flex;
                        border: 1px solid #eff4f9;
                        justify-content: center;
                        align-items: center;
                        padding: 5px;
                        width: 136px;
                        height: 46px;
                        cursor: pointer;
                        user-select: none;
                        background-color: #fff;
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
                      margin-top: 58px;
                      width: 100%;
                      box-shadow: 0px 0px 40px 0px #768094;
                      ::v-deep(.jm-dsl-editor) {
                        height: 530px;
                        .CodeMirror {
                          &.cm-s-ayu-mirage {
                            &.CodeMirror-wrap {
                              padding: 24px 0;
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
                .pr-3 {
                  display: flex;
                  position: relative;
                  flex-direction: column;
                  align-items: center;
                  padding: 0 60px;
                  margin: 30px 0 100px;
                  .title {
                    font-size: 32px;
                    font-weight: 600;
                    color: #042749;
                  }
                  .desc {
                    margin: 25px 0 50px;
                    font-size: 16px;
                    font-weight: 400;
                    line-height: 30px;
                  }
                  ::v-deep(.el-carousel) {
                    width: 100%;
                    .el-carousel__item {
                      img {
                        width: 100%;
                      }
                    }
                    .el-carousel__indicators {
                      .el-carousel__indicator {
                        margin-top: 50px;
                        &.is-active {
                          .el-carousel__button {
                            background-color: #042749;
                            &:hover {
                              opacity: 1;
                            }
                          }
                        }
                        .el-carousel__button {
                          &:hover {
                            opacity: 1;
                          }
                          height: 6px;
                          width: 40px;
                          border-radius: 3px;
                          background-color: #d6dadf;
                        }
                      }
                    }
                  }
                  .shadow {
                    position: absolute;
                    top: 140px;
                    left: 0.5%;
                    box-shadow: 0px 0px 30px 0px #dce3ef;
                    width: 99%;
                    height: 640px;
                  }
                }
                .pr-4 {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  margin-top: 30px;
                  background-image: url('@/assets/svgs/pr-4-bg.svg');
                  background-position: top left;
                  background-repeat: no-repeat;
                  background-size: 115%;
                  height: 675px;
                  .title {
                    font-size: 32px;
                    font-weight: 600;
                    color: #042749;
                  }
                  .desc {
                    margin: 25px 0 0px;
                    font-size: 16px;
                    font-weight: 400;
                    line-height: 30px;
                    width: 416px;
                    color: #333333;
                  }
                  .icon-wrapper {
                    margin-top: 150px;
                    width: 1100px;
                    display: flex;
                    justify-content: center;
                    height: 600px;
                    flex-wrap: wrap;
                    .icon-item {
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      margin-bottom: 20px;
                      margin-right: 10px;
                      width: 140px;
                      .icon {
                        width: 82px;
                        img {
                          width: 100%;
                          border-radius: 25%;
                        }
                      }
                      .icon-desc {
                        margin-top: 0px;
                        font-size: 15px;
                        font-weight: 400;
                        color: #042749;
                        width: 100%;
                        text-align: center;
                        a {
                          text-decoration: none;
                          color: #042749;
                          &:hover {
                            text-decoration: underline;
                          }
                        }
                      }
                    }
                  }
                }
                .pr-5 {
                  color: #333333;
                  margin: 100px 0 0;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  .title {
                    font-size: 36px;
                    font-weight: 600;
                  }
                  .desc {
                    margin: 25px 0 80px;
                    font-size: 16px;
                    font-weight: 400;
                    line-height: 30px;
                    width: 290px;
                    white-space: nowrap;
                  }
                  .platform {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    width: 1100px;
                    .platform-item {
                      display: flex;
                      align-items: center;
                      justify-content: flex-start;
                      margin-right: 160px;
                      width: 200px;
                      margin-bottom: 70px;
                      &:nth-child(3n) {
                        margin-right: 0px;
                      }
                      .icon {
                        width: 72px;
                        img {
                          width: 100%;
                        }
                      }
                      .name {
                        font-weight: 600;
                        color: #333333;
                        font-size: 30px;
                        margin-left: 20px;
                      }
                    }
                  }
                }
                .pr-6 {
                  padding-top: 80px;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  background-image: url('@/assets/svgs/pr-6-bg.svg');
                  background-size: 120%;
                  background-repeat: no-repeat;
                  height: 543px;
                  .title {
                    font-weight: 600;
                    color: #042749;
                    font-size: 32px;
                  }
                  .pr-6-content {
                    display: flex;
                    margin-top: 60px;
                    justify-content: center;
                    .feat-item {
                      display: flex;
                      flex-direction: column;
                      align-items: flex-start;
                      &:nth-child(1) {
                        margin-left: 30px;
                        .desc-img {
                          align-self: flex-start;
                          width: 240px;
                          img {
                            width: 100%;
                          }
                        }
                      }
                      &:nth-child(2) {
                        .desc-img {
                          align-self: flex-start;
                          width: 226px;
                          img {
                            width: 100%;
                          }
                        }
                      }
                      &:nth-child(3) {
                        margin-right: 0px;
                        .desc-img {
                          align-self: flex-start;
                          width: 195px;
                          img {
                            width: 100%;
                          }
                        }
                      }
                      margin-right: 150px;
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      color: #042749;

                      .heading {
                        margin-top: 40px;
                        font-weight: 600;
                        font-size: 20px;
                      }
                      .desc {
                        margin-top: 16px;
                        width: 260px;
                        font-size: 16px;
                        font-weight: 400;
                        line-height: 30px;
                      }
                    }
                  }
                }
                .pr-7 {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  color: #042749;
                  margin-top: 60px;
                  .title {
                    height: 32px;
                    font-weight: 600;
                    color: #042749;
                  }
                  .pr-7-content {
                    margin-top: 50px;
                    display: flex;
                    .left {
                      margin-top: 10px;
                      width: 206px;
                      img {
                        width: 100%;
                      }
                    }
                    .right {
                      margin-left: 45px;
                      width: 571px;
                      font-weight: 400;
                      color: #042749;
                      line-height: 30px;
                    }
                  }
                }
                .pr-8 {
                  margin-top: 80px;
                  border-top: 1px solid #dfe7ee;
                  .cooperator-wrapper {
                    margin: 70px 0;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    .cooper-item {
                      &.item-1 {
                        width: 376px;
                      }
                      &.item-2 {
                        width: 122px;
                      }
                      &.item-3 {
                        width: 150px;
                      }
                      &.item-4 {
                        width: 196px;
                      }
                      img {
                        width: 100%;
                      }
                    }
                  }
                }
                .pr-bottom {
                  padding: 50px 0;
                  display: flex;
                  justify-content: center;
                  background: #f6fafe;
                  color: #042749;
                  font-size: 14px;
                  .left {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    .qrcode {
                      width: 124px;
                      img {
                        width: 100%;
                      }
                    }
                  }
                  .right {
                    margin-left: 20px;
                    font-weight: 400;
                    line-height: 24px;
                    .top {
                      width: 375px;
                    }
                    .bottom {
                      margin-top: 16px;
                      width: 270px;
                      a {
                        color: #042749;
                        text-decoration: none;
                        &:hover {
                          text-decoration: underline;
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
  }
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
      color: #666666;
      span:nth-child(1) {
        margin-left: 25px;
      }
      a {
        text-decoration: none;
        color: #666666;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
