import type { IAllDataType } from './public'
import type {
  InputProps,
  SelectProps,
  RadioProps,
  CheckboxGroupProps,
  DatePickerProps
} from "ant-design-vue";
import type { DefaultOptionType } from 'ant-design-vue/lib/select'
import type { RuleObject } from 'ant-design-vue/lib/form'

// 数据类型
export type IFormData = Record<string, IAllDataType>

// 基础数据组件
type IDefaultDataComponents = 'Input' |
                              'InputNumber' |
                              'Textarea' |
                              'InputPassword' |
                              'AutoComplete' |
                              'customize'

// 下拉组件
type ISelectComponents = 'Select' | 'TreeSelect' | 'ApiSelect' | 'ApiTreeSelect'

// 复选框组件
type ICheckboxComponents = 'Checkbox' | 'CheckboxGroup'

// 单选框组件
type IRadioComponents = 'RadioGroup' | 'Switch'

// 时间组件
type ITimeComponents = 'DatePicker' | 'RangePicker'

// 组件集合
export type IComponents = IDefaultDataComponents |
                          ISelectComponents |
                          ICheckboxComponents |
                          ITimeComponents |
                          IRadioComponents

type IApi = (params?: unknown) => Promise<DefaultOptionType[]>

// ApiSelect
export type IApiSelectProps = {
  api?: IApi;
} & SelectProps

// 组件参数
export type IComponentProps = InputProps |
                              SelectProps |
                              CheckboxGroupProps |
                              RadioProps |
                              DatePickerProps |
                              IApiSelectProps

// 表单规则
export type IFormRule = RuleObject & {
  trigger?: 'blur' | 'change' | ['change', 'blur'];
};

// 表单数据
export type IFormList = {
  key: string; // 唯一标识
  title: string; // 标题
  rules?: IFormRule[]; // 规则
  labelCol?: number; // label宽度
  wrapperCol?: number; // 内容宽度
  component: IComponents; // 组件
  componentProps?: IComponentProps; // 组件参数
}
