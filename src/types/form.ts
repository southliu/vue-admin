import type { ISelectData } from "./select"
import type { IAllDataType } from './public';
import type { ICheckboxData } from "./checkbox";
import type { IRadioData } from "./radio";
import type { IDateData } from "./date";

// 数据类型
export type IFormData = Record<string, IAllDataType>

// 基础数据类型
type IDefaultDataTypes = 'string' | 'number' | 'text' |  'password'  | 'autoComplete' | 'customize'

// 下拉类型
type ISelectTypes = 'select' | 'treeSelect'

// 复选框
type ICheckboxTypes = 'checkbox' | 'checkboxGroup'

// 单选框
type IRadioTypes = 'radio' | 'switch'

// 时间类型
type ITimeTypes = 'date' | 'dateRange'

// 类型集合
type ITypes = IDefaultDataTypes | ISelectTypes | ICheckboxTypes | ITimeTypes | IRadioTypes

// 公共树形
interface IPublic {
  isDisabled: boolean; // 是否禁用
  isNotClear: boolean; // 是否不开启清除
}

// Col
export interface IFromCol {
  flex: string|number; // 布局填充
  offset: number; // 栅格左侧的间隔格数，间隔内不可以有栅格
  order: number; // 栅格顺序，flex 布局模式下有效
  pull: number; // 栅格向左移动格数
  push: number; // 栅格向右移动格数
  span: number; // 栅格占位格数，为 0 时相当于 display: none
}

// 表单数据
export type IFormList = {
  key: string; // 唯一标识
  title: string; // 标题
  type: ITypes; // 类型
} & Partial<IPublic>
  & Partial<ISelectData>
  & Partial<ICheckboxData>
  & Partial<IRadioData>
  & Partial<IDateData>