import type { RouteRecordRaw } from 'vue-router'

/**
 * 获取缓存路由中的路由名
 * @param routes - 路由菜单
 */
export function getCacheRoutes (routes: RouteRecordRaw[]): string[] {
  const cacheNames: string[] = []
  return filterMenus(routes, cacheNames)
}

/**
 * 过滤菜单数据，只获取最底层菜单数据
 * @param menus - 菜单数据
 * @param result - 返回结果数据
 */
function filterMenus (menus: RouteRecordRaw[], result: string[]): string[] {
  for (let i = 0; i < menus.length; i++) {
    const item = menus[i];

    // 当前有子路由继续遍历
    if (hasChildren(item)) {
      filterMenus(item.children as RouteRecordRaw[], result)
    }

    // 当有缓存则添加数据
    keepAlive(item) && result.push(item.name as string)
  }
  return result
}

/**
 * 路由是否缓存
 * @param route
 */
 function keepAlive(route: RouteRecordRaw): boolean {
  return Boolean(route?.meta?.keepAlive)
}

/**
 * 是否有子路由
 * @param route
 */
 function hasChildren(route: RouteRecordRaw): boolean {
  return Boolean(route.children && route.children.length)
}