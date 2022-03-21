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
    isVisible: boolean;
    title: string;
    data: IFormData;
    list: IFormList[];
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
}