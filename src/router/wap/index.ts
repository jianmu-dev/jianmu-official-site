import { createRouter, createWebHistory, Router, RouteLocationNormalizedLoaded } from 'vue-router';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/layout/wap/platform.vue'),
      children: [
        {
          path: '',
          name: 'index',
          component: () => import('@/views/wap/index.vue'),
        },
        {
          path: 'contributor',
          name: 'contributor',
          component: () => import('@/views/wap/contributor.vue'),
        },
        {
          path: 'team-detail',
          name: 'team-detail',
          component: () => import('@/views/wap/team-detail.vue'),
          props: ({
            query: { teamName },
          }: RouteLocationNormalizedLoaded) => ({ teamName }),
        },
      ],
    },
  ],
}) as Router;

export default router;
