<template>
  <div class="home-page">
    <div class="top">
      <div class="left">
        <router-link to="/">
          <div class="logo"/>
        </router-link>
        <div class="separator"/>
        <div class="title">持续集成平台</div>
      </div>
      <div class="right">
        <button @click="hub">
          <span>节点库</span>
          <i class="hub"/>
        </button>
        <button class="primary" @click="contribution">
          <span>参与贡献</span>
          <i class="contribution"/>
        </button>
      </div>
    </div>
    <div class="part-1">
      <div class="left">
        <div class="content">
          <div class="title">建木持续集成平台</div>
          <div class="desc">基于建木的持续集成平台是国产化的开源持续集成平台，致力于为国内开发者提供更好的CI/CD使用体验</div>
          <div class="operation">
            <button class="large primary" @click="quickStart">
              <span>快速开始</span>
              <i class="quick-start"/>
            </button>
            <button class="large" @click="doc">
              <span>文档</span>
              <i class="doc"/>
            </button>
            <button class="large" @click="example">
              <span>示例</span>
              <i class="example"/>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="part-2">
      <div class="content">
        <div class="left">
          <div class="title">配置即代码</div>
          <div class="desc">国产化的开源持续集成平台，致力于为国内开发者提供更好的CI/CD使用体验国产化的开源持续集成平台，致力于为国内开发者提供更好的CI/CD使用体验</div>
        </div>
        <div class="right">
          <div class="dsl-viewer">
            <div class="labels">
              <el-tooltip content="流程DSL" placement="top">
                <div :class="{workflow: true, selected: dslType === DslTypeEnum.WORKFLOW}"
                     @click="dslType = DslTypeEnum.WORKFLOW"/>
              </el-tooltip>
              <el-tooltip content="管道DSL" placement="top">
                <div :class="{pipeline: true, selected: dslType === DslTypeEnum.PIPELINE}"
                     @click="dslType = DslTypeEnum.PIPELINE"/>
              </el-tooltip>
            </div>
            <jm-dsl-editor :value="dsl" readonly/>
          </div>
        </div>
      </div>
    </div>
    <div class="part-3">
      <div class="content">
        <div class="title">流程可视化</div>
        <div class="desc">流程可视化提供CI/CD流程的可视化展示，任务编排依赖与执行情况一目了然</div>
        <div class="carousel">
          <el-carousel indicator-position="outside" height="530px" arrow="never">
            <el-carousel-item v-for="(img, index) in carouselImgs" :key="index">
              <img :src="img"/>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
    <div class="part-4">
      <div class="content">
        <div class="title" @click="hub">节点生态</div>
        <div class="desc">流程可视化提供CI/CD流程的可视化展示，任务编排依赖与执行情况一目了然</div>
      </div>
    </div>
    <div class="part-5">
      <div class="title">平台中立</div>
      <!--      <div class="desc">平台中立说明内容后面补全</div>-->
    </div>
    <div class="part-6">
      <div class="title">产品特性</div>
    </div>
    <div class="bottom">
      <span>&copy;2020-{{ new Date().getFullYear() }} 版权所有 九州云信息科技有限公司</span>
      <span>邮箱：<a href=mailto:support@jianmu.dev>support@jianmu.dev</a></span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import carouselImg1 from '@/assets/images/carousel/1.png';
import carouselImg2 from '@/assets/images/carousel/2.png';
import carouselImg3 from '@/assets/images/carousel/3.png';
import carouselImg4 from '@/assets/images/carousel/4.png';
import carouselImg5 from '@/assets/images/carousel/5.png';

enum DslTypeEnum {
  WORKFLOW = 'workflow',
  PIPELINE = 'pipeline',
}

export default defineComponent({
  setup() {
    const workflow = 'workflow:\n' +
      '  name: 建木官网CDN CI/CD\n' +
      '  ref: jianmu_official_site_cdn_cicd\n' +
      '  description: 建木官网CDN CI/CD\n' +
      '  start:\n' +
      '    type: start\n' +
      '    targets:\n' +
      '      - git_clone\n' +
      '  git_clone:\n' +
      '    type: git_clone:1.0.0\n' +
      '    sources:\n' +
      '      - start\n' +
      '    targets:\n' +
      '      - node_build\n' +
      '    param:\n' +
      '      remote_url: https://gitee.com/jianmu-dev/jianmu-official-site.git\n' +
      '      ref: refs/heads/master\n' +
      '      netrc_machine: gitee.com\n' +
      '      netrc_username: ((gitee.username))\n' +
      '      netrc_password: ((gitee.password))\n' +
      '  node_build:\n' +
      '    type: nodejs_build:1.0.0-14.16.1\n' +
      '    sources:\n' +
      '      - git_clone\n' +
      '    targets:\n' +
      '      - qiniu_upload\n' +
      '    param:\n' +
      '      workspace: ${git_clone.git_path}\n' +
      '      build_arg: --mode cdn\n' +
      '  qiniu_upload:\n' +
      '    type: qiniu_upload:1.0.1\n' +
      '    sources:\n' +
      '      - node_build\n' +
      '    targets:\n' +
      '      - update_index_page\n' +
      '    param:\n' +
      '      qiniu_bucket: jianmu\n' +
      '      qiniu_ak: ((qiniu.AccessKey))\n' +
      '      qiniu_sk: ((qiniu.SecretKey))\n' +
      '      qiniu_zone: z1\n' +
      '      qiniu_upload_uri_prefix: ${node_build.package_name}/${node_build.package_version}\n' +
      '      qiniu_upload_dir: ${git_clone.git_path}/dist\n' +
      '  update_index_page:\n' +
      '    type: scp_resouce:1.0.0\n' +
      '    sources:\n' +
      '      - qiniu_upload\n' +
      '    targets:\n' +
      '      - send_message\n' +
      '    param:\n' +
      '      ssh_private_key: ((private_key.alixg))\n' +
      '      ssh_ip: 47.243.164.48\n' +
      '      remote_file: /etc/nginx/html/index.html\n' +
      '      local_file: ${git_clone.git_path}/dist/index.html\n' +
      '  send_message:\n' +
      '    type: qywx_notice:1.0.0\n' +
      '    sources:\n' +
      '      - update_index_page\n' +
      '    targets:\n' +
      '      - end\n' +
      '    param:\n' +
      '      bot_webhook_url: ((charbot.webhook_url))\n' +
      '      mentioned_moblie_list: "[]"\n' +
      '      text_content: "建木官网CDN更新完成\\\\n\\\\n版本：${node_build.package_version}"\n' +
      '      msgtype: "text"\n' +
      '      mentioned_list: "[]"\n' +
      '  end:\n' +
      '    type: end\n' +
      '    sources:\n' +
      '      - send_message\n';
    const pipeline = 'pipeline:\n' +
      '  name: 建木官网CDN CI/CD\n' +
      '  ref: jianmu_official_site_cdn_cicd\n' +
      '  description: 建木官网CDN CI/CD\n' +
      '  git_clone:\n' +
      '    type: git_clone:1.0.0\n' +
      '    param:\n' +
      '      remote_url: https://gitee.com/jianmu-dev/jianmu-official-site.git\n' +
      '      ref: refs/heads/master\n' +
      '      netrc_machine: gitee.com\n' +
      '      netrc_username: ((gitee.username))\n' +
      '      netrc_password: ((gitee.password))\n' +
      '  node_build:\n' +
      '    type: nodejs_build:1.0.0-14.16.1\n' +
      '    param:\n' +
      '      workspace: ${git_clone.git_path}\n' +
      '      build_arg: --mode cdn\n' +
      '  qiniu_upload:\n' +
      '    type: qiniu_upload:1.0.1\n' +
      '    param:\n' +
      '      qiniu_bucket: jianmu\n' +
      '      qiniu_ak: ((qiniu.AccessKey))\n' +
      '      qiniu_sk: ((qiniu.SecretKey))\n' +
      '      qiniu_zone: z1\n' +
      '      qiniu_upload_uri_prefix: ${node_build.package_name}/${node_build.package_version}\n' +
      '      qiniu_upload_dir: ${git_clone.git_path}/dist\n' +
      '  update_index_page:\n' +
      '    type: scp_resouce:1.0.0\n' +
      '    param:\n' +
      '      ssh_private_key: ((private_key.alixg))\n' +
      '      ssh_ip: 47.243.164.48\n' +
      '      remote_file: /etc/nginx/html/index.html\n' +
      '      local_file: ${git_clone.git_path}/dist/index.html\n' +
      '  send_message:\n' +
      '    type: qywx_notice:1.0.0\n' +
      '    param:\n' +
      '      bot_webhook_url: ((charbot.webhook_url))\n' +
      '      mentioned_moblie_list: "[]"\n' +
      '      text_content: "建木官网CDN更新完成\\\\n\\\\n版本：${node_build.package_version}"\n' +
      '      msgtype: "text"\n' +
      '      mentioned_list: "[]"\n';
    const dslType = ref<string>(DslTypeEnum.PIPELINE);

    return {
      DslTypeEnum,
      dslType,
      dsl: computed<string>(() => dslType.value === DslTypeEnum.WORKFLOW ? workflow : pipeline),
      carouselImgs: [carouselImg1, carouselImg2, carouselImg3, carouselImg4, carouselImg5],
      hub: () => {
        window.open('https://hub.jianmu.dev', '_blank');
      },
      contribution: () => {
        window.open('https://gitee.com/jianmu-dev', '_blank');
      },
      quickStart: () => {
        window.open('https://docs.jianmu.dev/guide/quick-start.html', '_blank');
      },
      doc: () => {
        window.open('https://docs.jianmu.dev/guide/index.html', '_blank');
      },
      example: () => {
        window.open('https://ci.jianmu.dev', '_blank');
      },
    };
  },
});
</script>

<style scoped lang="less">
.home-page {
  button {
    width: 136px;
    padding: 0 14px 0 22px;
    height: 36px;
    box-shadow: 0 6px 14px 0 #ACC3EE;
    border-radius: 4px;
    background-color: #FFFFFF;
    color: #7B8C9C;
    border-width: 0;
    font-size: 14px;
    cursor: pointer;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;

    &.large {
      width: 156px;
      height: 46px;
      font-size: 16px;
    }

    &.primary {
      background-color: #096DD9;
      color: #FFFFFF;
    }

    i {
      width: 20px;
      height: 20px;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center center;

      &.hub {
        background-image: url('@/assets/svgs/hub.svg');
      }

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
      opacity: 0.8;
    }
  }

  .top {
    margin: 0 auto;
    max-width: 1600px;
    padding: 0 20px;
    height: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      display: flex;
      align-items: center;

      .logo {
        width: 130px;
        height: 35px;
        background-image: url('@/assets/svgs/logo.svg');
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center center;
        cursor: pointer;
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
      button + button {
        margin-left: 20px;
      }
    }
  }

  [class^='part-'] {
    background-repeat: no-repeat;
    background-position: center center;
  }

  .part-1 {
    border-top: 1px solid #C2DFFF;
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
          font-size: 40px;
          font-weight: bold;
          color: #042749;
          letter-spacing: 3px;
        }

        .desc {
          margin-top: 24px;
          width: 330px;
          font-size: 14px;
          color: #385775;
          line-height: 24px;
        }

        .operation {
          margin-top: 131px;

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

    .content {
      max-width: 1600px;
      margin: 0 auto;
      display: flex;
      height: 100%;

      .left {
        padding-top: 216px;
        padding-left: 20px;
        width: 35%;

        .title {
          font-size: 20px;
          font-weight: bold;
          color: #042749;
        }

        .desc {
          margin-top: 24px;
          width: 303px;
          font-size: 14px;
          color: #385775;
          line-height: 24px;
          text-align: justify;
        }
      }

      .right {
        padding-top: 183px;
        padding-right: 20px;
        width: 65%;

        .dsl-viewer {
          position: relative;
          padding: 24px 0 24px 14px;
          height: 482px;
          background-color: #19253B;
          box-shadow: 0 -10px 40px 0 #768094;
          border-radius: 4px;

          .labels {
            position: absolute;
            z-index: 1;
            top: 15px;
            right: 15px;
            display: flex;

            .workflow, .pipeline {
              padding: 5px;
              width: 20px;
              height: 20px;
              background-repeat: no-repeat;
              background-position: center center;
              cursor: pointer;

              &.selected {
                background-color: rgba(255, 255, 255, 0.35);
                border-radius: 4px;
                cursor: not-allowed;
              }
            }

            .workflow {
              background-image: url('@/assets/svgs/workflow-label.svg');
            }

            .pipeline {
              margin-left: 10px;
              background-image: url('@/assets/svgs/pipeline-label.svg');
            }
          }
        }
      }
    }
  }

  .part-3 {
    height: 775px;
    background-image: url('@/assets/images/part-3.png');

    .content {
      padding: 0 20px;
      max-width: 1600px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;

      .title {
        margin-top: 64px;
        font-size: 20px;
        font-weight: bold;
        color: #042749;
      }

      .desc {
        margin-top: 20px;
        font-size: 14px;
        color: #385775;
      }

      .carousel {
        margin-top: 53px;
        width: 1060px;
        height: 530px;
        box-shadow: 0 0 40px 0 #94A6C9;

        ::v-deep(.el-carousel) {
          .el-carousel__indicators--outside {
            margin-top: 30px;

            .el-carousel__indicator--horizontal + .el-carousel__indicator--horizontal {
              margin-left: 12px;
            }

            .el-carousel__indicator {
              .el-carousel__button {
                width: 52px;
                height: 8px;
                border-radius: 6px;
                background-color: #CCD4DF;
                opacity: 0.59;

                &:hover {
                  background-color: #096DD9;
                  opacity: 1;
                }
              }

              &.is-active {
                .el-carousel__button {
                  background-color: #096DD9;
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
  }

  .part-4 {
    height: 808px;
    background-image: url('@/assets/images/part-4.png');

    .content {
      max-width: 1600px;
      margin: 0 auto;

      padding-top: 280px;
      padding-left: 100px;

      .title {
        font-size: 20px;
        font-weight: bold;
        color: #042749;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }

      .desc {
        margin-top: 20px;
        width: 270px;
        font-size: 14px;
        color: #385775;
        line-height: 24px;
        text-align: justify;
      }
    }
  }

  .part-5 {
    height: 895px;
    background-image: url('@/assets/images/part-5.png');
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .title {
      margin-top: 50px;
      font-size: 20px;
      font-weight: bold;
      color: #042749;
    }

    .desc {
      margin-top: 10px;
      font-size: 14px;
      color: #385775;
    }
  }

  .part-6 {
    height: 834px;
    background-image: url('@/assets/images/part-6.png');

    .title {
      padding-top: 195px;
      font-size: 20px;
      font-weight: bold;
      color: #042749;
      text-align: center;
    }
  }

  .bottom {
    text-align: center;
    border: 1px solid #E7ECF1;
    height: 64px;
    line-height: 64px;
    font-size: 14px;
    color: #042749;

    > span + span {
      margin-left: 20px;
    }
  }
}
</style>
