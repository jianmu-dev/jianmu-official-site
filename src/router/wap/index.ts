import { createRouter, createWebHistory, Router } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '',
      name: 'index',
      component: () => import('@/views/wap/index.vue'),
    },
  ],
}) as Router;

export default router;
