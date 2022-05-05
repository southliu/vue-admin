import type { IMenus } from '@/router/model';
import type { ISidebar } from '@/stores/menu';
import type { RouteRecordRaw } from 'vue-router'

/**
 * 获取菜单数据，只获取最底层菜单数据
 * @param menus - 菜单数据
 * @param result - 返回结果数据
 */
export function getMenus(menus: IMenus[], result: ISidebar[] = []): ISidebar[] {
  for (let i = 0; i < menus.length; i++) {
    const item = menus[i];
  
    // 隐藏菜单跳过循环
    if (hasHidden(item)) continue

    // 当前有子路由继续遍历
    const children = hasChildren(item) ? getMenus(item.children as IMenus[], []) : undefined

    // 当有缓存则添加数据
    result.push({
      key: item.path,
      title: item?.meta?.title || '',
      icon: item?.meta?.icon,
      children
    })
  }
  return result
}

/**
 * 过滤菜单返回一维数组
 * @param menus - 菜单数据
 * @param result - 返回结果数据
 */
export function menusToArray(menus: IMenus[], result: ISidebar[] = []): ISidebar[] {
  for (let i = 0; i < menus.length; i++) {
    const item = menus[i];
  
    // 隐藏菜单跳过循环
    if (hasHidden(item)) continue

    // 当前有子路由继续遍历
    const children = hasChildren(item) ? menusToArray(item.children as IMenus[], result) : undefined

    // 当有缓存则添加数据
    !hasChildren(item) && result.push({
      key: item.path,
      title: item?.meta?.title || '',
      icon: item?.meta?.icon,
      children
    })
  }
  return result
}

/**
 * 获取缓存路由中的路由名，只获取最底层菜单数据
 * @param menus - 菜单数据
 * @param result - 返回结果数据
 */
export function getCacheRoutes(menus: RouteRecordRaw[], result: string[] = []): string[] {
  for (let i = 0; i < menus.length; i++) {
    const item = menus[i];

    // 当前有子路由继续遍历
    if (hasChildren(item)) {
      getCacheRoutes(item.children as RouteRecordRaw[], result)
    }

    // 当有缓存则添加数据
    keepAlive(item) && result.push(item.name as string)
  }
  return result
}

/**
 * 寻找与路由匹配的第一值
 * @param route 
 */

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

/**
 * 是否隐藏菜单列表
 * @param route
 */
 function hasHidden(route: RouteRecordRaw): boolean {
  return Boolean(route?.meta?.isHidden)
}