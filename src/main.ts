import { createApp } from 'vue';
import App from './app.vue';
import components from './components';
import router from './router';
// 设置全局样式
import './global.less';
// 安装百度统计
import './utils/baidu-tongji.js';

const app = createApp(App);
// 全局注册公共组件
app.use(components);
// 注册路由器
app.use(router);

app.mount('#app');