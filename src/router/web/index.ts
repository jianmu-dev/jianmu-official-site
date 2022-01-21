import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router';
export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/web/main.vue'),
      children: [
        {
          path: '',
          name: 'index',
          component: () => import('@/layout/web/platform.vue'),
        },
        {
          path: 'contributor',
          name: 'contributor',
          component: () => import('@/views/web/contributor/index.vue'),
        },
      ],
    },
  ] as RouteRecordRaw[],
});
