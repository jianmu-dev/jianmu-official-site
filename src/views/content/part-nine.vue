<template>
  <div class="part-nine">
    <div class="left">
      <div class="qrcode">
        <span class="wechat title">微信公众号</span>
        <img src="~@/assets/pngs/jm.png" />
      </div>
      <div class="qrcode qq">
        <span class="qq title">建木交流QQ群</span>
        <img src="~@/assets/pngs/qq.png" />
        <span class="qq-number">群号: 273549324</span>
      </div>
    </div>
    <div class="right">
      <div class="top">
        九州云在“开源·赋能云边变⾰”的理想和共同⽬标指引下，重新对DevOps &
        OpsDev领域中共性、有价值的需求做了⼀次完整的梳理和重写，最终以“建⽊”开源项⽬的形态呈现。
      </div>
      <div class="bottom">
        <div class="item">
          <span>项⽬官⽹：</span
          ><a href="https://jianmu.dev">https://jianmu.dev</a>
        </div>
        <div class="item">
          <span>项⽬托管：</span
          ><a href="https://gitee.com/jianmu-dev"
            >https://gitee.com/jianmu-dev</a
          >
        </div>
        <div class="item">
          <span>项⽬文档：</span
          ><a href="https://docs.jianmu.dev">https://docs.jianmu.dev</a>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.part-nine {
  padding: 50px 0;
  display: flex;
  justify-content: center;
  background: #f6fafe;
  color: #042749;
  font-size: 14px;
  .left {
    display: flex;
    align-items: flex-start;
    .qrcode {
      font-size: 14px;
      color: #042749;
      width: 124px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .title {
        text-align: center;
        opacity: 0.5;
      }
      img {
        width: 100%;
      }
      &.qq {
        margin-left: 25px;

        .qq-number {
          text-align: center;
          font-size: 12px;
          display: inline-block;
          font-weight: 400;
        }
      }
    }
  }
  .right {
    margin-left: 20px;
    font-weight: 400;
    line-height: 24px;
    color: #042749;
    .top {
      width: 375px;
      margin-bottom: 10px;
    }
    .bottom {
      padding-top: 10px;
      border-top: 1px solid #dfe7ee;
      font-weight: 800;
      a {
        color: #042749;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
