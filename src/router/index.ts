import { createRouter, createWebHistory, RouteRecordRaw  } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    name: 'Home',
    path: '/',
    component: () => import('./'),
    meta: { title: '首页' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router