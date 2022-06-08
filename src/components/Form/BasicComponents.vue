<script lang="ts">
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
import type { IApiSelectProps, IApiTreeSelectProps, IFormList } from '@/types/form'
import type { SelectValue } from 'ant-design-vue/lib/select'
import type { CheckboxValueType } from 'ant-design-vue/es/checkbox/interface'
import type { Dayjs } from 'dayjs'
import type { CheckboxChangeEvent } from 'ant-design-vue/lib/checkbox/interface'
import type { IBasicData } from "@/types/public"
import type { IBusinessEmit } from '../Business'
import type {  PropType } from 'vue'
import { defineComponent, h } from 'vue'
import { exportBusiness } from '../Business'
import { PLEASE_ENTER, PLEASE_SELECT, MAX_TAG_COUNT } from '@/utils/config'
import dayjs from 'dayjs'
import ApiSelect from '../Select/ApiSelect.vue'
import ApiTreeSelect from '../Select/ApiTreeSelect.vue'

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<IFormList>,
      required: true
    },
    value: {
      type: [String, Number, Boolean, Object] as PropType<IBasicData>,
      required: true
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
  setup(props, context) {
    const { item } = props
    const { emit } = context

    // 默认允许关闭
    const allowClear = true

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
              placeholder: PLEASE_ENTER,
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
              placeholder: PLEASE_ENTER,
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
              placeholder: PLEASE_ENTER,
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
              placeholder: PLEASE_ENTER,
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
              placeholder: PLEASE_ENTER,
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
              maxTagCount: MAX_TAG_COUNT,
              optionFilterProp: "label",
              placeholder: PLEASE_SELECT,
              ...componentProps as SelectProps,
              value: props.value as SelectValue,
              'onUpdate:value': (value: SelectValue) => emit('update:value', value)
            })
          )

        // 下拉框
        case 'ApiSelect':
          return (
            h(ApiSelect, {
              allowClear,
              maxTagCount: MAX_TAG_COUNT,
              placeholder: PLEASE_SELECT,
              componentProps: componentProps as IApiSelectProps,
              value: props.value as SelectValue,
              'onUpdate:value': (value: SelectValue) => emit('update:value', value)
            })
          )

        // 树形下拉框
        case 'TreeSelect':
          return (
            h(TreeSelect, {
              allowClear,
              maxTagCount: MAX_TAG_COUNT,
              treeNodeFilterProp: 'label',
              placeholder: PLEASE_SELECT,
              showSearch: true,
              ...componentProps as TreeSelectProps,
              value: props.value as SelectValue,
              'onUpdate:value': (value: SelectValue) => emit('update:value', value)
            })
          )

        // 下拉框
        case 'ApiTreeSelect':
          return (
            h(ApiTreeSelect, {
              allowClear,
              maxTagCount: MAX_TAG_COUNT,
              placeholder: PLEASE_SELECT,
              componentProps: componentProps as IApiTreeSelectProps,
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
          const dateValue = props.value ? dayjs(props.value as string) : undefined
          return (
            h(DatePicker, {
              allowClear,
              placeholder: PLEASE_SELECT,
              ...componentProps as object,
              defaultValue: dateValue,
              value: dateValue,
              'onUpdate:value': (value: Dayjs | string) => {
                const format = (componentProps as DatePickerProps)?.format || 'YYYY-MM-DD'
                emit('update:value', (value as Dayjs).format(format.toString()))
              }
            })
          )

        // 时间区间
        case 'RangePicker':
          const rangeValue: [Dayjs, Dayjs] | undefined = (props.value as [string, string])?.length > 1 && (props.value as [string, string])?.[0] ?
                    [dayjs((props.value as [string, string])[0]), dayjs((props.value as [string, string])[1])] : undefined
          return (
            h(DatePicker.RangePicker, {
              allowClear,
              placeholder: [PLEASE_SELECT, PLEASE_SELECT],
              ...componentProps as object,
              defaultValue: rangeValue,
              value: rangeValue,
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

    /**
     * 父组件传送数据
     * @param value - 传送值
     */
    const handleEmit: IBusinessEmit = value => {
      emit('update:value', value)
    }

    return () => itemRender(item) || exportBusiness(item, props.value, handleEmit)
  }
})
</script>
