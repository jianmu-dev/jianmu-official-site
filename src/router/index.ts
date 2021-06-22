import { createRouter, createWebHistory } from 'vue-router';

export const routes = [
  { path: '/', component: () => import('@/views/index.vue') },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});