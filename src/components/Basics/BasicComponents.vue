<template>
  <!-- 自定义 -->
  <template v-if="item.component === 'customize'">
    <slot name="customize"></slot>
  </template>

  <!-- 输入框 -->
  <template v-if="item.component === 'Input'">
    <Input
      v-model:value="valueData"
      class="min-w-100px"
      placeholder="请输入"
      :allow-clear="!item?.componentProps?.isNotClear"
    />
  </template>

  <template v-if="item.component === 'InputPassword'">
    <InputPassword
      v-model:value="valueData"
      class="min-w-100px"
      placeholder="请输入"
      :allow-clear="!item?.componentProps?.isNotClear"
    />
  </template>

  <template v-if="item.component === 'InputNumber'">
    <InputNumber
      v-model:value="valueData"
      class="min-w-100px"
      placeholder="请输入"
    />
  </template>

  <template v-if="item.component === 'AutoComplete'">
    <AutoComplete
      v-model:value="valueData"
      class="min-w-100px"
      placeholder="请输入"
    />
  </template>

  <template v-if="item.component === 'Textarea'">
    <Textarea
      v-model:value="valueData"
      class="min-w-100px"
      placeholder="请输入"
    />
  </template>

  <!-- 下拉框 -->
  <template v-if="item.component === 'Select'">
    <Select
      v-model:value="valueData"
      class="min-w-100px"
      placeholder="请选择"
      :options="item?.componentProps?.options"
      :loading="item?.componentProps?.loading"
      :allow-clear="!item?.componentProps?.isNotClear"
      :mode="item?.componentProps?.mode"
      @change="item?.componentProps?.onChange"
    />
  </template>
  
  <template v-if="item.component === 'TreeSelect'">
    <TreeSelect
      v-model:value="valueData"
      class="min-w-100px"
      placeholder="请选择"
      :options="item?.componentProps?.options"
      :loading="item?.componentProps?.loading"
      :allow-clear="!item?.componentProps?.isNotClear"
      :mode="item?.componentProps?.mode"
      @change="item?.componentProps?.onChange"
    />
  </template>

  <!-- 单选框 -->
  <template v-if="item.component === 'RadioGroup'">
    <RadioGroup
      v-model:checked="checkedData"
      class="min-w-100px"
      :options="item?.componentProps?.options"
    />
  </template>

  <template v-if="item.component === 'Switch'">
    <Switch
      v-model:checked="checkedData"
      class="min-w-100px"
    />
  </template>

  <!-- 复选框 -->
  <template v-if="item.component === 'Checkbox'">
    <Checkbox
      v-model:checked="checkedData"
      class="min-w-100px"
    >
      {{ item?.componentProps?.name || '' }}
    </Checkbox>
  </template>

  <template v-if="item.component === 'CheckboxGroup'">
    <CheckboxGroup
      v-model:checked="checkedData"
      class="min-w-100px"
      :options="item?.componentProps?.options"
    />
  </template>

  <!-- 时间类 -->
  <template v-if="item.component === 'DatePicker'">
    <DatePicker
      v-model:value="dateData"
      class="min-w-100px"
      :picker="item?.componentProps?.picker"
    />
  </template>
  
  <template v-if="item.component === 'RangePicker'">
    <RangePicker
      v-model:value="dateRangeData"
      class="min-w-100px"
      :picker="item?.componentProps?.picker"
      :show-time="!!item?.componentProps?.showTime"
    />
  </template>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import type { PropType } from 'vue'
import type { IFormList } from '@/types/form'
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
  RangePicker,
} from 'ant-design-vue'
import type { Dayjs } from 'dayjs'

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<IFormList>,
      required: true
    },
    value: {
      type: [String, Number],
      required: false
    },
    dateValue: {
      type: String as PropType<string | Dayjs>,
      required: false
    },
    dateRangeValue: {
      type: Object as PropType<[string, string] | [Dayjs, Dayjs]>,
      required: false
    },
    checkedValue: {
      type: Boolean,
      required: false
    },
  },
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
  setup(props, context) {
    // 基础值
    const valueData = ref(props.value)
    // 时间值
    const dateData = ref(props.dateValue)
    // 时间区间值
    const dateRangeData = ref(props.dateRangeValue)
    // 勾选区间值
    const checkedData = ref(props.checkedValue)

    // 监听基础值
    watch(valueData, value => {
      context.emit('update:value', value)
    })

    // 监听时间值
    watch(dateData, value => {
      context.emit('update:dateValue', value)
    })

    // 监听时间区间值
    watch(dateRangeData, value => {
      context.emit('update:dateRangeValue', value)
    })

    // 监听时间区间值
    watch(checkedData, value => {
      context.emit('update:checkedValue', value)
    })

    return {
      valueData,
      dateData,
      dateRangeData,
      checkedData
    }
  },
})
</script>
