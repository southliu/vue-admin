import type { IMenus } from './model'

// 系统管理
export const SystemMenus: IMenus[] = [
  {
    name: 'System',
    path: '/systems',
    meta: {
      title: '系统管理',
      icon: 'ion:settings-outline'
    },
    component: () => import('@/layouts/default.vue'),
    redirect: '/systems/user',
    children: [
      {
        name: 'SystemUser',
        path: '/systems/user',
        meta: {
          title: '用户管理',
          rule: '/authority/user',
          keepAlive: true
        },
        component: () => import('@/pages/systems/user/index.vue')
      },
      {
        name: 'SystemMenu',
        path: '/systems/menu',
        meta: {
          title: '菜单管理',
          rule: '/authority/menu',
          keepAlive: true
        },
        component: () => import('@/pages/systems/menu/index.vue')
      }
    ]
  },
]