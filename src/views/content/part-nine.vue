<template>
  <div class="part-nine">
    <div class="left">
      <div class="qrcode">
        <img src="~@/assets/pngs/qr-code-big.png" />
      </div>
    </div>
    <div class="right">
      <div class="top">
        九州云在“开源·赋能云边变⾰”的理想和共同⽬标指引下，重新对DevOps &
        OpsDev领域中共性、有价值的需求做了⼀次完整的梳理和重写，最终以“建⽊”开源项⽬的形态呈现。
      </div>
      <div class="bottom">
        <span>项⽬官⽹：</span
        ><a href="https://jianmu.dev">https://jianmu.dev</a>
        <br />
        <span>项⽬托管：</span
        ><a href="https://gitee.com/jianmu-dev">https://gitee.com/jianmu-dev</a>
        <span>项⽬文档：</span
        ><a href="https://docs.jianmu.dev">https://docs.jianmu.dev</a>
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
    flex-direction: column;
    align-items: center;
    .qrcode {
      width: 158px;
      img {
        width: 100%;
      }
    }
  }
  .right {
    margin-left: 20px;
    font-weight: 400;
    line-height: 24px;
    .top {
      width: 375px;
    }
    .bottom {
      margin-top: 16px;
      width: 280px;
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
