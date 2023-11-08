import type { VxeColumnProps, VxeColumnPropTypes } from "vxe-table";
import type { IConstant } from "@/utils/constants";
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

// 侧边菜单值
export interface SideMenu {
  id?: string;
  menuType: number; // 菜单类型
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
  isOpen: boolean;
  title: string;
  data: FormData;
  type?: 'create' | 'update';
}

// 分页数据
export interface PaginationData {
  total?: number;
  page: number;
  pageSize: number;
}

// 表格参数
export interface TableProps extends VxeColumnProps {
  slots?: VxeColumnPropTypes.Slots;
  echoArr?: IConstant[];
}

// 表格数据
export type TableData = Record<string, unknown>

// 接口响应数据
export interface ServerResult<T = unknown> {
  code: number;
  message?: string;
  data: T
}

// 分页表格响应数据
export interface PageServerResult<T = unknown[]> {
  items: T,
  total: number
}