import { firstCapitalize } from "@/utils/helper"
import type { RouteRecordRaw } from "vue-router"

/**
 * 路由转为Keepalive
 * @param route - 路由
 */
export function routeToKeepalive(route: string): string {
  if (typeof route !== "string") return ''

  let result = ''
  const arr = route.split('/') // 分割路由

  for (let i = 0; i < arr.length; i++) {
    result += firstCapitalize(arr[i])
  }

  return result
}

/**
 * 路由添加layout
 * @param routes - 路由数据
 */
export function layoutRoutes(routes: RouteRecordRaw[]): RouteRecordRaw[] {
  const layouts: RouteRecordRaw[] = [] // layout内部组件

  for (let i = 0; i < routes.length; i++) {
    // 路径为根目录或登录页不添加layouts
    if (routes[i].path !== '/login') {
      layouts.push(routes[i])
    }
  }

  return layouts
}