import type { IMenus } from './model'
import { DemoMenus } from './demo'
import { SystemMenus } from './system'

// 菜单
export const menus: IMenus[] = [
  {
    name: 'Login',
    path: '/login',
    meta: {
      title: '登录',
      hidden: true
    },
  },
  {
    name: 'ErrorPages',
    path: '/404',
    redirect: '/404',
    meta: { hidden: true },
    children: [
      {
        name: 'EmptyPage',
        path: '/empty',
        meta: { title: '重定向' },
      },
      {
        name: 'NotFound',
        path: '/404',
        meta: {
          title: '404 Not Found',
          hidden: true
        },
      },
      {
        name: 'BadRequired',
        path: '/403',
        meta: {
          title: '403 Bad Required',
          hidden: true
        },
      }
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
    children: [
      {
        name: 'DashboardPage',
        path: '/dashboard',
        meta: {
          title: '数据总览',
          rule: '/dashboard',
          keepAlive: true
        },
      }
    ]
  },
  ...DemoMenus,
  ...SystemMenus,
  {
    path: '/:pathMatch(.*)',
    meta: {
      hidden: true
    },
    // 访问不存在页面重定向404
    redirect: '/404',
  },
]