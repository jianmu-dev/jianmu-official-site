<template>
  <div class="part-three">
    <h1 class="title">流程可视化</h1>
    <span class="desc">流程配置可视化，任务编排与执行状态一目了然。</span>
    <el-carousel
      indicator-position="outside"
      arrow="never"
      pause-on-hover
      height="600px"
    >
      <el-carousel-item>
        <img src="~@/assets/pngs/1.png" />
      </el-carousel-item>
      <el-carousel-item>
        <img src="~@/assets/pngs/2.png" />
      </el-carousel-item>
      <el-carousel-item>
        <img src="~@/assets/pngs/3.png" />
      </el-carousel-item>
      <el-carousel-item>
        <img src="~@/assets/pngs/4.png" />
      </el-carousel-item>
    </el-carousel>
    <div class="shadow"></div>
  </div>
</template>
<style lang="less" scoped>
.part-three {
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  margin: 75px 60px 95px;
  color: #042749;
  .title {
    font-size: 32px;
    font-weight: 600;
  }
  .desc {
    margin: 25px 0 50px;
    font-size: 16px;
    font-weight: 400;
    line-height: 30px;
  }
  ::v-deep(.el-carousel) {
    width: 99%;
    .el-carousel__item {
      img {
        width: 100%;
        height: 590px;
      }
    }
    .el-carousel__indicators {
      .el-carousel__indicator {
        margin-top: 50px;
        &.is-active {
          .el-carousel__button {
            background-color: #042749;
            &:hover {
              opacity: 1;
            }
          }
        }
        .el-carousel__button {
          margin-right: 20px;
          &:hover {
            opacity: 1;
          }
          height: 6px;
          width: 40px;
          border-radius: 3px;
          background-color: #d6dadf;
        }
      }
    }
  }
  .shadow {
    position: absolute;
    top: 140px;
    left: 0.5%;
    box-shadow: 0px 0px 30px 0px #dce3ef;
    width: 99%;
    height: 610px;
  }
}
</style>
