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
        <button class="primary" @click="contribution">
          <span>参与贡献</span>
          <i class="contribution"/>
        </button>
      </div>
    </div>
    <div class="part-1">
      <div class="left">
        <div class="content">
          <div class="title">持续集成平台</div>
          <div class="desc">持续集成平台是国产化的开源持续集成平台，致力于为国内开发者提供更好的CI/CD使用体验</div>
          <div class="operation">
            <button class="large primary">
              <span>快速开始</span>
              <i class="quick-start"/>
            </button>
            <button class="large">
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
        <div class="title">组件生态</div>
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
      &copy;2012-2020 版权所有 九州云信息科技有限公司 浙ICP备 12032350号-3
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import carouselImg1 from '@/assets/images/carousel/1.png';
import carouselImg2 from '@/assets/images/carousel/2.png';
import carouselImg3 from '@/assets/images/carousel/3.png';
import carouselImg4 from '@/assets/images/carousel/4.png';
import carouselImg5 from '@/assets/images/carousel/5.png';

export default defineComponent({
  setup() {
    return {
      dsl: 'event:\n' +
        '  push_event:\n' +
        '    branch: ${branch_name} # dev, master\n' +
        '  tag_event:\n' +
        '    tag: ${branch_name} # tag_name\n' +
        '\n' +
        'param:\n' +
        '  branch_name: master\n' +
        '  git_site: gitee.com\n' +
        '\n' +
        'workflow:\n' +
        '  name: 建木-前端CI&CD流程\n' +
        '  ref: jianmu_ui_ci_cd\n' +
        '  description: 建木-前端CI&CD流程\n' +
        '  Start_1:\n' +
        '    type: start\n' +
        '    targets:\n' +
        '      - Git_1\n' +
        '  Git_1:\n' +
        '    type: git_clone0.3\n' +
        '    sources:\n' +
        '      - Start_1\n' +
        '    targets:\n' +
        '      - Build_1\n' +
        '    param:\n' +
        '      workspace: jianmu-ui\n' +
        '      commit_branch: ${branch_name}\n' +
        '      remote_url: https://gitee.com/jianmu_dev/jianmu-ui.git\n' +
        '      netrc_machine: ${git_site}\n' +
        '      netrc_username: ((gitee.user))\n' +
        '      netrc_password: ((gitee.pass))\n' +
        '  Build_1:\n' +
        '    type: node14.2\n' +
        '    sources:\n' +
        '      - Git_1\n' +
        '    targets:\n' +
        '      - Upload_1\n' +
        '    param:\n' +
        '      workspace: jianmu-ui\n' +
        '  Upload_1:\n' +
        '    type: file_upload0.3\n' +
        '    param:\n' +
        '      minio_host: http://192.168.1.24:9000\n' +
        '      minio_access_key: ((minio.access_key))\n' +
        '      minio_secret_key: ((minio.secret_key))\n' +
        '      file_source: "jianmu-ui/dist"\n' +
        '    sources:\n' +
        '      - Build_1\n' +
        '    targets:\n' +
        '      - SSH_1\n' +
        '  SSH_1:\n' +
        '    type: ssh0.4\n' +
        '    param:\n' +
        '      ssh_host: ethan@192.168.1.24\n' +
        '      ssh_private_key: ((ssh.private_key))\n' +
        '    sources:\n' +
        '      - Upload_1\n' +
        '    targets:\n' +
        '      - End_1\n' +
        '  End_1:\n' +
        '    type: end\n' +
        '    sources:\n' +
        '      - SSH_1\n',
      carouselImgs: [carouselImg1, carouselImg2, carouselImg3, carouselImg4, carouselImg5],
      contribution: () => {
        window.open('https://gitee.com/jianmu_dev', '_blank');
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
    width: 140px;
    padding: 0 14px 0 22px;
    height: 44px;
    box-shadow: 0 6px 14px 0 #ACC3EE;
    border-radius: 4px;
    background-color: #FFFFFF;
    color: #7B8C9C;
    border-width: 0;
    font-size: 16px;
    cursor: pointer;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;

    &.large {
      width: 156px;
      height: 56px;
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
      opacity: 0.8;
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
          height: 530px;
          background-color: #19253B;
          box-shadow: 0 -10px 40px 0 #768094;
          border-radius: 4px;
          overflow: hidden;
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
        font-size: 30px;
        font-weight: bold;
        color: #042749;
      }

      .desc {
        margin-top: 24px;
        width: 303px;
        font-size: 16px;
        color: #042749;
        line-height: 26px;
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
      font-size: 30px;
      font-weight: bold;
      color: #042749;
    }

    .desc {
      margin-top: 16px;
      font-size: 16px;
      color: #042749;
    }
  }

  .part-6 {
    height: 834px;
    background-image: url('@/assets/images/part-6.png');

    .title {
      padding-top: 195px;
      font-size: 30px;
      font-weight: bold;
      color: #042749;
      text-align: center;
    }
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
