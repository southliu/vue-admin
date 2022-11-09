import type { ISideMenu } from '#/public'

// 系统管理
export const SystemMenus: ISideMenu[] = [
  {
    label: '系统管理',
    key: 'system',
    icon: 'ion:settings-outline',
    children: [
      {
        label: '用户管理',
        key: '/system/user',
        rule: '/authority/user'
      },
      {
        label: '菜单管理',
        key: '/system/menu',
        rule: '/authority/menu'
      },
    ]
  }
]