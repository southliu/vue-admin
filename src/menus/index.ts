import type { IMenus } from '../router/model'
import { DemoMenus } from './demo'
import { SystemMenus } from './system'

// 如果Layout是以import Layout from '@/layouts/index.vue'形式引入,打包会报错

// 菜单
export const menus: IMenus[] = [
  {
    name: 'Login',
    path: '/login',
    meta: {
      title: '登录',
      isHidden: true
    },
    component: () => import('@/pages/login/index.vue')
  },
  {
    name: 'ErrorPages',
    path: '/',
    redirect: '/404',
    meta: { isHidden: true },
    component: () => import('@/layouts/index.vue'),
    children: [
      {
        name: 'empty',
        path: '/empty',
        meta: { title: '重定向' },
        component: () => import('@/pages/errors/empty.vue')
      },
      {
        name: 'NotFound',
        path: '/404',
        meta: {
          title: '404 Not Found',
          isHidden: true
        },
        component: () => import('@/pages/errors/404.vue')
      },
    ]
  },
  {
    name: 'Layout',
    path: '/',
    redirect: '/dashboard',
    meta: {
      title: '仪表盘',
      icon: 'la:tachometer-alt'
    },
    component: () => import('@/layouts/index.vue'),
    children: [
      {
        name: 'Dashboard',
        path: '/dashboard',
        meta: {
          title: '数据总览',
          keepAlive: true
        },
        component: () => import('@/pages/dashboard/index.vue')
      }
    ]
  },
  ...DemoMenus,
  ...SystemMenus,
  {
    path: '/:pathMatch(.*)',
    meta: {
      isHidden: true
    },
    // 访问不存在页面重定向404
    redirect: '/404',
  },
]