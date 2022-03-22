<script lang="ts">
import { defineComponent, h, PropType } from 'vue'
import {
  Input,
  InputNumber,
  InputPassword,
  AutoComplete,
  Textarea,
  Select,
  TreeSelect,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  Switch,
  DatePicker,
  RangePicker
} from 'ant-design-vue'
import type {
  TreeSelectProps,
  CheckboxProps,
  CheckboxGroupProps,
  RadioGroupProps,
  SwitchProps,
} from 'ant-design-vue'
import type { IFormList } from '@/types/form'
import type { SelectValue } from 'ant-design-vue/lib/select'
import type { CheckboxValueType } from 'ant-design-vue/es/checkbox/interface'
import type { Dayjs } from 'dayjs'

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
    Textarea,
    Select,
    TreeSelect,
    Checkbox,
    CheckboxGroup,
    RadioGroup,
    Switch,
    DatePicker,
    RangePicker
  },
  setup(props, { emit }) {
    const { item } = props

    // 默认允许关闭
    const allowClear = {
      allowClear: true
    }

    // 请输入
    const pleaseEnter = {
      placeholder: '请输入'
    }

    // 请选择
    const pleaseSelect = {
      placeholder: '请选择'
    }

    /**
     * 渲染不同组件
     * @param item 子组件值
     */
    const itemRender = (item: IFormList) => {
      switch (item.component) {
        // 输入框
        case 'Input':
          return (
            h(Input, {
              ...allowClear,
              ...pleaseEnter,
              ...item.componentProps,
              modalValue: props.value,
              'onUpdate:value': (value: string | number) => emit('update:value', value)
            })
          )

        // 密码框
        case 'InputPassword':
          return (
            h(InputPassword, {
              ...allowClear,
              ...pleaseEnter,
              ...item.componentProps,
              modalValue: props.value,
              'onUpdate:value': (value: string | number) => emit('update:value', value)
            })
          )

        // 数字框
        case 'InputNumber':
          return (
            h(InputNumber, {
              ...allowClear,
              ...pleaseEnter,
              ...item.componentProps,
              modalValue: props.value,
              'onUpdate:value': (value: number) => emit('update:value', value)
            })
          )

        // 自动输入框
        case 'AutoComplete':
          return (
            h(AutoComplete, {
              ...allowClear,
              ...pleaseEnter,
              ...item.componentProps,
              value: props.value as SelectValue,
              'onUpdate:value': (value: SelectValue) => emit('update:value', value)
            })
          )

        // 文本框
        case 'Textarea':
          return (
            h(Textarea, {
              ...allowClear,
              ...pleaseEnter,
              ...item.componentProps,
              value: props.value as string,
              'onUpdate:value': (value: string) => emit('update:value', value)
            })
          )

        // 下拉框
        case 'Select':
          return (
            h(Select, {
              ...allowClear,
              ...pleaseSelect,
              ...item.componentProps,
              value: props.value as SelectValue,
              'onUpdate:value': (value: SelectValue) => emit('update:value', value)
            })
          )

        // 树形下拉框
        case 'TreeSelect':
          return (
            h(TreeSelect, {
              ...allowClear,
              ...pleaseSelect,
              ...item.componentProps as TreeSelectProps,
              value: props.value as SelectValue,
              'onUpdate:value': (value: SelectValue) => emit('update:value', value)
            })
          )

        // 单选框
        case 'RadioGroup':
          return (
            h(RadioGroup, {
              ...item.componentProps as RadioGroupProps,
              value: props.value as boolean,
              'onUpdate:value': (value: boolean) => emit('update:value', value)
            })
          )

        // 开关
        case 'Switch':
          return (
            h(Switch, {
              ...item.componentProps as SwitchProps,
              value: props.value as boolean,
              'onUpdate:value': (value: boolean) => emit('update:value', value)
            })
          )

        // 复选框
        case 'Checkbox':
          return (
            h(Checkbox, {
              ...item.componentProps as CheckboxProps,
              value: props.value as boolean,
              innerHTML: item?.componentProps?.name || '',
              'onUpdate:value': (value: boolean) => emit('update:value', value)
            })
          )

        // 复选框组
        case 'CheckboxGroup':
          return (
            h(CheckboxGroup, {
              ...item.componentProps as CheckboxGroupProps,
              value: props.value as CheckboxValueType[],
              'onUpdate:value': (value: CheckboxValueType[]) => emit('update:value', value)
            })
          )

        // 时间
        case 'DatePicker':
          return (
            h(DatePicker, {
              ...allowClear,
              ...pleaseSelect,
              ...item.componentProps as any,
              value: props.value as string | Dayjs,
              'onUpdate:value': (value: string | Dayjs) => emit('update:value', value)
            })
          )

        // 时间区间
        case 'RangePicker':
          return (
            h(RangePicker, {
              ...allowClear,
              ...pleaseSelect,
              ...item.componentProps as any,
              value: props.value as [string, string] | [Dayjs, Dayjs],
              'onUpdate:value': (value: [string, string] | [Dayjs, Dayjs]) => emit('update:value', value)
            })
          )
      }
    }

    return () => itemRender(item)
  }
})
</script>
