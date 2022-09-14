import type { RouteRecordRaw } from "vue-router"

// 更改meta值
interface IMeta {
  meta?: {
    title?: string;
    rule?: string;
    hidden?: boolean;
    keepAlive?: boolean;
    icon?: string;
  }
}

// 更改children值
interface IChildren { children?: IMenus[] }

export type IMenus = RouteRecordRaw & IMeta & IChildren
