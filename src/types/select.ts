import type { DefaultOptionType, SelectValue } from "ant-design-vue/lib/select";

// 下拉选择类型
export interface ISelectData {
  selectList: DefaultOptionType[]; // 下拉数据
  isSelectLoading: boolean; // 是否加载
  isMultiple: boolean; // 下拉选择框是否多选
  isTreeCheckStrictly: boolean; // 父子关联
  handleSelectChange: (value: SelectValue, option: DefaultOptionType | DefaultOptionType[]) => void; // 触发更改
}