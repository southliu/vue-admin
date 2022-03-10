import type { IAllDataType } from './public';
import type { IFormData } from "./form";


// 搜索栏数据类型
export type ISearchData = Record<string, IAllDataType>

// 搜索栏列表数据
export interface ISearchList extends IFormData {
  key: string;
  title: string;
}