<script setup lang="ts">
import { getCurrentInstance, ref, onMounted } from 'vue';
// 引入api
import { nodeSearch } from '@/api/node-search';
import { IPageVo } from '@/api/dto/common';
import { INodeDefinitionVo } from '@/api/dto/node-search';
import { START_PAGE_NUM } from '@/utils/rest/constants';
// 轮播图图片
import swipperOne from '@/assets/carousel-imgs/1.png';
import swipperTwo from '@/assets/carousel-imgs/2.png';
import swipperThree from '@/assets/carousel-imgs/3.png';
import swipperFour from '@/assets/carousel-imgs/4.png';
const images = [swipperOne, swipperTwo, swipperThree, swipperFour];

// dsl模拟展示代码
const workflow =
  'name: 建木官网CDN CI/CD\n' +
  'description: 建木官网CDN CI/CD\n\n' +
  'workflow:\n' +
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
const pipeline =
  'name: 建木官网CDN CI/CD\n' +
  'description: 建木官网CDN CI/CD\n\n' +
  'pipeline:\n' +
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
// 切换flag
const workFlowFlag = ref<boolean>(true);
const pipeLineFlag = ref<boolean>(false);
// 切换到流程dsl
const toWorkFlow = () => {
  workFlowFlag.value = true;
  pipeLineFlag.value = false;
};
// 切换到管道dsl
const toPipeLine = () => {
  workFlowFlag.value = false;
  pipeLineFlag.value = true;
};
// 快速开始
const quickStart = () => {
  window.location.href = 'https://docs.jianmu.dev/guide/quick-start.html';
};
// 文档
const toDocument = () => {
  window.location.href = 'https://docs.jianmu.dev/guide/index.html';
};
// 示例
const toExample = () => {
  window.location.href = 'https://ci.jianmu.dev';
};
// 节点库
const toNodeStore = () => {
  window.location.href = 'https://hub.jianmu.dev';
};

// 请求到的节点数据
const nodeSearchDate = ref<IPageVo<INodeDefinitionVo>>();
const { proxy } = getCurrentInstance() as any;

// 节点数据请求
onMounted(async () => {
  try {
    nodeSearchDate.value = await nodeSearch({
      pageNum: START_PAGE_NUM,
      pageSize: 18,
    });
  } catch (err) {
    proxy.$thow(err, proxy);
  }
});
</script>

<template>
  <!-- 文档入口 -->
  <div class="official-document-entry">
    <div class="document-title">
      建木持续集成平台
    </div>
    <div class="document-content">
      建木持续集成平台基于建木，致力于为国内开发者与DevOps人员提供极致用户体验，提升开发、上线、运维的效率，让用户专注于提供业务价值。
    </div>
    <!-- 按钮 -->
    <div class="btns-container">
      <div
        class="quick-start-btn document-btn-common"
        @click="quickStart"
      >
        快速开始
      </div>
      <div
        class="document-btn document-btn-common"
        @click="toDocument"
      >
        文档
      </div>
    </div>
  </div>
  <!-- 配置即代码 -->
  <div class="official-common-container">
    <div class="common-title">
      配置即代码
    </div>
    <div class="common-description">
      提供声明式语法将流程代码化，通过代码库进行版本控制，快速实现幂等部署与故障恢复。
    </div>
    <div class="configure">
      <!-- 控制器 -->
      <div class="controller-container">
        <div class="controller">
          <img
            src="@/assets/official-h5/svgs/left.svg"
            v-if="workFlowFlag"
          >
          <img
            src="@/assets/official-h5/svgs/left-active.svg"
            @click="toWorkFlow"
            v-else
          >
          <div
            class="controller-title"
            v-if="workFlowFlag"
          >
            <img src="@/assets/official-h5/svgs/workflow-label.svg">
            流程
          </div>
          <div
            class="controller-title"
            v-else
          >
            <img src="@/assets/official-h5/svgs/flowchart.svg">
            管道
          </div>

          <img
            src="@/assets/official-h5/svgs/right.svg"
            v-if="pipeLineFlag"
          >
          <img
            src="@/assets/official-h5/svgs/right-active.svg"
            v-else
            @click="toPipeLine"
          >
        </div>
      </div>
      <!-- dsl展示 -->
      <div class="dsl-show">
        <div class="dsl-show-container">
          <jm-dsl-editor
            :value="workFlowFlag ? workflow : pipeline"
            readonly
          />
        </div>
      </div>
    </div>
  </div>
  <!-- 流程可视化 -->
  <div class="official-common-container visualization">
    <div class="common-title">
      流程可视化
    </div>
    <div class="common-description">
      流程配置可视化，任务编排与执行状态一目了然。
    </div>
    <!-- 轮播图 -->
    <div class="visualization-swipper">
      <div class="swipper-shadow" />
      <van-swipe
        :autoplay="3000"
        indicator-color="#096DD9"
      >
        <van-swipe-item
          v-for="(image, index) in images"
          :key="index"
        >
          <img v-lazy="image">
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
  <!-- 示例-按钮 -->
  <div class="btns-container">
    <div
      class="common-btn"
      @click="toExample"
    >
      示例
    </div>
  </div>
  <!-- 节点生态 -->
  <div class="official-common-container node-ecology">
    <div class="common-title">
      节点生态
    </div>
    <div class="common-description">
      使用官方与社区提供的节点自由组合，灵活满足各类需求。贡献节点，分享自己的成果。
    </div>
    <!-- 节点展示 -->
    <div class="node-show">
      <a
        class="node-container"
        v-for="item in nodeSearchDate?.content"
        :key="item.id"
        :href="`https://hub.jianmu.dev/${item.ownerRef}/${item.ref}`"
      >
        <img
          :src="`${item.icon}?imageMogr2/thumbnail/132x/sharpen/1`"
          class="node-img"
        >
        <div class="node-title">{{ item.name }}</div>
      </a>
    </div>
  </div>
  <!-- 节点库-按钮 -->
  <div class="btns-container">
    <div
      class="common-btn"
      @click="toNodeStore"
    >
      建木Hub
    </div>
  </div>
</template>

<style scoped lang="less">
// 文档入口
.official-document-entry {
  width: 100%;
  padding: 54px 30px 0 30px;
  .document-title {
    font-size: 48px;
    font-weight: 700;
    margin-bottom: 46px;
  }
  .document-content {
    font-size: 30px;
    line-height: 48px;
    margin-bottom: 60px;
  }
  // 按钮公共样式
  .document-btn-common {
    width: 690px;
    height: 90px;
    display: block;
    font-size: 30px;
    font-weight: 700;
    line-height: 90px;
    text-align: center;
    border-radius: 10px;
  }
  .quick-start-btn {
    background: #0f2647;
    color: #fff;
    margin-bottom: 30px;
  }
  .document-btn {
    background: #fff;
    border: 1px solid #a7b4c2;
  }
}
// 公共盒子+标题内容样式
.official-common-container {
  .common-title,
  .common-description {
    padding: 0 30px;
  }
  // 标题
  .common-title {
    font-size: 36px;
    font-weight: 700;
  }
  // 描述
  .common-description {
    font-size: 30px;
    margin: 40px 0 60px 0;
    line-height: 48px;
  }
  // 配置即代码
  .configure {
    margin-bottom: 80px;
    // dsl代码-控制器
    .controller-container {
      padding: 0 30px;
      .controller {
        height: 94px;
        padding: 0 30px;
        border: 1px solid #a5b5c3;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 4px 4px 0 0;
        img {
          width: 32px;
          height: 33px;
        }
        .controller-title {
          display: flex;
          align-items: center;
          font-size: 30px;
          color: #042749;
          font-weight: 700;
          img {
            margin-right: 20px;
          }
        }
      }
    }

    // dsl展示
    .dsl-show {
      background: url('@/assets/official-h5/svgs/configure.svg');
      background-size: 100% 100%;
      font-size: 21px;
      line-height: 30px;
      padding-bottom: 40px;
      .dsl-show-container {
        padding: 0 30px;
        ::v-deep(.jm-dsl-editor) {
          padding-bottom: 22px;
        }
        ::v-deep(.CodeMirror-sizer) {
          padding: 18px 16px;
        }
        ::v-deep(.CodeMirror .CodeMirror-linenumber) {
          color: #c1d7ff;
          text-align: center;
        }
        ::v-deep(.CodeMirror-gutter) {
          color: #c1d7ff;
          text-align: center;
          padding-right: 15px;
          margin-right: 20px;
          border-right: 1px solid #4a638f;
        }
        ::v-deep(.CodeMirror-scroll) {
          width: 690px;
          height: 493px;
          top: 0;
          left: 0;
        }
      }
    }
  }
}
// 流程可视化
.visualization {
  background: url('@/assets/official-h5/svgs/visualization.svg') no-repeat;
  background-size: 100% 100%;
  padding: 0 30px;
  height: 634px;
  .common-title,
  .common-description {
    padding: 0;
  }
  .visualization-swipper {
    width: 690px;
    height: 402px;
    position: relative;
    .swipper-shadow {
      position: absolute;
      left: 0;
      top: 0;
      width: 690px;
      height: 348px;
      box-shadow: 0px 0px 30px 0px #dce3ef;
    }
    ::v-deep(.van-swipe) {
      position: static;
      // 轮播图内容
      .van-swipe-item {
        height: 348px;
        img {
          height: 348px;
        }
      }
      // 轮播图切换点
      .van-swipe__indicators {
        .van-swipe__indicator {
          background: #bcc3cc;
          width: 40px;
          height: 6px;
          margin-right: 20px;
          border-radius: 3px;
        }
      }
    }
  }
}
// 公共按钮样式
.btns-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 80px;
  margin-top: 60px;
  .common-btn {
    width: 690px;
    height: 94px;
    font-size: 30px;
    font-weight: 700;
    text-align: center;
    line-height: 94px;
    color: #fff;
    background: #0f2647;
    border-radius: 10px;
  }
}
// 节点生态
.node-ecology {
  background: url('@/assets/official-h5/svgs/node-ecology.svg');
  background-size: 100%;
  // 节点展示
  .node-show {
    width: 750px;
    height: 314px;
    padding: 0 30px;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    .node-container {
      width: 168px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 40px;
      margin-right: 4px;
      // 节点图片
      .node-img {
        width: 88px;
        height: 88px;
        margin-bottom: 11px;
        border-radius: 22.19px;
      }
      // 节点名
      .node-title {
        width: 150px;
        font-size: 20px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .node-container:nth-of-type(5) {
        margin-right: 0;
      }
    }
  }
}
</style>
