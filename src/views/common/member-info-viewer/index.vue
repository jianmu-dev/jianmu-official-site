<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue';
const props = withDefaults(defineProps<{
  imgUrl:string,
  nickName:string,
  name:string,
  customizeClass?:string
}>(), { customizeClass: '' });
const toProfile = (username:string) => {
  window.open(`https://gitee.com/${username}`, '_blank');
};
</script>
<template>
  <div class="member-info-viewer">
    <div :class="['avatar',props.customizeClass ? props.customizeClass:'']" @click="toProfile(props.name)">
    <img :src="props.imgUrl" alt="">
    </div>
    <jm-text-viewer :value='props.nickname' class="name"/>
  </div>
</template>
<style lang="less" scoped>
.member-info-viewer{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .avatar{
    border-radius: 50%;
    overflow: hidden;
    img{
      width: 100%;
    }
  }
  .name{
    margin-top: 5px;
    width: 100%;
  }
  ::v-deep(.jm-text-viewer){
    .content{
      .text-line{
        text-align: center;
      }
    }
  }
}
</style>
