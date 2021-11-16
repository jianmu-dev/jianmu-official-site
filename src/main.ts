import { createApp } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import App from './app.vue';
import router from './router';
import './global.less';
import { globalErrorHandler } from '@/utils/global-error-handler';
import component from '@/components';
// 安装百度统计
import './utils/baidu-tongji.ts';

const app = createApp(App);
// 全局注册组件
app.use(component);
// 注册路由
app.use(router);
// 注册全局异常处理方法
app.config.errorHandler = (err, instance, info) =>
  globalErrorHandler(err as Error, instance, info, router);
app.config.globalProperties.$throw = (
  err: Error,
  instance: ComponentPublicInstance | null,
) => globalErrorHandler(err, instance, null, router);
app.mount('#app');
