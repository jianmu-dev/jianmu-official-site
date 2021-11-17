<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import NavTop from '@/views/nav/nav-top.vue';
import NavBottom from '@/views/nav/nav-bottom.vue';
import Description from '@/views/content/description.vue';
import ScrollContent from '@/views/content/scroll-content.vue';
import { minShowScrollHeight, canScrollHeight } from '@/utils/constants';
const height = ref<number>(10);
const offsetHeight = ref<number>(0);
const scrollContainerRef = ref<HTMLElement>();
// main 元素
const mainRef = ref<HTMLElement>();
// 卷轴最外层元素
const scrollRef = ref<HTMLElement>();
// 第一根卷轴
const scrollBarRef = ref<HTMLElement>();
// 第二根卷轴
const scrollBarBottomRef = ref<HTMLElement>();
const scrollTop = ref<number>(0);
const scrollInterval = ref<any>();
const preHeight = ref<number>(0);
const animateScroll = (height: number) => {
  if (scrollInterval.value) {
    clearInterval(scrollInterval.value);
    scrollInterval.value = undefined;
  }
  if (preHeight.value === 0) {
    preHeight.value = height;
  }

  if (height < preHeight.value) {
    if (preHeight.value - height > 50) {
      // 60为动画开始时的高度，大于50即可完全隐藏卷轴
      preHeight.value = height + 50;
    }
  } else if (height - preHeight.value > document.documentElement.clientHeight) {
    preHeight.value = height - document.documentElement.clientHeight;
  }

  let h: number = preHeight.value;
  scrollInterval.value = setInterval(() => {
    if (h === height) {
      clearInterval(scrollInterval.value);
      scrollInterval.value = undefined;
      return;
    }

    if (height >= preHeight.value) {
      h += 5;
      if (h > height) {
        h = height;
      }
    } else {
      h -= 1;
      if (h < height) {
        h = height;
      }
    }

    preHeight.value = h;
    scrollContainerRef.value!.style.height = h + 'px';
  }, 1);
};
// 处理卷轴上下滚动时动态调整显示内容高度
const scrollHeightHandler = () => {
  let h = 0;
  // 如果当前滚动高度小于上一次的滚动高度，向上滚动
  if ((mainRef.value?.scrollTop as number) < scrollTop.value) {
    if (
      mainRef.value!.clientHeight <= minShowScrollHeight
        ? mainRef.value!.scrollTop >
          canScrollHeight -
            height.value +
            (minShowScrollHeight - mainRef.value!.clientHeight)
        : mainRef.value!.scrollTop > canScrollHeight - height.value
    ) {
      h = canScrollHeight;
    } else {
      // 将main元素的滚动高度，复制一份
      scrollTop.value = mainRef.value?.scrollTop as number;
      // 高度小于693,(693 - mainRef.value!.clientHeight)为小屏时需要加上的偏移量
      if (mainRef.value!.clientHeight <= minShowScrollHeight) {
        h =
          height.value +
          scrollTop.value -
          (minShowScrollHeight - mainRef.value!.clientHeight);
        offsetHeight.value = height.value + scrollTop.value;
      } else {
        h = height.value + scrollTop.value;
        offsetHeight.value = height.value + scrollTop.value;
      }
    }
  } else {
    // 将main元素的滚动高度，复制一份
    scrollTop.value = mainRef.value?.scrollTop as number;
    // 向下滚动
    if (
      mainRef.value!.clientHeight <= minShowScrollHeight
        ? mainRef.value!.scrollTop >
          canScrollHeight -
            height.value +
            (minShowScrollHeight - mainRef.value!.clientHeight)
        : mainRef.value!.scrollTop > canScrollHeight - height.value
    ) {
      h = canScrollHeight;
    } else {
      // 卷轴的高度=初始高度+main的滚动偏移值
      if (mainRef.value!.clientHeight <= minShowScrollHeight) {
        h =
          height.value +
          scrollTop.value -
          (minShowScrollHeight - mainRef.value!.clientHeight);
        offsetHeight.value = height.value + scrollTop.value;
      } else {
        h = height.value + scrollTop.value;
        offsetHeight.value = height.value + scrollTop.value;
      }
    }
  }
  if (h < height.value) {
    h = height.value;
  }
  animateScroll(h);
};
const initScroll = (): void => {
  // 解决浏览器窗口缩放后，页面出现空白的问题
  mainRef.value?.scrollTo(0, 0);
  // 卷轴的初始高度
  height.value =
    document.documentElement.clientHeight -
    (scrollBarRef.value!.offsetTop - document.documentElement.scrollTop) -
    scrollBarRef.value!.clientHeight * 2;
  if (height.value < 10) {
    // 屏幕展示的区域小的时候，将卷轴饿高度设置为10，让其折叠
    height.value = 10;
  }
  scrollContainerRef.value!.style.height = `${height.value}px`;
};
onMounted(() => {
  mainRef.value?.addEventListener('scroll', scrollHeightHandler);
  // 监听window的缩放，重新调整卷轴的默认高度
  window.addEventListener('resize', initScroll);
  // 初始卷轴的默认初始显示高度
  initScroll();
});
onBeforeUnmount(() => {
  // 取消监听事件
  window.removeEventListener('resize', initScroll);
  mainRef.value?.removeEventListener('scroll', scrollHeightHandler);
});
</script>
<template>
  <div class="main" ref="mainRef">
    <nav-top />
    <div class="container">
      <div class="content-bg">
        <div class="content-wrapper">
          <description />
          <div class="scroll" ref="scrollRef">
            <div class="scroll-bar" ref="scrollBarRef">
              <img src="~@/assets/pngs/bar-top.png" />
            </div>
            <div class="scroll-container" ref="scrollContainerRef">
              <div class="scroll-wrapper">
                <scroll-content ref="scrollContentRef" />
              </div>
            </div>
            <div class="scroll-bar-bottom" ref="scrollBarBottomRef">
              <img src="~@/assets/pngs/bar-bottom.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav-bottom></nav-bottom>
  </div>
</template>
<style lang="less" scoped>
.main {
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  .container {
    .content-bg {
      margin-top: 70px;
      height: 5566px;
      background-repeat: no-repeat;
      background-position: center 90px;
      background-image: url('@/assets/pngs/main-bg-none.png');
      .content-wrapper {
        max-width: 1600px;
        margin: 0 auto;
        .scroll {
          margin-top: 150px;
          .scroll-bar,
          .scroll-bar-bottom {
            height: 30px;
            max-width: 99%;
            margin: 0 auto;
            img {
              height: 100%;
              width: 100%;
            }
          }
          .scroll-container {
            overflow: hidden;
            margin: -5px auto;
            position: relative;
            z-index: 11;
            .scroll-wrapper {
              max-width: 90%;
              background-color: #f2f4f7;
              margin: 0 auto;
              padding: 30px;
            }
          }
        }
      }
    }
  }
}
</style>
