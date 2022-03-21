<script lang="tsx">
import { defineComponent } from "vue"
import type { PropType } from 'vue'
import type { IFormList } from '@/types/form'
import type { Dayjs } from "dayjs";
import type {
  TreeSelectProps,
  InputProps,
  InputNumberProps,
  AutoCompleteProps,
  TextAreaProps,
  SelectProps,
  RadioGroupProps,
  SwitchProps,
  DatePickerProps,
} from 'ant-design-vue';
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
import type { CheckboxGroupProps, CheckboxProps, CheckboxValueType } from "ant-design-vue/lib/checkbox/interface";

interface IProps {
  item: IFormList;
  value: string | number | boolean | object;
}

export default defineComponent({
  name: 'BasicComponents',
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
  render(props: IProps) {
    const { item, value } = props

    /**
     * 渲染不同组件
     * @param item 子组件值
     */
    const itemRender = (item: IFormList) => {
      switch (item.component) {
        // 自定义
        case 'customize':
          return <slot name="customize"></slot>

        // 输入框
        case 'Input':
          return (
            <Input
              {...item.componentProps as InputProps}
              value={value as string | number}
              class="min-w-100px"
              placeholder="请输入"
              allow-clear={!item?.componentProps?.isNotClear}
            />
          )

        // 密码框
        case 'InputPassword':
          return (
            <InputPassword
              {...item.componentProps as InputProps}
              value={value as string | number}
              class="min-w-100px"
              placeholder="请输入"
              allow-clear={!item?.componentProps?.isNotClear}
            />
          )

        // 数字框
        case 'InputNumber':
          return (
            <InputNumber
              {...item.componentProps as InputNumberProps}
              value={value as string | number}
              class="min-w-100px"
              placeholder="请输入"
            />
          )

        // 自动输入框
        case 'AutoComplete':
          return (
            <AutoComplete
              {...item.componentProps as AutoCompleteProps}
              value={value as string | number}
              class="min-w-100px"
              placeholder="请输入"
            />
          )

        // 文本框
        case 'Textarea':
          return (
            <Textarea
              {...item.componentProps as TextAreaProps}
              value={value as string | number}
              class="min-w-100px"
              placeholder="请输入"
            />
          )

        // 下拉框
        case 'Select':
          return (
            <Select
              {...item.componentProps as SelectProps}
              value={value as string | number}
              class="min-w-100px"
              placeholder="请选择"
              allow-clear={!item?.componentProps?.isNotClear}
            />
          )

        // 树形下拉框
        case 'TreeSelect':
          return (
            <TreeSelect
              {...item.componentProps as TreeSelectProps}
              value={value as string | number}
              class="min-w-100px"
              placeholder="请选择"
            />
          )

        // 单选框
        case 'RadioGroup':
          return (
            <RadioGroup
              {...item.componentProps as RadioGroupProps}
              value={value as boolean}
              class="min-w-100px"
            />
          )

        // 开关
        case 'Switch':
          return (
            <Switch
              {...item.componentProps as SwitchProps}
              checked={value as boolean}
              class="min-w-100px"
            />
          )

        // 复选框
        case 'Checkbox':
          return (
            <Checkbox
              {...item.componentProps as CheckboxProps}
              checked={value as boolean}
              class="min-w-100px"
            >
              { item?.componentProps?.name || '' }
            </Checkbox>
          )

        // 复选框组
        case 'CheckboxGroup':
          return (
            <CheckboxGroup
              {...item.componentProps as CheckboxGroupProps}
              value={value as CheckboxValueType[]}
              class="min-w-100px"
            />
          )

        // 时间
        case 'DatePicker':
          return (
          <DatePicker
              {...item.componentProps as DatePickerProps}
              value={value as string | Dayjs}
              class="min-w-100px"
            />
          )

        // 时间区间
        case 'RangePicker':
          return (
            <RangePicker
              {...item.componentProps as DatePickerProps}
              value={value as [string, string] | [Dayjs, Dayjs]}
              class="min-w-100px"
            />
          )
      }
    }

    return (
      <div>
        <template v-if="item.component === 'RangePicker'">
          <RangePicker
            value={value as [string, string] | [Dayjs, Dayjs]}
            class="min-w-100px"
            picker={item?.componentProps?.picker}
            showTime={item?.componentProps?.showTime}
          />
        </template>
        { itemRender(item) }
      </div>
    )
  },
})
</script>