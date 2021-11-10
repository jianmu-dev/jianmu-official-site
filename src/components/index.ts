import { App } from 'vue';

// 引入组件
import JmDslEditor from './dsl-editor/index.vue';
import JmScrollbar from './scrollbar';

import { ElButton, ElCarousel, ElCarouselItem } from 'element-plus';
import 'dayjs/locale/zh-cn';
// 设置element-plus自定义主题色样式
import './theme/custom-element-plus/index.scss';

export default {
  // app.use()触发install的调用
  install: (app: App) => {
    app.component(JmScrollbar.name, JmScrollbar);
    app.component(JmDslEditor.name, JmDslEditor);
    // 按需加载
    app.use(ElButton);
    app.use(ElCarousel);
    app.use(ElCarouselItem);
  },
};
