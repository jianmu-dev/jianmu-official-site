<template>
  <div class="part-five">
    <h1 class="title">平台中立</h1>
    <span class="desc">无平台倾向性，用户可根据需要自行选择。 </span>
    <div class="platform">
      <div class="platform-item">
        <div class="icon">
          <img src="~@/assets/svgs/github.svg"/>
        </div>
        <h1 class="name">Github</h1>
      </div>
      <div class="platform-item">
        <div class="icon">
          <img src="~@/assets/svgs/gitlab.svg"/>
        </div>
        <h1 class="name">Gitlab</h1>
      </div>
      <div class="platform-item">
        <div class="icon">
          <img src="~@/assets/svgs/gitee.svg"/>
        </div>
        <h1 class="name">Gitee</h1>
      </div>
      <div class="platform-item">
        <div class="icon">
          <img src="~@/assets/svgs/gitea.svg"/>
        </div>
        <h1 class="name">Gitea</h1>
      </div>
      <div class="platform-item">
        <div class="icon">
          <img src="~@/assets/svgs/bitbucket.svg"/>
        </div>
        <h1 class="name">Bitbucket</h1>
      </div>
      <div class="platform-item">
        <div class="icon">
          <img src="~@/assets/pngs/coding.png"/>
        </div>
        <h1 class="name">Coding</h1>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.part-five {
  color: #042749;
  margin: 95px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    font-size: 36px;
    font-weight: 600;
  }

  .desc {
    margin: 25px 0 55px;
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
</style>
