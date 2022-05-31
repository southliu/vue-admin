import type { VxeGridProps } from "vxe-table";
import type { IFormData, IFormList } from "./form";

export {}

declare global {
  // 搜索数据
  interface ISearchData {
    data: IFormData;
    list: IFormList[];
  }

  // 新增数据
  interface ICreateData {
    id: string;
    isVisible: boolean;
    title: string;
    data: IFormData;
    list: IFormList[];
  }

  // 分页数据
  interface IPaginationData {
    page: number;
    pageSize: number;
  }

  // 表格数据
  type ITableData = {
    total: number;
  } & VxeGridProps

   // 接口响应数据
   interface IServerResult<T = undefined> {
    code: number;
    message?: string;
    data: T
  }

  // 分页表格响应数据
   interface IPageServerResult<T = undefined> {
    code: number;
    message?: string;
    data: {
      items: T,
      total: number
    }
  }

  // env数据
  interface IViteEnv {
    VITE_SERVER_PORT: number;
    // VITE_PROXY: [string, string][];
  }
}