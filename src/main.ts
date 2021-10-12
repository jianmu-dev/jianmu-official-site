import { createApp, ComponentPublicInstance } from 'vue';
import App from './app.vue';
import components from './components';
import router from './router';
// 设置全局样式
import './global.less';
// 安装百度统计
import './utils/baidu-tongji.js';
import { globalErrorHandler } from './utils/global-error-handler';

const app = createApp(App);
// 全局注册公共组件
app.use(components);
// 注册路由器
app.use(router);

// 注册全局异常处理方法
app.config.errorHandler = (err, instance, info) =>
  globalErrorHandler(err as Error, instance, info, router);
app.config.globalProperties.$throw = (
  err: Error,
  instance: ComponentPublicInstance | null,
) => globalErrorHandler(err, instance, null, router);

app.mount('#app');
