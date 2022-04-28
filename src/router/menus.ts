import type { IMenus } from './model'

// 如果Layout是以import Layout from '@/layouts/index.vue'形式引入,打包会报错

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
    name: 'Layout',
    path: '/',
    redirect: '/dashboard',
    meta: { isHidden: true },
    component: () => import('@/layouts/index.vue'),
    children: [
      {
        name: 'Dashboard',
        path: '/dashboard',
        meta: { title: '首页' },
        component: () => import('@/pages/dashboard/index.vue')
      },
      {
        name: 'empty',
        path: '/empty',
        meta: { title: '重定向' },
        component: () => import('@/pages/errors/empty.vue')
      },
    ]
  },
  {
    name: 'System',
    path: '/system',
    meta: {
      title: '系统管理',
      icon: 'ion:settings-outline'
    },
    component: () => import('@/layouts/index.vue'),
    redirect: '/system/user',
    children: [
      {
        name: 'SystemUser',
        path: '/system/user',
        meta: {
          title: '用户管理',
          keepAlive: true
        },
        component: () => import('@/pages/systems/user/index.vue')
      },
      {
        name: 'SystemRole',
        path: '/system/role',
        meta: {
          title: '角色管理',
          keepAlive: true
        },
        component: () => import('@/pages/systems/role/index.vue')
      },
      // {
      //   name: 'SystemMenu',
      //   path: '/system/menu',
      //   meta: {
      //     title: '菜单管理',
      //     keepAlive: true
      //   },
      //   component: () => import('@/pages/systems/menu/index.vue')
      // }
    ]
  },
]
