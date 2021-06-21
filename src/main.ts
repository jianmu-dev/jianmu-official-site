import { createApp } from 'vue';
import App from './app.vue';
import router from './router';
// 设置element-plus全局样式
import 'element-plus/lib/theme-chalk/index.css';
// 设置全局样式
import './global.less';

const app = createApp(App);
// 设置路由器
app.use(router);

app.mount('#app');