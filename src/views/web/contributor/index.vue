<script lang="ts" setup>
import MemberInfoViewer from '@/views/common/member-info-viewer/index.vue';
import { queryContributors } from '@/api/contributors';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { IContributorVo } from '@/api/dto/contributors';
import { ITeamVo } from '@/api/dto/teams';
import { queryTeams } from '@/api/teams';
import sleep from '@/utils/sleep';

const contributorCount = ref<number>(0);
const teamCount = ref<number>(0);
const currentIndex = ref<number>(1);
const tabClick = async (index: number) => {
  mainRef.value?.removeEventListener('scroll', handler);
  currentIndex.value = index;
  if (currentIndex.value === 1) {
    window.location.href = '#contributor';
  } else {
    window.location.href = '#team';
  }
  await sleep(100);
  mainRef.value?.addEventListener('scroll', handler);
};
// 贡献者,团队信息
const contributors = ref<IContributorVo[]>([]);
const teams = ref<ITeamVo[]>([]);
const contributeWrapperRef = ref<HTMLElement>();
const teamRef = ref<HTMLElement>();
const mainRef = ref<HTMLElement>();
const handler = () => {
  if (!teamRef.value) {
    return;
  }
  const { top, height } = teamRef.value.getBoundingClientRect();
  const radio = 157 / height;
  if (top <= radio * height) {
    currentIndex.value = 2;
  } else {
    currentIndex.value = 1;
  }
};
onMounted(() => {
  mainRef.value = contributeWrapperRef.value!.parentElement as HTMLElement;
  mainRef.value.addEventListener('scroll', handler);
});
onBeforeUnmount(() => {
  mainRef.value?.removeEventListener('scroll', handler);
});
onMounted(async () => {
  try {
    contributors.value = await queryContributors();
    contributorCount.value = contributors.value.length;
    teams.value = await queryTeams();
    teamCount.value = teams.value.length;
  } catch (err) {
    console.warn(err.message);
  }
});
</script>
<template>
  <div class="contribute" ref="contributeWrapperRef">
    <div class="top-card">
      <div class="left"></div>
      <div class="section">
        <div class="block">
          <h1 class="title">建木项目贡献者</h1>
          <div class="description">反馈问题，提交代码，和建木社区相互促进、共同成长。</div>
          <a href="https://gitee.com/jianmu-dev/governance#%E8%B4%A1%E7%8C%AE%E8%80%85" target="_blank">
            <div class="btn">成为贡献者</div>
          </a>
        </div>
      </div>
      <div class="right"></div>
    </div>
    <div class="tabs">
      <div class="tabs-wrapper">
        <div :class="['tab-item',currentIndex===1 ? 'active':'']" @click="tabClick(1)">贡献者・{{ contributorCount }}
        </div>
        <div :class="['tab-item',currentIndex===2 ? 'active':'']" @click="tabClick(2)">团队・{{ teamCount }}</div>
      </div>
    </div>
    <div class="contribute-content">
      <div class="contributor-pc">
        <div class="anchor" id="contributor"></div>
        <div class="part-title">贡献者</div>
        <div class="contributor-wrapper" v-if="contributors?.length>0">
          <div class="contributor-part">
            <div class="item" v-for="(item,index) in contributors" :key="index">
              <member-info-viewer
                customizeClass='contributor-item-viewer'
                :name="item.nickname"
                :img-url="item.avatarUrl"
              />
            </div>
          </div>
        </div>
        <div class="empty" v-else>
          <el-empty>
            <template #image>
              <img src="~@/assets/web/svgs/no-contributor.svg" alt="">
            </template>
            <template #description>
              暂无贡献者
            </template>
          </el-empty>
        </div>
      </div>
      <div class="team" ref="teamRef">
        <div class="anchor" id="team"></div>
        <div class="part-title">团队</div>
        <div class="team-part">
          <div class="team-wrapper" v-if="teams?.length>0">
            <div class="team-part-card" v-for="(item,index) in teams" :key="index">
              <div class="team-name">{{ item.name }}</div>
              <div class="team-desc">{{ item.purpose }}</div>
              <div class="team-member">
                <member-info-viewer
                  customizeClass='team-item-viewer'
                  v-for="(m,i) in item.contributors"
                  :key="i"
                  :name="m.nickname" :width="48" :img-url="m.avatarUrl"
                />
              </div>
            </div>
          </div>
          <div class="empty" v-else>
            <el-empty>
              <template #image>
                <img src="~@/assets/web/svgs/no-team.svg" alt="">
              </template>
              <template #description>
                暂无团队
              </template>
            </el-empty>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less">
.contribute {
  .empty {
    .el-empty {
      background-color: #F7F9FD;
      padding: 37px 0;
      margin: 0 3%;

      .el-empty__image {
        width: 98px;
        height: 98px;
      }

      .el-empty__description {
        margin-top: 5px;
        color: #8095A9;
        font-size: 14px;
        font-weight: 400;
      }
    }
  }

  margin-top: 64px;

  .top-card {
    display: flex;
    height: 300px;

    .left, .right {
      flex: 1;
      height: 100%;
      background-color: #edf7fe;
    }

    .section {
      width: 1300px;
      box-sizing: border-box;
      margin: 0 auto;
      background-image: url("@/assets/web/pngs/bg.png");
      background-repeat: no-repeat;

      .block {
        margin-left: 45px;

        .title {
          color: #012C53;
          font-size: 36px;
          font-weight: 600;
          margin-top: 64px;
        }

        .description {
          color: #385775;
          margin-top: 16px
        }

        .btn {
          cursor: pointer;
          border-radius: 4px;
          margin-top: 30px;
          background-color: #096DD9;
          color: #fff;
          width: 144px;
          height: 44px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: bold;

          a {
            text-decoration: none;
            color: #fff;
          }
        }
      }
    }
  }

  .tabs {
    position: sticky;
    top: 62px;
    background: rgba(255, 255, 255, 0.9);
    height: 64px;
    z-index: 2;
    border-bottom: 1px solid #E7ECF1;

    .tabs-wrapper {
      max-width: 1600px;
      box-sizing: border-box;
      margin: 0 auto;
      height: 100%;
      display: flex;
      align-items: center;

      .tab-item {
        font-weight: 400;
        color: #385775;
        background-color: #fff;
        padding: 4px 16px;
        border-radius: 15px;
        cursor: pointer;

        &.active {
          color: #096DD9;
          background-color: #EBF4FF;
        }

        &:first-child {
          margin-left: 3%;
        }

        &:last-child {
          margin-left: 40px;
        }
      }
    }
  }

  .contribute-content {
    .part-title {
      margin: 30px 0 20px 3%;
    }

    max-width: 1600px;
    margin: 0 auto 100px;

    .contributor-pc {
      position: relative;

      .anchor {
        position: absolute;
        top: -156px;
        left: 0;
        height: 156px;
        width: 100%;
        z-index: -1;
      }

      .contributor-part {
        max-width: 1600px;
        margin: 0 3%;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        padding: 1% 1% 20px 0;
        box-sizing: border-box;
        background-color: #F7F9FD;

        .item {
          .contributor-item-viewer {
            cursor: pointer;
            width: 64px;
            height: 64px;
          }

          .member-info-viewer {
            width: 90%;
          }

          flex-shrink: 0;
          width: 19%;
          min-width: 236px;
          height: 186px;
          margin: 0 0 1% 1%;
          background-color: #fff;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }

    .team {
      position: relative;

      .anchor {
        position: absolute;
        top: -156px;
        left: 0;
        opacity: 0;
        height: 156px;
        width: 100%;
        z-index: -1;
      }

      .team-part {
        max-width: 1600px;
        padding: 20px;
        box-sizing: border-box;
        background-color: #F7F9FD;
        margin: 0 3%;

        .empty {
          .el-empty {
            padding: 17px 0;
          }
        }

        .team-part-card {
          padding: 20px 20px 30px 20px;
          margin-bottom: 20px;

          &:last-child {
            margin-bottom: 0;
          }

          background-color: #fff;

          .team-name {
            color: #042749;
            font-weight: 500;
          }

          .team-desc {
            font-size: 14px;
            color: #8095A9;
            margin: 10px 0 0;

          }

          .team-member {
            display: flex;
            flex-wrap: wrap;

            .team-item-viewer {
              width: 48px;
              height: 48px;
              cursor: pointer;
            }

            .member-info-viewer {
              display: flex;
              flex-shrink: 0;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              width: 7.3333%;
              min-width: 48px;
              margin: 30px 1% 0 0;
            }
          }
        }
      }
    }
  }

  .load-more {
    width: 100px;
    margin: 30px auto 80px;
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #7B8C9C;

    .drop-down {
      width: 14px;
      height: 14px;
      margin-left: 5px;
      background-image: url("@/assets/web/svgs/drop-down.svg");
    }
  }
}
</style>
