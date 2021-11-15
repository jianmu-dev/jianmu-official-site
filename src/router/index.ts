import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router';
export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: import('@/views/main.vue') },
  ] as RouteRecordRaw[],
});
