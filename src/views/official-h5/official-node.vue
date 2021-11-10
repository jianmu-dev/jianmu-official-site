<script setup lang="ts">
import { getCurrentInstance, ref, onMounted } from 'vue';
// 引入api
import { nodeSearch } from '@/api/node-search';
import { IPageVo } from '@/api/dto/common';
import { INodeDefinitionVo } from '@/api/dto/node-search';
import { START_PAGE_NUM } from '@/utils/rest/constants';

// dsl模拟展示代码
const workflow =
  'event:\n' +
  '  push_event:\n' +
  '    branch: ${branch_name} # dev, master\n' +
  '  tag_event:\n' +
  '    tag: ${branch_name} # tag_name\n' +
  'param:\n' +
  '  branch_name: master\n' +
  '  git_site: gitee.com\n' +
  '\n' +
  'workflow:\n' +
  '  name: 建木-Git DSL导入测试测试3\n' +
  '  ref: git_ci_flow55\n' +
  '  description: Git DSL导入测试流程\n' +
  '  Start_1:\n' +
  '    type: start';
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
      <div class="controller">
        <img src="@/assets/official-h5/svgs/left.svg">
        <div class="controller-title">
          <img src="@/assets/official-h5/svgs/flowchart.svg">
          管道DSL
        </div>
        <img src="@/assets/official-h5/svgs/right.svg">
      </div>
      <!-- dsl展示 -->
      <div class="dsl-show">
        <jm-dsl-editor
          :value="workflow"
          readonly
        />
      </div>
    </div>
  </div>
  <!-- 流程可视化 -->
  <div class="official-common-container visualization">
    <div class="common-title">
      流程可视化
    </div>
    <div class="common-description">
      流程可视化提供流程与管道DSL代码的可视化展示，节点编排依赖与执行情况一目了然
    </div>
    <!-- 轮播图 -->
    <div class="visualization-swipper">
      <el-carousel
        indicator-position="outside"
        height="348px"
      >
        <el-carousel-item
          v-for="item in 5"
          :key="item"
        />
      </el-carousel>
    </div>
  </div>
  <!-- 示例-按钮 -->
  <div
    class="common-btn"
    @click="toExample"
  >
    示例
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
          class="node-img"
          :src="`${item.icon}?imageView2/2/w/96/h/96/interlace/1/q/100`"
        >
        <div class="node-title">{{ item.name }}</div>
      </a>
    </div>
  </div>
  <!-- 节点库-按钮 -->
  <div
    class="common-btn"
    @click="toNodeStore"
  >
    节点库
  </div>
</template>

<style scoped lang="less">
// 文档入口
.official-document-entry {
  width: 100%;
  padding: 54px 30px 0 30px;
  margin-bottom: 80px;
  .document-title {
    font-size: 48px;
    color: #012c53;
    font-weight: 500;
    margin-bottom: 46px;
  }
  .document-content {
    font-size: 30px;
    color: #042749;
    line-height: 48px;
    margin-bottom: 60px;
  }
  // 按钮公共样式
  .document-btn-common {
    width: 690px;
    height: 90px;
    display: block;
    font-size: 30px;
    font-weight: 600;
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
    border: 1px solid #0f2647;
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
    color: #012c53;
    font-weight: 500;
  }
  // 描述
  .common-description {
    font-size: 30px;
    color: #042749;
    margin: 40px 0 60px 0;
    line-height: 48px;
  }
  // 配置即代码
  .configure {
    background: url('@/assets/official-h5/svgs/configure.svg');
    padding: 0 30px;
    margin-bottom: 80px;
    // 控制器
    .controller {
      height: 94px;
      padding: 0 30px;
      border: 1px solid #a5b5c3;
      display: flex;
      justify-content: space-between;
      align-items: center;
      img {
        width: 32px;
        height: 33px;
      }
      .controller-title {
        display: flex;
        align-items: center;
        font-size: 30px;
        color: #042749;
        img {
          margin-right: 20px;
        }
      }
    }
    // dsl展示
    .dsl-show {
      width: 690px;
      height: 493px;
      background: #19253b;
      padding: 20px 16px;
      display: flex;
      font-size: 21px;
      line-height: 30px;
      ::v-deep(.CodeMirror .CodeMirror-linenumber) {
        color: #c1d7ff;
      }
      ::v-deep(.CodeMirror-gutter) {
        color: #c1d7ff;
        text-align: center;
        padding-right: 15px;
        margin-right: 20px;
        border-right: 1px solid #4a638f;
      }
    }
  }
}
// 流程可视化
.visualization {
  background: url('@/assets/official-h5/svgs/visualization.svg');
  padding: 0 30px;
  .common-title,
  .common-description {
    padding: 0;
  }
  .visualization-swipper {
    width: 690px;
    height: 348px;
    margin-bottom: 60px;
    .el-carousel__item:nth-of-type(1) {
      background: url('@/assets/carousel-imgs/1.png');
      background-size: 100%;
    }
    .el-carousel__item:nth-of-type(2) {
      background: url('@/assets/carousel-imgs/2.png');
      background-size: 100%;
    }
    .el-carousel__item:nth-of-type(3) {
      background: url('@/assets/carousel-imgs/3.png');
      background-size: 100%;
    }
    .el-carousel__item:nth-of-type(4) {
      background: url('@/assets/carousel-imgs/4.png');
      background-size: 100%;
    }
    .el-carousel__item:nth-of-type(5) {
      background: url('@/assets/carousel-imgs/5.png');
      background-size: 100%;
    }
  }
}
// 公共按钮样式
.common-btn {
  width: 690px;
  height: 94px;
  font-size: 30px;
  text-align: center;
  line-height: 94px;
  color: #fff;
  background: url('@/assets/official-h5/svgs/quick-start.svg');
  margin: 60px 0px 80px 30px;
}
// 节点生态
.node-ecology {
  background: url('@/assets/official-h5/svgs/node-ecology.svg');
  // 节点展示
  .node-show {
    height: 255px;
    margin-left: 60px;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    .node-container {
      width: 78px;
      height: 102px;
      margin: 0 30px 27px 0;
      display: block;
      .node-img {
        display: inline-block;
        width: 78px;
        height: 78px;
        border-radius: 20px;
        margin-bottom: 12px;
      }
      .node-title {
        font-size: 14px;
        color: #042749;
        height: 20px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
