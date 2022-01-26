import { RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue'

export const menus: RouteRecordRaw[] = [
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
    redirect: '/system/user',
    meta: { isHidden: true },
    component: () => Layout,
    children: [
      {
        name: 'Dashboard',
        path: '/dashboard',
        meta: { title: '首页' },
        component: () => import('@/pages/dashboard/index.vue')
      }
    ]
  },
  {
    name: 'System',
    path: '/system',
    meta: {
      title: '系统管理',
      iconfont: 'icon-system'
    },
    component: () => Layout,
    redirect: '/system/user',
    children: [
      {
        name: 'SystemUser',
        path: '/system/user',
        meta: {
          title: '用户管理',
          iconfont: 'icon-yonghuguanli'
        },
        component: () => import('@/pages/system/user.vue')
      },
      {
        name: 'SystemRole',
        path: '/system/role',
        meta: {
          title: '角色管理',
          iconfont: 'icon-jiaoseguanli'
        },
        component: () => import('@/pages/system/role.vue')
      },
    ]
  }
]
