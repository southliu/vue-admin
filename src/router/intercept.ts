import type { Router } from "vue-router";
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useToken } from '@/hooks'
import { TITLE_SUFFIX } from '@/utils/config'
import { message } from "ant-design-vue";
import { useTabStore } from '@/stores/tabs'
import { useMenuStore } from '@/stores/menu'
import NProgress from 'nprogress'

NProgress.configure({ showSpinner: false })

/**
 * 路由拦截处理
 * @param router - 路由对象
 */
export function routerIntercept(router: Router) {
  const { setActiveKey, setPathName, addCacheRoutes } = useTabStore()
  const { setSelectedKeys } = useMenuStore()

    // 路由拦截
  router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    document.title = (to.meta?.title ? `${to.meta.title} - ` : '') + TITLE_SUFFIX
    const { getToken } = useToken()
    const token = getToken()
    NProgress.start()

    // 设置激活标签栏
    setActiveKey(to.path)
    // 设置菜单选择的key
    setSelectedKeys([to.path])
    // 设置路径名
    setPathName(to.name as string)

    // 缓存keepAlive
    if (to.meta?.keepAlive && to.name) {
      addCacheRoutes(to.name as string)
    }

    // 无token返回登录页
    if (!token && to.path !== '/login') {
      message.error({ content: '用户授权过期，请重新登录', key: 'not_token' })
      next({ path: `/login?redirect=${to.path}` })
    }

    // 有token且在登录页返回首页
    else if (token && to.path === '/login') {
      next({ path: '/dashboard' })
    }

    else next()
  })

  // 路由结束处理
  router.afterEach(() => {
    NProgress.done()
  })
}