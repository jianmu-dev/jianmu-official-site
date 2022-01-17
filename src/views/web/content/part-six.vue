<template>
  <div class="part-six">
    <h1 class="title">产品特性</h1>
    <div class="part-six-content">
      <div class="feat-item">
        <div class="desc-img">
          <img src="~@/assets/web/svgs/pr-6-1-icon.svg" />
        </div>
        <div class="desc-content">
          <h3 class="heading">配置即代码</h3>
          <span class="desc">
            支持GitOps使用模型，可实现更快的部署和恢复并提高应用系统可靠性。
          </span>
        </div>
      </div>
      <div class="feat-item">
        <div class="desc-img">
          <img src="~@/assets/web/svgs/pr-6-2-icon.svg" />
        </div>
        <div class="desc-content">
          <h3 class="heading">环境隔离性</h3>
          <span class="desc">
            无需担心环境的不一致性，每个环境都在隔离的容器内运行，运行后自动销毁回收。
          </span>
        </div>
      </div>
      <div class="feat-item">
        <div class="desc-img">
          <img src="~@/assets/web/pngs/pr-6-3-icon.png" />
        </div>
        <div class="desc-content">
          <h3 class="heading">流程可视化</h3>
          <span class="desc">
            可清晰地看到流程的运转细节，让团队了解CI/CD流程在实际场景中将如何运作。
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.part-six {
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('@/assets/web/svgs/pr-6-bg.svg');
  background-size: 100%;
  background-repeat: no-repeat;
  height: 440px;
  .title {
    font-weight: 600;
    color: #042749;
    font-size: 32px;
  }
  .part-six-content {
    display: flex;
    margin-top: 60px;
    justify-content: center;
    .feat-item {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      &:nth-child(1) {
        margin-left: 30px;
        .desc-img {
          align-self: flex-start;
          width: 240px;
          img {
            width: 100%;
          }
        }
      }
      &:nth-child(2) {
        .desc-img {
          align-self: flex-start;
          width: 226px;
          img {
            width: 100%;
          }
        }
      }
      &:nth-child(3) {
        margin-right: 0px;
        .desc-img {
          align-self: flex-start;
          width: 195px;
          img {
            width: 100%;
          }
        }
      }
      margin-right: 150px;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #042749;

      .heading {
        margin: 40px 0px 16px;
        font-weight: 600;
        font-size: 20px;
      }
      .desc {
        margin-top: 16px;
        width: 260px;
        font-size: 16px;
        font-weight: 400;
        line-height: 30px;
      }
    }
  }
}
</style>
