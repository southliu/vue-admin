import type { IAllDataType } from './public'
import type {
  InputProps,
  SelectProps,
  RadioProps,
  CheckboxGroupProps,
  DatePickerProps,
  ImageProps
} from "ant-design-vue";
import type { RuleObject } from 'ant-design-vue/lib/form'

// 表单规则
export type IFormRule = RuleObject & {
  trigger?: 'blur' | 'change' | ['change', 'blur'];
};

// 数据类型
export type IFormData = Record<string, IAllDataType>

// 基础数据组件
type IDefaultDataComponents = 'Input' |
                              'InputNumber' |
                              'Textarea' |
                              'InputPassword'  |
                              'Image' |
                              'AutoComplete' |
                              'customize'

// 下拉组件
type ISelectComponents = 'Select' | 'TreeSelect'

// 复选框组件
type ICheckboxComponents = 'Checkbox' | 'CheckboxGroup'

// 单选框组件
type IRadioComponents = 'RadioGroup' | 'Switch'

// 时间组件
type ITimeComponents = 'DatePicker' | 'RangePicker'

// 组件集合
export type IComponents =  IDefaultDataComponents |
                    ISelectComponents |
                    ICheckboxComponents |
                    ITimeComponents |
                    IRadioComponents

// 公共树形
interface IPublic {
  disabled: boolean; // 是否禁用
  notClear: boolean; // 是否不开启清除
}

// 组件参数
export type IComponentProps =  Partial<IPublic> &
                        Partial<InputProps> &
                        Partial<SelectProps> &
                        Partial<CheckboxGroupProps> &
                        Partial<RadioProps> &
                        Partial<ImageProps> &
                        Partial<DatePickerProps> 

// 表单数据
export type IFormList = {
  key: string; // 唯一标识
  title: string; // 标题
  rules?: IFormRule[]; // 规则
  component: IComponents; // 组件
  componentProps?: IComponentProps; // 组件参数
}
