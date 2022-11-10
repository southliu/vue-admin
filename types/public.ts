import type { VxeTableProps } from "vxe-table"
import type { IFormData } from "./form"

// 基础类型
export type IBasicData = string | number | boolean

// 数组
export type IArrayData = string[] | number[] | boolean[]

// 对象
export type IObjectData = object | object[] | Record<string, IBasicData | IArrayData | IEmptyData>

// 空值
export type IEmptyData = null | undefined

// 唯一值
export type ISymbolData = symbol | symbol[]

// 全部数据类型
export type IAllDataType = IBasicData | IArrayData | IEmptyData | IObjectData | ISymbolData

// 侧边菜单值
export interface ISideMenu {
  label: string;
  key: string;
  icon?: string;
  rule?: string; // 路由权限
  nav?: string[]; // 面包屑路径
  children?: ISideMenu[];
}

// 搜索数据
export interface ISearchData {
  data: IFormData;
}

// 新增数据
export interface ICreateData {
  id: string;
  isVisible: boolean;
  title: string;
  data: IFormData;
}

// 分页数据
export interface IPaginationData {
  page: number;
  pageSize: number;
}

// 表格数据
export type ITableData = {
  total?: number;
} & VxeTableProps

// 接口响应数据
export interface IServerResult<T = unknown> {
  code: number;
  message?: string;
  data: T
}

// 分页表格响应数据
export interface IPageServerResult<T = unknown> {
  code: number;
  message?: string;
  data: {
    items: T,
    total: number
  }
}