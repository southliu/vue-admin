import type { RouteRecordRaw } from "vue-router";
import { ROUTER_EXCLUDE } from "@/utils/config";
import { firstCapitalize } from "@/utils/helper";
import { usePublicStore } from '@/stores/public';
import pinia from '../../stores';

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
 * 路由名处理
 * @param path - 路由路径
 */
const handleRouterName = (path: string) => {
  if (!path || !path.includes('pages')) return '';

  const arr = path.split('pages');
  let result = arr?.[1]?.substring(0, arr?.[1]?.length - 4);

  // 如果结尾是index则去除
  const endStr = result.substring(result?.length - 6, result?.length);
  if (endStr === '/index') {
    result = result.substring(0, result.length - 6);
  }

  return result;
};

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

/** 路由添加layout */
export function layoutRoutes(): RouteRecordRaw[] {
  const layouts: RouteRecordRaw[] = []; // layout内部组件
  const { routerList } = usePublicStore(pinia);
  const pages = routerList || {};

  for (const key in pages) {
    if (!handleRouterExclude(key)) {
      layouts.push({
        path: handleRouterName(key),
        name: pages[key]?.name,
        component: () => import(`../${key}`)
      });
    }
  }

  return layouts;
}