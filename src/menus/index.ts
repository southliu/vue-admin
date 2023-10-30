import type { SideMenu } from '#/public';
import { DemoMenus } from './demo';

// 菜单
export const defaultMenus: SideMenu[] = [
  {
    label: '仪表盘',
    key: 'dashboard',
    icon: 'la:tachometer-alt',
    children: [
      {
        label: '数据总览',
        key: '/dashboard',
        rule: '/dashboard',
      }
    ]
  },
  ...DemoMenus,
];