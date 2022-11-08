import type { IMenus } from './model'

// 组件菜单
export const DemoMenus: IMenus[] = [
  {
    name: 'Demo',
    path: '/demo',
    meta: {
      title: '组件',
      icon: 'fluent:box-20-regular'
    },
    redirect: '/demo/copy',
    children: [
      {
        name: 'DemoCopy',
        path: '/demo/copy',
        meta: {
          title: '剪切板',
          rule: '/demo/copy',
          keepAlive: true
        },
      },
      {
        name: 'DemoWangEditor',
        path: '/demo/wangEditor',
        meta: {
          title: '富文本',
          rule: '/demo/user',
          keepAlive: true
        },
      },
      {
        name: 'DemoVirtualScroll',
        path: '/demo/virtualScroll',
        meta: {
          title: '虚拟滚动',
          rule: '/demo/virtualScroll',
          keepAlive: true
        },
      },
      {
        name: 'DemoWatermark',
        path: '/demo/watermark',
        meta: {
          title: '水印组件',
          rule: '/demo/watermark',
          keepAlive: true
        },
      },
    ]
  }
]