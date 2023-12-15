import type { RouteRecordRaw } from "vue-router";
import { firstCapitalize } from "@/utils/helper";
import { ROUTER_EXCLUDE } from "@/utils/config";

/**
 * 路由转为Keepalive
 * @param route - 路由
 */
export function routeToKeepalive(route: string): string {
  if (typeof route !== "string") return '';

  let result = '';
  const arr = route.split('/'); // 分割路由

  for (let i = 0; i < arr.length; i++) {
    result += firstCapitalize(arr[i]);
  }

  return result;
}

/**
 * 刺激微模块，欧盟和
 */

/**
 * 匹配路由是否在排查名单中
 * @param path - 路径
 */
function handleRouterExclude(path: string): boolean {
  for (let i = 0; i < ROUTER_EXCLUDE.length; i++) {
    const item = ROUTER_EXCLUDE[i];
    if (path.includes(item)) return true;
  }

  return false;
}

/**
 * 路由添加layout
 * @param routes - 路由数据
 */
export function layoutRoutes(routes: RouteRecordRaw[]): RouteRecordRaw[] {
  const layouts: RouteRecordRaw[] = []; // layout内部组件

  for (let i = 0; i < routes.length; i++) {
    const item = routes[i];
    if (handleRouterExclude(item.path)) continue;
    layouts.push(item);
  }

  return layouts;
}