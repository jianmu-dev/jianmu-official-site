<script lang="ts" setup>
import officialTop from './official-top.vue';
import MemberInfoViewer from '@/views/common/member-info-viewer/index.vue';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { IContributorVo } from '@/api/dto/contributors';
import { ITeamVo } from '@/api/dto/teams';
import { queryContributors } from '@/api/contributors';
import { queryTeams } from '@/api/teams';

const currentIndex = ref<number>(1);
const tabClick = (index: number) => {
  window.document.removeEventListener('scroll', handler);
  currentIndex.value = index;
  if (currentIndex.value === 1) {
    window.location.href = '#contributor';
  } else {
    window.location.href = '#team';
  }
  window.document.addEventListener('scroll', handler);
};
const teamRef = ref<HTMLElement>();
// 贡献者,团队信息
const contributors = ref<IContributorVo[]>();
const teams = ref<ITeamVo[]>();
const handler = () => {
  if (!teamRef.value) {
    return;
  }
  const { top } = teamRef.value.getBoundingClientRect();
  const capRatio = 56 / 375;
  if (top <= capRatio * window.screen.width) {
    currentIndex.value = 2;
  } else {
    currentIndex.value = 1;
  }
};
onMounted(() => {
  window.document.addEventListener('scroll', handler);
});
onMounted(async () => {
  try {
    const { data } = await queryContributors();
    contributors.value = data;
    const { data: res } = await queryTeams();
    teams.value = res;
  } catch (err) {
    console.warn(err.message);
  }
});
onBeforeUnmount(() => {
  window.document.removeEventListener('scroll', handler);
});
</script>
<template>
  <official-top/>
  <div class="contributor">
    <div class="bg-card">
    </div>
    <a href="https://gitee.com/jianmu-dev/governance#%E8%B4%A1%E7%8C%AE%E8%80%85"
       target="_blank">
      <div class="btn">
        成为贡献者
      </div>
    </a>
    <div class="tabs">
      <div :class="['item',currentIndex===1?'active':'']" @click="tabClick(1)">贡献者</div>
      <div :class="['item',currentIndex===2?'active':'']" @click="tabClick(2)">团队</div>
    </div>
    <div class="split-line"></div>
    <div class="part">
      <div class="anchor" id="contributor"></div>
      <div class="title">贡献者</div>
      <div class="contributor-wrapper">
        <div class="contributor-container" v-if="contributors?.length>0">
          <div class="contributor-item" v-for="(item,index) in contributors" :key="index">
            <member-info-viewer customizeClass="contributor-item-viewer" :img-url="item.avatarUrl" :name="item.username"/>
          </div>
        </div>
        <div class="empty" v-else>
          <el-empty>
            <template #image>
              <img src="~@/assets/wap/svgs/no-contributor.svg" alt="">
            </template>
            <template #description>
              暂无贡献者
            </template>
          </el-empty>
        </div>
      </div>
    </div>
    <div class="split-line">
    </div>
    <div class="part" ref="teamRef">
      <div class="anchor" id="team"></div>
      <div class="title">团队</div>
      <div class="team-wrapper">
        <div class="team-container" v-if="teams?.length>0">
          <div class="team-card" v-for="(item,index) in teams" :key="index">
            <div class="team-name">{{ item.name }}</div>
            <div class="team-desc">{{ item.purpose }}</div>
            <div class="team-members">
              <div class="team-member" v-for="(m,i) in item.contributors.slice(0,5)" :key="i">
                <member-info-viewer customizeClass="team-item-viewer" :img-url="m.avatarUrl" :name="m.username"/>
              </div>
              <router-link :to="{name:'team-detail',query:{teamName:item.name}}" v-if="item.contributors.length>=5">
                <div class="more-btn">
                  <div class="circle">
                    <div class="more-icon"></div>
                  </div>
                  <div class="name">更多</div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
        <div class="empty" v-else>
          <el-empty>
            <template #image>
              <img src="~@/assets/wap/svgs/no-team.svg" alt="">
            </template>
            <template #description>
              暂无团队
            </template>
          </el-empty>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less">
.contributor {
  width: 750px;
  .empty{
    .el-empty{
      padding: 0;
      .el-empty__image{
        width: 72px;
        height: 72px;
      }
      .el-empty__description{
        margin-top: 5px;
        color: #8095A9;
        font-size: 24px;
        font-weight: 400;
      }
    }
  }
  .bg-card {
    background-image: url("@/assets/wap/pngs/bg-1.png");
    background-size: 100%;
    width: 690px;
    height: 260px;
    margin: 30px auto 40px;
  }
  a {
    text-decoration: none;
  }
  .btn {
    width: 690px;
    height: 94px;
    margin: 0 auto;
    background-color: #096DD9;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 30px;
    font-weight: 600;
  }

  .tabs {
    position: sticky;
    top: 0;
    background-color: #fff;
    z-index: 2;
    padding: 0 30px;
    height: 110px;
    display: flex;
    align-items: center;

    .item {
      font-size: 36px;
      font-weight: 600;
      color: #7B8C9C;
      position: relative;

      &.active {
        color: #096DD9;

        &::after {
          position: absolute;
          top: 75px;
          left: 50%;
          transform: translateX(-50%);
          content: '';
          width: 50%;
          height: 5px;
          background-color: #096DD9;
          border-radius: 3px;
        }
      }

      &:nth-child(2) {
        margin-left: 60px;
      }
    }
  }

  .split-line {
    height: 22px;
    width: 100%;
    background-color: #F7F9FD;
  }

  .part {
    padding-top: 22px;
    background-color: #fff;
    position: relative;
    //margin-bottom: 60px;

    .anchor {
      position: absolute;
      top: -110px;
      left: 0;
      opacity: 0;
      height: 110px;
      width: 100%;
      z-index: -1;
    }

    .title {
      padding: 0 30px;
      font-size: 30px;
      font-weight: 500;
      color: #385775;
    }

    .contributor-wrapper {
      padding: 30px 30px 40px;
      .contributor-container{
        display: flex;
        flex-wrap: wrap;
        .contributor-item {
          width: 210px;
          height: 190px;
          box-sizing: border-box;
          margin: 0 30px 30px 0;
          box-shadow: 0px 5px 9px 0px rgba(204, 210, 218, 0.1);
          border-radius: 10px;
          border: 1px solid #EAEEF2;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          .contributor-item-viewer {
            width: 79px;
            height: 79px;
          }

          .member-info-viewer {
            width: 90%;
          }

          &:nth-child(3n) {
            margin-right: 0;
          }
        }
      }
    }
    .team-wrapper{
      padding: 30px 30px 40px;
    }

    .team-card {
      width: 690px;
      margin: 30px auto 0;
      padding: 20px;
      border: 1px solid #EAEEF2;

      .team-name {
        font-size: 30px;
        font-weight: 400;
        color: #042749;
      }

      .team-desc {
        font-weight: 400;
        color: #8095A9;
        font-size: 24px;
        margin: 10px auto 30px;
      }

      .team-members {
        display: flex;
        align-items: center;
        a{
          text-decoration: none;
        }
        .team-member {
          min-width: 116px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          .team-item-viewer {
            width: 72px;
            height: 72px;
          }

          .member-info-viewer {
            width: 90%;
          }
        }

        .more-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          .circle {
            flex-shrink: 0;
            width: 72px;
            height: 72px;
            background-color: #EBF4FF;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;

            .more-icon {
              width: 32px;
              height: 32px;
              background-image: url("@/assets/wap/svgs/ellipisis.svg");
              background-size: 100%;
            }
          }

          .name {
            font-size: 24px;
            font-weight: 400;
            color: #8095A9;
            margin-top: 3px;
          }
        }
      }
    }
  }
}
</style>
