import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized
} from 'vue-router'
import { menus } from './menus'
import { useToken } from '@/hooks'
import NProgress from 'nprogress'

const router = createRouter({
  history: createWebHistory(),
  routes: menus,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

// 路由拦截
router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  document.title = (to.meta.title as string) || '后台管理'
  const { getToken } = useToken()
  const token = getToken()
  NProgress.start()

  // 无token返回登录页
  if (!token && to.path !== '/login') next({ path: `/login?redirect=${to.path}` })

  // 有token情况返回首页
  else if (token && to.path === '/login') next({ path: '/system/user' })

  else next()
})

// 路由结束处理
router.afterEach(() => {
  NProgress.done()
})

export { router }