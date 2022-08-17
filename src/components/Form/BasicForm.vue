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
        :name="item.key"
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

<script lang="ts">
import type { PropType } from 'vue'
import type { FormInstance } from 'ant-design-vue'
import type { IFormData, IFormList } from '#/form'
import type { IAllDataType } from "#/public"
import type { ColProps } from 'ant-design-vue'
import type { ValidateErrorEntity } from 'ant-design-vue/lib/form/interface'
import { defineComponent, ref, watch } from 'vue'
import { Form, FormItem } from 'ant-design-vue'
import { useDebounceFn } from '@vueuse/core'
import { filterEmptyValue } from '@/utils/utils'

type IFinishFun = (values: IFormData) => void

export default defineComponent({
  name: 'BasicForm',
  emits: ['handleFinish'],
  props: {
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
  },
  components: {
    Form,
    FormItem
  },
  setup(props, context) {
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
          context.emit('handleFinish', params)
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
     * 修改formState值
     * @param key - 键值
     * @param value - 修改值
     */
    const setFromState = (key: string, value: IAllDataType) => {
      formState.value[key] = value
    }

    /**
     * 提交处理
     * @param values - 表单数据
     */
    const onFinish: IFinishFun = useDebounceFn(values => {
      const params = filterEmptyValue(values)
      context.emit('handleFinish', params)
    })

    /**
     * 错误处理
     * @param errorInfo - 错误信息
     */
    const onFinishFailed = (errorInfo: ValidateErrorEntity<string>) => {
      console.log('错误信息:', errorInfo)
    }

    return {
      formRef,
      formState,
      setFromState,
      onFinish,
      onFinishFailed,
      handleSubmit,
      handleReset
    }
  }
})
</script>
