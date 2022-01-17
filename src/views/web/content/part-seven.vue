<template>
  <div class="part-seven">
    <h1 class="title">所属社区</h1>
    <div class="part-seven-content">
      <div class="left">
        <img src="~@/assets/web/pngs/pr-7-1.png"/>
      </div>
      <div class="right">
        “木兰开源社区”建立于2019年8月，是国家重点研发计划重点专项“云计算和大数据开源社区生态系统”的核心成果。旨在促进产学研用各方开源领域的交流，推动国家科技创新成果开源，加强企业、科教研单位和行业用户之间的沟通，推动开源成果转化落地，同时为各类开源项目提供中立托管，保证开源项目的持续发展不受第三方影响，通过更加开放的方式来打造和完善开源社区生态。
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.part-seven {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #042749;
  margin-top: 100px;
  padding-bottom: 55px;
  border-bottom: 1px solid #DFE7EE;

  .title {
    height: 32px;
    font-weight: 600;
    color: #042749;
  }

  .part-seven-content {
    margin-top: 40px;
    display: flex;

    .left {
      margin-top: 10px;
      width: 206px;

      img {
        width: 100%;
      }
    }

    .right {
      margin-left: 45px;
      width: 571px;
      font-weight: 400;
      color: #042749;
      line-height: 30px;
    }
  }
}
</style>
