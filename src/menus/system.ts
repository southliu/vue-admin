import type { IMenus } from './model'

// 系统管理
export const SystemMenus: IMenus[] = [
  {
    name: 'System',
    path: '/system',
    meta: {
      title: '系统管理',
      icon: 'ion:settings-outline'
    },
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
      },
      {
        name: 'SystemMenu',
        path: '/system/menu',
        meta: {
          title: '菜单管理',
          rule: '/authority/menu',
          keepAlive: true
        },
      }
    ]
  },
]