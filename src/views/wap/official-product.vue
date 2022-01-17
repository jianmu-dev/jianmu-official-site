<script setup lang="ts">
// 参与贡献
const contribution = () => {
  window.location.href = 'https://gitee.com/jianmu-dev/jianmu-ci-server';
};
</script>

<template>
  <!-- 产品特性 -->
  <div class="product-characteristics">
    <!-- 标题 -->
    <div class="product-characteristics-title">
      产品特性
    </div>
    <!-- 产品公共部分 -->
    <div class="product-common-container">
      <img
        class="product-img"
        src="@/assets/wap/svgs/git-ops.svg"
      >
      <div class="product-title">
        配置即代码
      </div>
      <div class="product-description">
        支持GitOps使用模型，可实现更快的部署和恢复并提高应用系统可靠性。
      </div>
    </div>
    <div class="product-common-container">
      <img
        class="product-img"
        src="@/assets/wap/svgs/environment.svg"
      >
      <div class="product-title">
        环境隔离性
      </div>
      <div class="product-description">
        无需担心环境的不一致性，每个环境都在隔离的容器内运行，运行后自动销毁回收。
      </div>
    </div>
    <div class="product-common-container">
      <img
        class="product-img"
        src="@/assets/wap/svgs/technological-process.svg"
      >
      <div class="product-title">
        流程可视化
      </div>
      <div class="product-description">
        可清晰地看到流程的运转细节，让团队了解CI/CD流程在实际场景中将如何运作。
      </div>
    </div>
  </div>
  <!-- 参与贡献-按钮 -->
  <div
    class="common-btn"
    @click="contribution"
  >
    参与贡献
  </div>
  <!-- 所属社区 -->
  <div class="belonging-community-container">
    <div class="belonging-community-title">
      所属社区
    </div>
    <div class="community-img-container">
      <img
        src="@/assets/wap/pngs/belonging-community.png"
        class="community-img"
      >
    </div>
    <div class="community-description">
      “木兰开源社区”建立于2019年8月，是国家重点研发计划重点专项“云计算和大数据开源社区生态系统”的核心成果。旨在促进产学研用各方开源领域的交流，推动国家科技创新成果开源，加强企业、科教研单位和行业用户之间的沟通，推动开源成果转化落地，同时为各类开源项目提供中立托管，保证开源项目的持续发展不受第三方影响，通过更加开放的方式来打造和完善开源社区生态。
    </div>
  </div>
  <!-- 参与单位 -->
  <div class="participating-units-container">
    <div class="participating-units-title">
      合作伙伴
    </div>
    <!-- 参与单位图片 -->
    <div class="participating-units-imgs">
      <div>
        <img
          src="@/assets/wap/pngs/esi.png"
          class="cis-img"
        >
      </div>
      <div>
        <img
          src="@/assets/wap/pngs/cloud.png"
          class="cloud-img"
        >
        <img
          src="@/assets/wap/pngs/gitee.png"
          class="gitee-img"
        >
        <img
          src="@/assets/wap/pngs/shanyang.png"
          class="shanyang-img"
        >
      </div>
      <div>
        <img
          src="@/assets/wap/pngs/shs.png"
          class="shs-img"
        >
        <img
          src="@/assets/wap/pngs/ezsvs.png"
          class="ezsvs-img"
        >
      </div>
    </div>
  </div>
  <!-- 九州云描述 -->
  <div class="cloud-container">
    <div class="cloud-description">
      建木团队在“开源·赋能云边变⾰”的理想和共同⽬标指引下，重新对DevOps &
      OpsDev领域中共性、有价值的需求做了⼀次完整的梳理和重写，最终以“建⽊”开源项⽬的形态呈现。
    </div>
    <div class="cloud-img-container">
      <div class="single we-chat">
        <span class="cloud-title">微信公众号</span>
        <img src="@/assets/wap/pngs/we-chat.png">
      </div>
      <div class="single">
        <span class="cloud-title">建木交流QQ群</span>
        <img src="@/assets/wap/pngs/qq.png">
        <span class="qq-num">群号: 273649324</span>
      </div>
    </div>
    <!-- 链接 -->
    <div class="cloud-links">
      <div>项⽬官⽹：<a href="https://jianmu.dev">https://jianmu.dev</a></div>
      <div>
        项⽬托管：<a href="https://gitee.com/jianmu-dev">https://gitee.com/jianmu-dev</a>
      </div>
      <div>
        项⽬文档：<a href="https://docs.jianmu.dev">https://docs.jianmu.dev</a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
// 公共按钮样式
.common-btn {
  width: 690px;
  height: 94px;
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  line-height: 94px;
  color: #fff;
  background: #0f2647;
  border-radius: 10px;
  margin: 60px 0px 80px 30px;
}

// 产品特性
.product-characteristics {
  padding: 0px 30px;
  background: url('@/assets/wap/official-h5/svgs/product.svg');
  background-size: 100%;

  .product-characteristics-title {
    font-size: 36px;
    font-weight: 700;
  }

  // 产品公共样式
  .product-common-container {
    margin-top: 50px;

    .product-img {
      width: 150px;
      height: 85px;
    }

    .product-title {
      font-size: 30px;
      font-weight: 700;
      margin: 20px 0;
    }

    .product-description {
      font-size: 30px;
      line-height: 48px;
    }
  }
}

// 所属社区
.belonging-community-container {
  padding: 0 30px;
  margin-top: 30px;
  margin-bottom: 80px;

  .belonging-community-title {
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 50px;
  }

  .community-img-container {
    margin-bottom: 30px;
    display: flex;
    justify-content: center;

    .community-img {
      width: 248px;
      height: 86px;
    }
  }

  .community-description {
    font-size: 30px;
    line-height: 48px;
  }
}

// 参与单位
.participating-units-container {
  width: 750px;
  height: 468px;
  padding: 0 30px;
  background: url('@/assets/wap/official-h5/svgs/participating-units.svg');
  background-size: 100%;
  margin-bottom: 60px;

  .participating-units-title {
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 45px;
  }

  .participating-units-imgs {
    margin: 0 auto;

    div {
      display: flex;
      //justify-content: space-between;
      justify-content: center;
    }

    div:nth-of-type(2) {
      margin: 40px 0;
    }

    img {
      height: 90px;
    }

    .cis-img {
      width: 500px;
    }

    .cloud-img {
      width: 202px;
    }

    .gitee-img {
      width: 218px;
      margin: 0 43px 0 42px;
    }

    .shs-img {
      width: 276px;
      margin-right:48px;
    }

    .shanyang-img {
      width: 181px;
    }
    .ezsvs-img{
      width:181px;
    }
  }
}

// 九州云描述
.cloud-container {
  padding: 0 30px;
  margin-bottom: 68px;

  .cloud-description {
    font-size: 30px;
    line-height: 48px;
    margin-bottom: 60px;
  }

  .cloud-links {
    font-weight: 700;
    font-size: 30px;
    line-height: 48px;
  }

  .cloud-img-container {
    padding-bottom: 50px;
    display: flex;
    justify-content: center;

    .single {
      display: flex;
      flex-direction: column;
      align-items: center;

      .cloud-title {
        font-size: 28px;
        color: #042749;
        opacity: 0.5;
        line-height: 30px;
      }

      img {
        width: 240px;
        height: 240px;
      }

      .qq-num {
        font-size: 24px;
        line-height: 23px;
      }
    }

    .we-chat {
      margin-right: 46px;
    }
  }
}
</style>
