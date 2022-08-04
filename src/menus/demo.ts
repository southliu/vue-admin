import type { IMenus } from '../router/model'

// 组件菜单
export const DemoMenus: IMenus[] = [
  {
    name: 'Demo',
    path: '/demo',
    meta: {
      title: '组件',
      icon: 'fluent:box-20-regular'
    },
    component: () => import('@/layouts/index.vue'),
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
        component: () => import('@/pages/demo/copy/index.vue')
      },
      {
        name: 'DemoWangEditor',
        path: '/demo/wangEditor',
        meta: {
          title: '富文本',
          rule: '/demo/user',
          keepAlive: true
        },
        component: () => import('@/pages/demo/wangEditor/index.vue')
      },
      {
        name: 'DemoVirtualScroll',
        path: '/demo/virtualScroll',
        meta: {
          title: '虚拟滚动',
          rule: '/demo/virtualScroll',
          keepAlive: true
        },
        component: () => import('@/pages/demo/virtualScroll/index.vue')
      },
      {
        name: 'DemoWatermark',
        path: '/demo/watermark',
        meta: {
          title: '水印组件',
          rule: '/demo/watermark',
          keepAlive: true
        },
        component: () => import('@/pages/demo/watermark/index.vue')
      },
    ]
  }
]