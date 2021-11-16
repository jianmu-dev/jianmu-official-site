<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from 'vue';
import { dsl, workFlow } from '@/utils/constants';
import { IPageVo } from '@/api/dto/common';
import { INodeDefinitionVo } from '@/api/dto/node-search';
import { nodeSearch } from '@/api/node-search';
import { START_PAGE_NUM } from '@/utils/rest/constants';
const nodeSearchDate = ref<IPageVo<INodeDefinitionVo>>();
const { proxy } = getCurrentInstance() as any;
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
const tabIndex = ref<number>(0);
const tabClick = (index: number) => {
  tabIndex.value = index;
};
</script>
<template>
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
            <img src="~@/assets/svgs/pip-bright.svg" v-if="tabIndex === 0" />
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
    <div class="pr-3">
      <h1 class="title">流程可视化</h1>
      <span class="desc">流程配置可视化，任务编排与执行状态一目了然。</span>
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
            <a :href="`https://hub.jianmu.dev/${item.ownerRef}/${item.ref}`">
              <img
                :src="`${item.icon}?imageView2/2/w/82/h/82/interlace/1/q/100`"
              />
            </a>
          </div>
          <span class="icon-desc"
            ><a :href="`https://hub.jianmu.dev/${item.ownerRef}/${item.ref}`">
              {{ item.name }}
            </a></span
          >
        </div>
      </div>
    </div>
    <div class="pr-5">
      <h1 class="title">平台中立</h1>
      <span class="desc">无平台倾向性，用户可根据需要自行选择。 </span>
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
          <img src="~@/assets/pngs/qr-code-big.png" />
        </div>
      </div>
      <div class="right">
        <div class="top">
          九州云在“开源·赋能云边变⾰”的理想和共同⽬标指引下，重新对DevOps &
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
          ><a href="https://docs.jianmu.dev">https://docs.jianmu.dev</a>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.scroll-content {
  background-color: #fff;
  .pr-1 {
    padding-top: 60px;
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
    margin-top: -40px;
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
        margin-top: 58px;
        height: 550px;
        width: 100%;
        box-shadow: 0px 0px 40px 0px #768094;
        ::v-deep(.jm-dsl-editor) {
          // height: 530px;
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
    margin: 80px 60px 130px;
    color: #042749;
    .title {
      font-size: 32px;
      font-weight: 600;
    }
    .desc {
      margin: 25px 0 50px;
      font-size: 16px;
      font-weight: 400;
      line-height: 30px;
    }
    ::v-deep(.el-carousel) {
      width: 99%;
      .el-carousel__item {
        img {
          width: 100%;
          height: 590px;
        }
      }
      .el-carousel__indicators {
        .el-carousel__indicator {
          margin-top: 60px;
          &.is-active {
            .el-carousel__button {
              background-color: #042749;
              &:hover {
                opacity: 1;
              }
            }
          }
          .el-carousel__button {
            margin-right: 20px;
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
      height: 610px;
    }
  }
  .pr-4 {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: url('@/assets/svgs/pr-4-bg.svg');
    background-position: top left;
    background-repeat: no-repeat;
    background-size: 115%;
    height: 675px;
    color: #042749;
    .title {
      font-size: 32px;
      font-weight: 600;
    }
    .desc {
      margin: 25px 0 0px;
      font-size: 16px;
      font-weight: 400;
      line-height: 30px;
      width: 416px;
    }
    .icon-wrapper {
      margin-top: 110px;
      width: 1100px;
      display: flex;
      justify-content: center;
      height: 600px;
      flex-wrap: wrap;
      .icon-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 25px;
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
          width: 87px;
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
    color: #042749;
    margin: 130px 0 0;
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
        width: 220px;
        margin-bottom: 50px;
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
          color: #042749;
          font-size: 30px;
          margin-left: 20px;
        }
      }
    }
  }
  .pr-6 {
    padding-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: url('@/assets/svgs/pr-6-bg.svg');
    background-size: 100%;
    background-repeat: no-repeat;
    height: 440px;
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
          margin: 40px 0px 16px;
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
    margin-top: 140px;
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
      margin: 65px 0;
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
        width: 158px;
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
        width: 280px;
        font-weight: 800;
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
</style>
