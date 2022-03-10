import type { DefaultOptionType } from "ant-design-vue/lib/select";

export interface ISelectList {
  value: string | number | boolean;
  label: string | number;
}

// 下拉选择类型
export interface ISelectData {
  selectList?: DefaultOptionType[]; // 下拉数据
  isSelectLoading?: boolean; // 是否加载
  isMultiple?: boolean; // 下拉选择框是否多选
  isTreeCheckable?: boolean; // 树形选择是否显示选择框
  isAutoClearSearchValue?: boolean; // 当多选模式下值被选择，自动清空搜索框
  isTreeDefaultExpandAll?: boolean; // 是否默认展开全部
  isTreeCheckStrictly?: boolean; // 父子关联
  handleDropdownVisibleChange?: (open: boolean) => void; // 点击下拉框触发
  handleSelect?: (value: string | number) => void; // 触发选择
  handleChangeSelect?: (value: string | string[] | number | number[]) => void | boolean; // 更改触发
  handleClear?: () => void; // 清空处理
  handleSearch?: (value: string | number) => void; // 搜索触发
}