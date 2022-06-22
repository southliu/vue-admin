import type { VxeTableProps } from "vxe-table"
import type { IFormData } from "./form"

export {}

declare global {
  // 搜索数据
  interface ISearchData {
    data: IFormData;
  }

  // 新增数据
  interface ICreateData {
    id: string;
    isVisible: boolean;
    title: string;
    data: IFormData;
  }

  // 分页数据
  interface IPaginationData {
    page: number;
    pageSize: number;
  }

  // 表格数据
  type ITableData = {
    total?: number;
  } & VxeTableProps

   // 接口响应数据
   interface IServerResult<T = unknown> {
    code: number;
    message?: string;
    data: T
  }

  // 分页表格响应数据
   interface IPageServerResult<T = unknown> {
    code: number;
    message?: string;
    data: {
      items: T,
      total: number
    }
  }
}