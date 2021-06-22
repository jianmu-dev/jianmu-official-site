import { App } from 'vue';
import JmScrollbar from './scrollbar';
import JmDslEditor from './dsl-editor/index.vue';
import { ElCarousel, ElCarouselItem } from 'element-plus';
// 设置element-plus全局样式
import 'element-plus/lib/theme-chalk/index.css';

export default {
  // app.use()触发install的调用
  install: (app: App) => {
    app.component(JmScrollbar.name, JmScrollbar);
    app.component(JmDslEditor.name, JmDslEditor);

    // 按需加载
    app.use(ElCarousel);
    app.use(ElCarouselItem);
  },
};