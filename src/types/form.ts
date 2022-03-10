import type { ISelectData } from "./select"

// 基础数据类型
type IDefaultDataTypes = 'string' | 'number' | 'text' |  'password'  | 'autoComplete' | 'customize'

// 下拉类型
type ISelectTypes = 'select' | 'treeSelect'

// 复选框
type ICheckboxTypes = 'checkbox' | 'checkboxGroup'

// 单选框
type IRadioTypes = 'radio' | 'switch'

// 时间类型
type ITimeTypes = 'date' | 'dateRange' | 'month' | 'monthRange' | 'time' | 'timeRange' | 'minute'

// 类型集合
type ITypes = IDefaultDataTypes | ISelectTypes | ICheckboxTypes | ITimeTypes | IRadioTypes

// 表单数据
export type IFormData = {
  type: ITypes;
} & ISelectData