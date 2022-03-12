import type { TableProps } from "ant-design-vue";
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
  type ITableData = TableProps
}