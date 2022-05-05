import type { IMenus } from '../router/model'

// 如果Layout是以import Layout from '@/layouts/index.vue'形式引入,打包会报错

// 组件菜单
const ComponentMenus: IMenus[] = [
  {
    name: 'Component',
    path: '/components',
    meta: {
      title: '组件',
      icon: 'fluent:box-20-regular'
    },
    component: () => import('@/layouts/index.vue'),
    redirect: '/system/user',
    children: [
      {
        name: 'ComponentCopy',
        path: '/components/copy',
        meta: {
          title: '剪切板',
          keepAlive: true
        },
        component: () => import('@/pages/demo/copy/index.vue')
      },
      {
        name: 'ComponentTinymce',
        path: '/components/tinymce',
        meta: {
          title: '富文本',
          keepAlive: true
        },
        component: () => import('@/pages/demo/tinymce/index.vue')
      },
      {
        name: 'ComponentUpload',
        path: '/components/upload',
        meta: {
          title: '上传',
          keepAlive: true
        },
        component: () => import('@/pages/demo/upload/index.vue')
      },
      {
        name: 'ComponentVirtualScroll',
        path: '/components/virtualScroll',
        meta: {
          title: '虚拟滚动',
          keepAlive: true
        },
        component: () => import('@/pages/demo/virtualScroll/index.vue')
      },
      {
        name: 'ComponentWatermark',
        path: '/components/watermark',
        meta: {
          title: '水印组件',
          keepAlive: true
        },
        component: () => import('@/pages/demo/watermark/index.vue')
      },
    ]
  }
]

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

// 菜单
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
      {
        name: 'NotFound',
        path: '/404',
        meta: {
          title: '404 Not Found',
          isHidden: true
        },
        component: () => import('@/pages/errors/404.vue')
      },
    ]
  },
  ...ComponentMenus,
  ...SystemMenus,
  {
    path: '/:pathMatch(.*)',
    meta: {
      isHidden: true
    },
    // 访问不存在页面重定向404
    redirect: '/404',
  },
]