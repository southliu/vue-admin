import type {
  InputProps,
  InputNumberProps,
  SelectProps,
  TreeSelectProps,
  RadioProps,
  RadioGroupProps,
  CheckboxGroupProps,
  DatePickerProps,
  UploadProps,
  RateProps,
  SliderProps,
  CascaderProps,
  FormProps,
  FormItemProps
} from "ant-design-vue";
import type { ServerResult } from './public';
import type { RuleObject } from 'ant-design-vue/lib/form';
import type { BusinessComponentType } from '@/components/Business';
import type { WangEditorProps } from '@/components/WangEditor/model';
import type { SelectValue } from "ant-design-vue/es/select";
import type { HTMLAttributes } from "vue";

// 数据类型
export type FormData = Record<string, unknown>

// 基础数据组件
type DefaultDataComponents = 'Input' |
                              'InputNumber' |
                              'Textarea' |
                              'InputPassword' |
                              'AutoComplete' |
                              'customize' |
                              'slot' |
                              BusinessComponentType

// 下拉组件
type SelectComponents = 'Select' | 'TreeSelect' | 'ApiSelect' | 'ApiTreeSelect'

// 复选框组件
type CheckboxComponents = 'Checkbox' | 'CheckboxGroup'

// 单选框组件
type RadioComponents = 'RadioGroup' | 'Switch'

// 时间组件
type TimeComponents = 'DatePicker' | 'RangePicker'

// 上传组件
type UploadComponents = 'UploadFile' | 'UploadImage'

// 星级组件
type RateComponents = 'Rate'

// 滑动输入条组件
type SliderComponents = 'Slider'

// 富文本编辑器
type EditorComponents = 'Editor'

// 密码强度组件
type PasswordStrength = 'PasswordStrength'

// 组件集合
export type ComponentType = DefaultDataComponents |
                          SelectComponents |
                          CheckboxComponents |
                          TimeComponents |
                          RadioComponents |
                          UploadComponents |
                          RateComponents |
                          SliderComponents |
                          EditorComponents |
                          PasswordStrength

export type ApiFun = (params?: unknown) => Promise<ServerResult>

// api参数
export interface ApiSelectParam {
  api?: ApiFun;
  params?: object;
  apiResultKey?: string; // 接口返回值的key值，枚举接口特殊处理
  spliceLabel?: [string, string]; // 拼接名称
  onUpdate?: (value: SelectValue, list: unknown[]) => void;
}

// ApiSelect
export type ApiSelectProps = ApiSelectParam & SelectProps

// ApiTreeSelect
export type ApiTreeSelectProps = ApiSelectParam & TreeSelectProps

export type BasicSelectParam = Omit<ApiSelectParam, 'api' | 'params' | 'apiResultKey'>

// BasicSelect
export type BasicSelectProps = BasicSelectParam & SelectProps

// BasicTreeSelect
export type BasicTreeSelectProps = BasicSelectParam & TreeSelectProps

// 组件参数
export type ComponentProps = InputProps |
                              InputNumberProps |
                              SelectProps |
                              TreeSelectProps |
                              CheckboxGroupProps |
                              RadioProps |
                              RadioGroupProps |
                              DatePickerProps |
                              UploadProps |
                              RateProps |
                              SliderProps |
                              CascaderProps |
                              ApiSelectProps |
                              ApiTreeSelectProps |
                              WangEditorProps |
                              HTMLAttributes

// 表单规则
export type FormRule = RuleObject & {
  trigger?: 'blur' | 'change' | ['change', 'blur'];
};

// 表单数据
export interface FormList extends Omit<FormItemProps, 'labelCol' | 'wrapperCol'> {
  name: string | string[]; // 表单域字段
  label: string; // 标签
  unit?: string; // 单位
  placeholder?: string | string[]; // 占位符
  hidden?: boolean; // 是否隐藏
  rules?: FormRule[]; // 规则
  labelCol?: number | string | FormProps['labelCol']; // label宽度
  wrapperCol?: number | string | FormProps['wrapperCol']; // 内容宽度
  component: ComponentType; // 组件
  componentProps?: ComponentProps; // 组件参数
  render?: unknown; // 自定义渲染
}
