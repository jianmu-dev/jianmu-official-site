<script lang="ts" setup>
import { defineProps, onMounted, ref } from 'vue';
import { queryTeams } from '@/api/teams';
import { ITeamVo } from '@/api/dto/teams';
import MemberInfoViewer from '@/views/common/member-info-viewer/index.vue';
const props = defineProps<{teamName:string}>();
const teamsInfo = ref<ITeamVo>();
onMounted(async () => {
  try {
    const { data } = await queryTeams();
    teamsInfo.value = data.find(item => item.name === props.teamName);
  } catch (err) {
    console.warn(err.message);
  }
});
</script>
<template>
<div class="team-detail">
  <div class="detail-content">
    <div class="bg-card">
      <div class="team-name">{{teamsInfo?.name}}</div>
      <div class="team-desc">{{teamsInfo?.purpose}}</div>
    </div>
    <div class="contributor-wrapper">
      <div class="contributor-item" v-for="(item,index) in teamsInfo?.contributors" :key="index">
        <member-info-viewer customizeClass="team-item-viewer" :img-url="item.avatarUrl" :name="item.username"/>
      </div>
    </div>
  </div>
</div>
</template>

<style lang='less'>
.team-detail{
  width: 750px;
  min-height: calc(100vh - 88px);
  .detail-content{
    .bg-card{
      padding:40px 0 0 30px;
      background-image: url("@/assets/wap/pngs/bg-2.png");
      background-size: 100%;
      width: 690px;
      height: 230px;
      margin: 30px auto;
      .team-name{
        font-size: 30px;
        font-weight: 400;
        color: #012C53;
      }
      .team-desc{
        width: 385px;
        font-size: 24px;
        font-weight: 400;
        color: #385775;
      }
    }
    .contributor-wrapper{
      display: flex;
      padding: 0 30px;
      flex-wrap: wrap;
      .contributor-item{
        width: 210px;
        height: 190px;
        margin: 0 30px 30px 0;
        box-shadow: 0 5px 9px 0 rgba(204, 210, 218, 0.1);
        border-radius: 10px;
        border: 1px solid #EAEEF2;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .team-item-viewer{
          width: 72px;
          height: 72px;
        }
        .member-info-viewer{
          width: 90%;
        }
        //.avatar{
        //  width: 79px;
        //  height: 79px;
        //  overflow: hidden;
        //  border-radius: 50%;
        //  img{
        //    width: 100%;
        //  }
        //}
        //.name{
        //  font-size: 24px;
        //  font-weight: 400;
        //  color: #042749;
        //  margin-top: 3px;
        //}
        &:nth-child(3n){
          margin-right: 0;
        }
      }
    }
  }
}
</style>
