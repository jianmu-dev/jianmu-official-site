import { App } from 'vue';

// 引入组件
import JmDslEditor from './dsl-editor/index.vue';
import JmTextViewer from './text-viewer/index.vue';
// vant样式
import 'vant/lib/index.css';
// 按需引入轮播图
// Lazyload图片懒加载
import { Swipe, SwipeItem, Lazyload, Image as VanImage } from 'vant';
import {
  ElMessage,
  ElMessageBox,
  ElLoading,
} from 'element-plus';
export default {
  // app.use()触发install的调用
  install: (app: App) => {
    app.component(JmDslEditor.name, JmDslEditor);
    app.component(JmTextViewer.name, JmTextViewer);
    app.use(Swipe);
    app.use(SwipeItem);
    app.use(Lazyload);
    app.use(VanImage);
    // 全局注册变量
    app.config.globalProperties.$loading = ElLoading.service;
    app.config.globalProperties.$success = ElMessage.success;
    app.config.globalProperties.$warning = ElMessage.warning;
    app.config.globalProperties.$info = ElMessage.info;
    app.config.globalProperties.$error = ElMessage.error;
    app.config.globalProperties.$alert = ElMessageBox.alert;
    app.config.globalProperties.$confirm = ElMessageBox.confirm;
    app.config.globalProperties.$prompt = ElMessageBox.prompt;
  },
};
