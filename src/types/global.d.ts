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

  // 点击行属性
  type IOnRow = (record: IFormData, index: number) => {
    onClick: (even: MouseEvent) => void; // 点击行
    onDoubleClick: (even: MouseEvent) => void;
    onContextMenu: (even: MouseEvent) => void;
    onMouseEnter: (even: MouseEvent) => void; // 鼠标移入行
    onMouseLeave: (even: MouseEvent) => void;
  }

  // 点击表头
  type IOnHeader = (columns: IFormData, index: number) => {
    onClick: () => void;
  }

  // 表格数据
  type ITableData = {
    onRow?: IOnRow;
    onHeaderRow?: IOnHeader;
  } & TableProps
}