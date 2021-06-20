import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 设置全局样式
import './global.less'

const app = createApp(App)
// 设置路由器
app.use(router)

app.mount('#app')