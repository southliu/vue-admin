import type { VxeTableProps } from "vxe-table";
import type { FormData } from "./form";

// 基础类型
export type BasicData = string | number | boolean

// 数组
export type ArrayData = string[] | number[] | boolean[]

// 对象
export type ObjectData = object | object[] | Record<string, BasicData | ArrayData | EmptyData>

// 空值
export type EmptyData = null | undefined

// 唯一值
export type SymbolData = symbol | symbol[]

// 全部数据类型
export type AllDataType = BasicData | ArrayData | EmptyData | ObjectData | SymbolData

// 侧边菜单值
export interface SideMenu {
  label: string;
  key: string;
  icon?: string;
  rule?: string; // 路由权限
  nav?: string[]; // 面包屑路径
  children?: SideMenu[];
}

// 搜索数据
export interface SearchData {
  data: FormData;
}

// 新增数据
export interface CreateData {
  id: string;
  isVisible: boolean;
  title: string;
  data: FormData;
}

// 分页数据
export interface PaginationData {
  page: number;
  pageSize: number;
}

// 表格数据
export type TableData = {
  total?: number;
} & VxeTableProps

// 接口响应数据
export interface ServerResult<T = unknown> {
  code: number;
  message?: string;
  data: T
}

// 分页表格响应数据
export interface PageServerResult<T = unknown> {
  code: number;
  message?: string;
  data: {
    items: T,
    total: number
  }
}