import type { IConstant } from "@/utils/constants";
import type { FormData } from "./form";
import type { ColumnType } from "ant-design-vue/es/table";
import type { DefaultRecordType } from "ant-design-vue/es/vc-table/interface";

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
export interface CreateData<T = FormData> {
  id: string;
  isOpen: boolean;
  title: string;
  data: T;
  type?: 'create' | 'update';
}

// 分页数据
export interface PaginationData {
  total?: number;
  page: number;
  pageSize: number;
}

// 表格参数
export interface TableColumnsProps extends ColumnType<DefaultRecordType> {
  type?: 'index';
  echoArr?: IConstant[];
  children?: TableColumnsProps[];
  tooltipKey?: string; // 提示文本键名
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

// 某个字段变为可选
export type PartialByKeys<T, K extends keyof T> = {
	[P in K]?: T[P];
} & Omit<T, K>

// 某个字段变为必选
export type RequiredByKeys<T, K extends keyof T> = {
	[P in K]: T[P];
} & Omit<T, K>