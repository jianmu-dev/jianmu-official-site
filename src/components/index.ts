import { App } from 'vue';
import { ElCarousel, ElCarouselItem } from 'element-plus';
// 设置element-plus全局样式
import 'element-plus/lib/theme-chalk/index.css';

export default {
  // app.use()触发install的调用
  install: (app: App) => {
    // 按需加载
    app.use(ElCarousel);
    app.use(ElCarouselItem);
  },
};