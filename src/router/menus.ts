import { RouteRecordRaw } from 'vue-router';

export const menus: RouteRecordRaw[] = [
  {
    name: 'Home',
    path: '/',
    component: () => import('../pages/home/index.vue'),
    meta: { title: '首页' }
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('../pages/login/index.vue'),
    meta: { title: '登录' }
  }
]