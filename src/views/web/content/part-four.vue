<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from 'vue';
import { IPageVo } from '@/api/dto/common';
import { INodeDefinitionVo } from '@/api/dto/node-search';
import { START_PAGE_NUM } from '@/utils/rest/constants';
import { nodeSearch } from '@/api/node-search';
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
</script>
<template>
  <div class="part-four">
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
            <img :src="`${item.icon}?imageMogr2/thumbnail/123x/sharpen/1`" />
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
</template>
<style lang="less" scoped>
.part-four {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('@/assets/web/svgs/pr-4-bg.svg');
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
        width: 105px;
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
</style>
