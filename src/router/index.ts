import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHashHistory } from 'vue-router';
import { layoutRoutes } from './utils/helper';

// 自动生成路径转换为layout嵌套路径
const layouts = layoutRoutes();

const newRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: 'Login',
    component: () => import('../pages/login/index.vue')
  },
  {
    path: "/",
    component: () => import('../layouts/default.vue'),
    children: layouts
  },
  {
    path: "/:pathMatch(.*)*",
    name: 'NotFound',
    component: () => import('../pages/404.vue')
  },
  {
    path: "/403",
    name: 'NoPermission',
    component: () => import('../pages/403.vue')
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: newRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export { router };