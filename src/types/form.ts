import type { IAllDataType } from './public';
import type {
  InputProps,
  SelectProps,
  RadioProps,
  CheckboxGroupProps,
  DatePickerProps,
} from "ant-design-vue";

// 数据类型
export type IFormData = Record<string, IAllDataType>

// 基础数据组件
type IDefaultDataComponents = 'Input' |
                              'InputNumber' |
                              'Textarea' |
                              'InputPassword'  |
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
type IComponents =  IDefaultDataComponents |
                    ISelectComponents |
                    ICheckboxComponents |
                    ITimeComponents |
                    IRadioComponents

// 公共树形
interface IPublic {
  isDisabled: boolean; // 是否禁用
  isNotClear: boolean; // 是否不开启清除
}

// 组件参数
export type IComponentProps =  Partial<IPublic> &
                        Partial<InputProps> &
                        Partial<SelectProps> &
                        Partial<CheckboxGroupProps> &
                        Partial<RadioProps> &
                        Partial<DatePickerProps> 

// 表单数据
export type IFormList = {
  key: string; // 唯一标识
  title: string; // 标题
  component: IComponents; // 组件
  componentProps?: IComponentProps; // 组件参数
}