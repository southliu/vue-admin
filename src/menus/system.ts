import type { IMenus } from '../router/model'

// 系统管理
export const SystemMenus: IMenus[] = [
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
          rule: '/authority/user',
          keepAlive: true
        },
        component: () => import('@/pages/systems/user/SystemUser.vue')
      },
      // {
      //   name: 'SystemRole',
      //   path: '/system/role',
      //   meta: {
      //     title: '角色管理',
      //     keepAlive: true
      //   },
      //   component: () => import('@/pages/systems/role/index.vue')
      // },
      {
        name: 'SystemMenu',
        path: '/system/menu',
        meta: {
          title: '菜单管理',
          rule: '/authority/menu',
          keepAlive: true
        },
        component: () => import('@/pages/systems/menu/SystemMenu.vue')
      }
    ]
  },
]