import { createApp, ComponentPublicInstance } from 'vue';
import App from './app.vue';
// 引入路由
import router from '@/router/index';
// 全局注册公共组件
import components from './components';
// 引入全局样式
import './global.less';
// 引入全局异常处理函数
import { globalErrorHandler } from './utils/global-error-handler';
// 安装百度统计
import './utils/baidu-tongji.ts';

const app = createApp(App);
app.use(router);
app.use(components);

// 注册全局异常处理方法
app.config.errorHandler = (err, instance, info) =>
  globalErrorHandler(err as Error, instance, info, router);
app.config.globalProperties.$throw = (
  err: Error,
  instance: ComponentPublicInstance | null,
) => globalErrorHandler(err, instance, null, router);

app.mount('#app');
