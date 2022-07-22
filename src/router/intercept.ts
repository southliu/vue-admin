import type { Router } from "vue-router"
import type { IMenuItem } from '@/stores/menu'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useToken } from '@/hooks/useToken'
import { TITLE_SUFFIX } from '@/utils/config'
import { message } from "ant-design-vue"
import { useTabStore } from '@/stores/tabs'
import { useMenuStore } from '@/stores/menu'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { getFirstMenu } from '@/utils/menus'
import NProgress from 'nprogress'
import { checkPermission } from "@/utils/permissions"

NProgress.configure({ showSpinner: false })

/**
 * 路由拦截处理
 * @param router - 路由对象
 */
export function routerIntercept(router: Router) {
  const userStore = useUserStore()
  const menuStore = useMenuStore()
  const tabStore = useTabStore()
  const { setSelectedKeys, setFirstMenu } = menuStore
  const { setActiveKey, setPathName, addCacheRoutes } = tabStore
  const { permissions } = storeToRefs(userStore)
  const { openKeys, menuList, firstMenu } = storeToRefs(menuStore)

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
    } else if (token && to.path === '/login') {
      // 有token且在登录页返回首页
      // 跳转第一个有效菜单
      let obj: IMenuItem = { key: '', path: '', top: '', topTitle: '', title: '' }
      if (firstMenu.value?.key) {
        obj = firstMenu.value
      } else {
        obj = getFirstMenu(menuList.value)
        setFirstMenu(obj)
      }
      const { key, path, title, top } = obj
      // 菜单展开，添加标签
      if (top) openKeys.value = [top]
      if (key) tabStore.addTabs({ key, path, title })
      next(path)
    } else if (to?.meta?.rule && permissions.value?.length > 0) {
      // 判断是否有权限
      const isRule = checkPermission((to.meta.rule) as string, permissions.value)
      if (isRule) {
        next()
      } else {
        // 没权限跳转403
        next('/403')
      }
    } else next()
  })

  // 路由结束处理
  router.afterEach(() => {
    NProgress.done()
  })
}