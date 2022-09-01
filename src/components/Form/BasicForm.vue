<template>
  <div>
    <Form
      ref="formRef"
      scrollToFirstError
      :layout="layout"
      :model="formState"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :labelAlign="labelAlign"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <FormItem
        v-for="item in list"
        :key="item.key"
        :name="handleFormName(item.key)"
        :label="item.title"
        :rules="!item.hidden ? item.rules : []"
        :class="{ '!hidden': item.hidden }"
      >
        <BasicComponents
          class="min-w-100px"
          :item="item"
          :data="formState"
          :setData="setFromState"
        />
      </FormItem>

      <slot name="otherBtn"></slot>
    </Form>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { FormInstance } from 'ant-design-vue'
import type { IFormData, IFormList } from '#/form'
import type { IAllDataType } from "#/public"
import type { ColProps } from 'ant-design-vue'
import type { ValidateErrorEntity } from 'ant-design-vue/lib/form/interface'
import { defineProps, defineEmits, defineExpose, ref, watch } from 'vue'
import { Form, FormItem } from 'ant-design-vue'
import { useDebounceFn } from '@vueuse/core'
import { filterEmptyValue } from '@/utils/utils'

type IFinishFun = (values: IFormData) => void

const emit = defineEmits(['handleFinish'])

const props = defineProps({
  data: {
    type: Object as PropType<Record<string, IAllDataType>>,
    required: true
  },
  list: {
    type: Array as PropType<IFormList[]>,
    required: true
  },
  layout: {
    type: String as PropType<'inline' | 'horizontal'>,
    required: false,
    default: 'horizontal'
  },
  labelCol: {
    type: Object as PropType<Partial<ColProps>>,
    required: false,
    default: () => {
      return { span: 5 }
    }
  },
  wrapperCol: {
    type: Object as PropType<Partial<ColProps>>,
    required: false,
    default: () => {
      return { span: 16 }
    }
  },
  labelAlign: {
    type: String as PropType<'left' | 'right'>,
    required: false,
    default: 'right'
  },
  loading: {
    type: Boolean
  },
})

const formRef = ref<FormInstance>()
const data = JSON.parse(JSON.stringify(props.data))
const formState = ref<Record<string, IAllDataType>>(data)

// 监听表单数据变化
watch(() => props.data, value => {
  formState.value = value
  // 清除表单验证结果
  formRef.value?.clearValidate()
})

/** 外部调内部提交方法 */
const handleSubmit = useDebounceFn(() => {
  formRef.value
    ?.validateFields()
    .then(values => {
      const params = filterEmptyValue(values)
      emit('handleFinish', params)
    })
    .catch(info => {
      console.log('错误信息:', info)
    })
})

/** 外部调内部重置方法 */
const handleReset = () => {
  formRef.value?.resetFields()
  formRef.value?.clearValidate()
}

/**
 * 处理嵌套数据
 * @param arr - 键值数组
 * @param obj - 表单数据对象
 * @param value - 修改值
 */
const deepNested = (arr: string[], obj: Record<string, IAllDataType>, value: IAllDataType) => {
  const key = arr.shift()?.trim()
  if (!obj) obj = {}
  if (key) {
    if (!obj[key]) obj[key] = {}
    if (arr.length) {
      obj[key] = deepNested(arr, obj[key] as Record<string, IAllDataType>, value)
    } else {
      obj[key] = value
    }
  }
  return obj
}

/**
 * 修改formState值
 * @param key - 键值
 * @param value - 修改值
 */
const setFromState = (key: string, value: IAllDataType) => {
  if (key.includes('.')) {
    const arr = key.split('.')
    deepNested(arr, formState.value, value)
  } else {
    formState.value[key?.trim()] = value
  }
}

/**
 * 当表单名称中带有逗号，则分割逗号
 * @param name - 表单名称
 */
const handleFormName = (name: string) => {
  let res: string | string[] = ''
  if (name.includes('.')) {
    const arr = name.split('.')
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i]?.trim()
    }
    res = arr
  } else {
    res = name?.trim()
  }
  return res
}

/**
 * 提交处理
 * @param values - 表单数据
 */
const onFinish: IFinishFun = useDebounceFn(values => {
  const params = filterEmptyValue(values)
  emit('handleFinish', params)
})

/**
 * 错误处理
 * @param errorInfo - 错误信息
 */
const onFinishFailed = (errorInfo: ValidateErrorEntity<string>) => {
  console.log('错误信息:', errorInfo)
}

defineExpose({
  handleSubmit,
  handleReset
})
</script>
