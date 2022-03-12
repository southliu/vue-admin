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
}