import { App } from 'vue';

// 引入组件
import JmDslEditor from './dsl-editor/index.vue';
// vant样式
import 'vant/lib/index.css';
// 按需引入轮播图
// Lazyload图片懒加载
import { Swipe, SwipeItem, Lazyload, Image as VanImage } from 'vant';

export default {
  // app.use()触发install的调用
  install: (app: App) => {
    app.component(JmDslEditor.name, JmDslEditor);
    app.use(Swipe);
    app.use(SwipeItem);
    app.use(Lazyload);
    app.use(VanImage);
  },
};
