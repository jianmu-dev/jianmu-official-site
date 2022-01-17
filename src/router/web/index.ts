import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router';
export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('@/views/web/main.vue') },
  ] as RouteRecordRaw[],
});
