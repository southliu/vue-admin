import type { ISideMenu } from '#/public'

// 组件菜单
export const ContentMenus: ISideMenu[] = [
  {
    label: '内容管理',
    key: 'content',
    icon: 'majesticons:article-search-line',
    children: [
      
      {
        label: '文章管理',
        key: '/content/article',
        rule: '/content/article',
      },
    ]
  }
]