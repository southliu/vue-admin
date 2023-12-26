import type { RouteRecordRaw } from "vue-router";
import { firstCapitalize } from "@/utils/helper";
import { ROUTER_EXCLUDE, VERSION } from "@/utils/config";
import { message } from "ant-design-vue";
import axios from "axios";

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

/**  版本监控 */
export const versionCheck = async () => {
  if (import.meta.env.MODE === 'development') return;
  const versionLocal = localStorage.getItem(VERSION);
  const { data: { version } } = await axios.get('version.json');

  // 首次进入则缓存本地数据
  if (!versionLocal) {
    return localStorage.setItem(VERSION, String(version));
  }

  if (versionLocal !== String(version)) {
    localStorage.setItem(VERSION, String(version));
    message.info({
      content: '发现新内容，自动更新中...',
      key: 'reload',
      onClose: () => {
        window.location.reload();
      }
    });
  }
};
  