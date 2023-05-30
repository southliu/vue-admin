import type {
  InputProps,
  SelectProps,
  TreeSelectProps,
  RadioProps,
  CheckboxGroupProps,
  DatePickerProps,
  UploadProps,
  RateProps,
  SliderProps
} from "ant-design-vue";
import type { AllDataType } from './public';
import type { DefaultOptionType } from 'ant-design-vue/lib/select';
import type { RuleObject } from 'ant-design-vue/lib/form';
import type { BusinessComponentType } from '@/components/Business';
import type { WangEditorProps } from '@/components/WangEditor/model';

// 数据类型
export type FormData = Record<string, AllDataType>

// 基础数据组件
type DefaultDataComponents = 'Input' |
                              'InputNumber' |
                              'Textarea' |
                              'InputPassword' |
                              'AutoComplete' |
                              'customize' |
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
type UploadComponents = 'Upload'

// 星级组件
type RateComponents = 'Rate'

// 滑动输入条组件
type SliderComponents = 'Slider'

// 自定义组件
type CustomizeComponents = 'Customize'

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
                          CustomizeComponents |
                          UploadComponents |
                          RateComponents |
                          SliderComponents |
                          EditorComponents |
                          PasswordStrength

export type ApiFun = (params?: unknown) => Promise<DefaultOptionType[]>

// api参数
interface ApiParam {
  api?: ApiFun;
  params?: object;
}

// ApiSelect
export type ApiSelectProps = ApiParam & SelectProps

// ApiTreeSelect
export type ApiTreeSelectProps = ApiParam & TreeSelectProps

// 组件参数
export type ComponentProps = InputProps |
                              SelectProps |
                              TreeSelectProps |
                              CheckboxGroupProps |
                              RadioProps |
                              DatePickerProps |
                              UploadProps |
                              RateProps |
                              SliderProps |
                              ApiSelectProps |
                              ApiTreeSelectProps |
                              WangEditorProps

// 表单规则
export type FormRule = RuleObject & {
  trigger?: 'blur' | 'change' | ['change', 'blur'];
};

// 表单数据
export type FormList = {
  name: string | string[]; // 表单域字段
  label: string; // 标签
  placeholder?: string; // 占位符
  hidden?: boolean; // 是否隐藏
  rules?: FormRule[]; // 规则
  labelCol?: number; // label宽度
  wrapperCol?: number; // 内容宽度
  component: ComponentType; // 组件
  componentProps?: ComponentProps; // 组件参数
  render?: any; // 自定义渲染
}
