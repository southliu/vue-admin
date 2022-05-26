<script lang="ts">
import { defineComponent, h, PropType } from 'vue'
import type {
  InputProps,
  InputNumberProps,
  TreeSelectProps,
  CheckboxProps,
  CheckboxGroupProps,
  RadioGroupProps,
  SwitchProps,
  AutoCompleteProps,
  SelectProps,
  DatePickerProps
} from 'ant-design-vue'
import {
  Input,
  InputNumber,
  InputPassword,
  AutoComplete,
  Select,
  TreeSelect,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  Switch,
  DatePicker
} from 'ant-design-vue'
import type { IFormList } from '@/types/form'
import type { SelectValue } from 'ant-design-vue/lib/select'
import type { CheckboxValueType } from 'ant-design-vue/es/checkbox/interface'
import type { Dayjs } from 'dayjs'
import type { CheckboxChangeEvent } from 'ant-design-vue/lib/checkbox/interface'
import dayjs from 'dayjs'

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<IFormList>,
      required: true
    },
    value: {
      type: [String, Number, Boolean, Object],
      required: false
    }
  },
  emits: ['update:value', 'update:modelValue'],
  components: {
    Input,
    InputNumber,
    InputPassword,
    AutoComplete,
    Select,
    TreeSelect,
    Checkbox,
    CheckboxGroup,
    RadioGroup,
    Switch,
    DatePicker,
  },
  setup(props, { emit }) {
    const { item } = props

    // 默认允许关闭
    const allowClear = true
    // 请输入
    const pleaseEnter = '请输入'
    // 请选择
    const pleaseSelect = '请选择'

    /**
     * 渲染不同组件
     * @param item 子组件值
     */
    const itemRender = (item: IFormList) => {
      const { componentProps } = item

      switch (item.component) {
        // 自定义
        // case 'Customize':
        //   return item.render()

        // 输入框
        case 'Input':
          return (
            h(Input, {
              allowClear,
              placeholder: pleaseEnter,
              ...componentProps as InputProps,
              value: props.value as string,
              'onUpdate:value': (value: string | number) => emit('update:value', value)
            })
          )

        // 密码框
        case 'InputPassword':
          return (
            h(InputPassword, {
              allowClear,
              placeholder: pleaseEnter,
              ...componentProps as InputProps,
              value: props.value as string,
              'onUpdate:value': (value: string | number) => emit('update:value', value)
            })
          )

        // 数字框
        case 'InputNumber':
          return (
            h(InputNumber, {
              allowClear,
              placeholder: pleaseEnter,
              ...componentProps as InputNumberProps,
              value: props.value as number,
              'onUpdate:value': (value: number) => emit('update:value', value)
            })
          )

        // 自动输入框
        case 'AutoComplete':
          return (
            h(AutoComplete, {
              allowClear,
              placeholder: pleaseEnter,
              ...componentProps as AutoCompleteProps,
              value: props.value as SelectValue,
              'onUpdate:value': (value: SelectValue) => emit('update:value', value)
            })
          )

        // 文本框
        case 'Textarea':
          return (
            h(Input.Textarea, {
              allowClear,
              placeholder: pleaseEnter,
              ...componentProps,
              value: props.value as string,
              'onUpdate:value': (value: string) => emit('update:value', value)
            })
          )

        // 下拉框
        case 'Select':
          return (
            h(Select, {
              allowClear,
              maxTagCount: "responsive",
              placeholder: pleaseSelect,
              ...componentProps as SelectProps,
              value: props.value as SelectValue,
              'onUpdate:value': (value: SelectValue) => emit('update:value', value)
            })
          )

        // 树形下拉框
        case 'TreeSelect':
          return (
            h(TreeSelect, {
              allowClear,
              maxTagCount: "responsive",
              placeholder: pleaseSelect,
              ...componentProps as TreeSelectProps,
              value: props.value as SelectValue,
              'onUpdate:value': (value: SelectValue) => emit('update:value', value)
            })
          )

        // 单选框
        case 'RadioGroup':
          return (
            h(RadioGroup, {
              ...componentProps as RadioGroupProps,
              value: props.value as boolean,
              'onUpdate:value': (value: boolean) => emit('update:value', value)
            })
          )

        // 开关
        case 'Switch':
          return (
            h(Switch, {
              ...componentProps as SwitchProps,
              value: props.value as boolean,
              'onUpdate:value': (value: boolean) => emit('update:value', value)
            })
          )

        // 复选框
        case 'Checkbox':
          return (
            h(Checkbox, {
              'onChange': (value: CheckboxChangeEvent) => emit('update:value', value.target.checked),
              ...componentProps as CheckboxProps,
              checked: !!props.value,
              innerHTML: (componentProps as CheckboxProps)?.name || '',
              'onUpdate:value': (value: boolean) => emit('update:value', value)
            })
          )

        // 复选框组
        case 'CheckboxGroup':
          return (
            h(CheckboxGroup, {
              ...componentProps as CheckboxGroupProps,
              value: props.value as CheckboxValueType[],
              'onUpdate:value': (value: CheckboxValueType[]) => emit('update:value', value)
            })
          )

        // 时间
        case 'DatePicker':
          return (
            h(DatePicker, {
              allowClear,
              placeholder: pleaseSelect,
              ...componentProps as object,
              defaultValue: props.value ? dayjs(props.value as string) : undefined,
              value: props.value ? dayjs(props.value as string) : undefined,
              'onUpdate:value': (value: Dayjs | string) => {
                const format = (componentProps as DatePickerProps)?.format || 'YYYY-MM-DD'
                emit('update:value', (value as Dayjs).format(format.toString()))
              }
            })
          )

        // 时间区间
        case 'RangePicker':
          return (
            h(DatePicker.RangePicker, {
              allowClear,
              placeholder: [pleaseSelect, pleaseSelect],
              ...componentProps as object,
              defaultValue: (props.value as [string, string])?.length > 1 && (props.value as [string, string])?.[0] ?
                    [dayjs((props.value as [string, string])[0]), dayjs((props.value as [string, string])[1])] : ['', ''],
              value: (props.value as [string, string])?.length > 1 && (props.value as [string, string])?.[0] ?
                    [dayjs((props.value as [string, string])[0]), dayjs((props.value as [string, string])[1])] : ['', ''],
              'onUpdate:value': (value: [Dayjs, Dayjs] | [string, string]) => {
                const format = (componentProps as DatePickerProps)?.format || 'YYYY-MM-DD'
                const data = [
                  (value as [Dayjs, Dayjs])[0].format(format.toString()),
                  (value as [Dayjs, Dayjs])[1].format(format.toString())
                ]
                emit('update:value', data)
              }
            })
          )
      }
    }

    return () => itemRender(item)
  }
})
</script>
