import type { RouteRecordRaw } from "vue-router"
import { createRouter, createWebHashHistory } from 'vue-router'
import { layoutRoutes } from './utils/helper'
import routes from '~pages'

// 自动生成路径转换为layout嵌套路径
const layouts = layoutRoutes(routes)

const newRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    component: () => import('../pages/login/index.vue')
  },
  {
    path: "/",
    component: () => import('../layouts/default.vue'),
    children: layouts
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: newRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export { router }