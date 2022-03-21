<template>
  <!-- 自定义 -->
  <template v-if="item.component === 'customize'">
    <slot name="customize"></slot>
  </template>

  <!-- 图片 -->
  <template v-if="item.component === 'customize'">
    <Image 
      :src="item?.componentProps?.src"
      :width="item?.componentProps?.width"
      :alt="item?.componentProps?.alt || '图片'"
    />
  </template>

  <!-- 输入框 -->
  <template v-if="item.component === 'Input'">
    <Input
      :value="formData[item.key]"
      class="min-w-100px"
      placeholder="请输入"
      :allow-clear="!item?.componentProps?.isNotClear"
    />
  </template>

  <template v-if="item.component === 'InputPassword'">
    <InputPassword
      :value="formData[item.key]"
      class="min-w-100px"
      placeholder="请输入"
      :allow-clear="!item?.componentProps?.isNotClear"
    />
  </template>

  <template v-if="item.component === 'InputNumber'">
    <InputNumber
      :value="formData[item.key]"
      class="min-w-100px"
      placeholder="请输入"
    />
  </template>

  <template v-if="item.component === 'AutoComplete'">
    <AutoComplete
      :value="formData[item.key]"
      class="min-w-100px"
      placeholder="请输入"
    />
  </template>

  <template v-if="item.component === 'Textarea'">
    <Textarea
      :value="formData[item.key]"
      class="min-w-100px"
      placeholder="请输入"
    />
  </template>

  <!-- 下拉框 -->
  <template v-if="item.component === 'Select'">
    <Select
      :value="formData[item.key]"
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
      :value="formData[item.key]"
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
      :checked="formData[item.key]"
      class="min-w-100px"
      :options="item?.componentProps?.options"
    />
  </template>

  <template v-if="item.component === 'Switch'">
    <Switch
      :checked="formData[item.key]"
      class="min-w-100px"
    />
  </template>

  <!-- 复选框 -->
  <template v-if="item.component === 'Checkbox'">
    <Checkbox
      :checked="formData[item.key]"
      class="min-w-100px"
    >
      {{ item?.componentProps?.name || '' }}
    </Checkbox>
  </template>

  <template v-if="item.component === 'CheckboxGroup'">
    <CheckboxGroup
      :checked="formData[item.key]"
      class="min-w-100px"
      :options="item?.componentProps?.options"
    />
  </template>

  <!-- 时间类 -->
  <template v-if="item.component === 'DatePicker'">
    <DatePicker
      :value="formData[item.key]"
      class="min-w-100px"
      :picker="item?.componentProps?.picker"
    />
  </template>
  
  <template v-if="item.component === 'RangePicker'">
    <RangePicker
      :value="formData[item.key]"
      class="min-w-100px"
      :picker="item?.componentProps?.picker"
      :show-time="!!item?.componentProps?.showTime"
    />
  </template>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
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
  Image
} from 'ant-design-vue'

export default defineComponent({
  name: 'BasicComponents',
  props: {
    item: {
      type: Object as PropType<IFormList>,
      required: true
    },
    formData: {
      type: Object,
      required: true
    }
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
    RangePicker,
    Image
  },
  setup(props) {
    const formData = ref(props.formData)

    return {
      formData
    }
  },
})
</script>
