<template>
  <div>
    <Form
      ref="formRef"
      scrollToFirstError
      :layout="layout"
      :model="formState"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <FormItem
        v-for="item in list"
        :key="item.key"
        :name="item.key"
        :label="item.title"
        :rules="item.rules"
      >
        <BasicComponents
          :item="item"
          class="min-w-100px"
          v-model:value="formState[item.key]"
        />
      </FormItem>

      <slot name="otherBtn"></slot>
    </Form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { Form, FormItem, Button } from 'ant-design-vue'
import { useDebounceFn } from '@vueuse/core'
import type { PropType } from 'vue'
import type { FormInstance } from 'ant-design-vue'
import type { IFormData, IFormList } from '@/types/form'
import type { IBasicData } from "@/types/public"
import type { ColProps } from 'ant-design-vue'
import type { ValidateErrorEntity } from 'ant-design-vue/lib/form/interface'
import BasicComponents from './BasicComponents.vue'
import { filterEmptyValue } from '@/utils/utils'

type IFinishFun = (values: IFormData) => void

export default defineComponent({
  name: 'BasicForm',
  emits: ['handleFinish'],
  props: {
    data: {
      type: Object,
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
    loading: {
      type: Boolean
    }
  },
  components: {
    BasicComponents,
    Form,
    FormItem,
    Button
  },
  setup(props, context) {
    const formRef = ref<FormInstance>()
    const data = JSON.parse(JSON.stringify(props.data))
    const formState = reactive<Record<string, IBasicData>>(data)

    /** 外部调内部提交方法 */
    const handleSubmit = useDebounceFn(() => {
      formRef.value && formRef.value
        .validateFields()
        .then(values => {
          const params = filterEmptyValue(values)
          context.emit('handleFinish', params)
        })
        .catch(info => {
          console.log('错误信息:', info);
        });
    })

    /** 外部调内部重置方法 */
    const handleReset = () => {
      formRef.value?.resetFields();
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
      console.log('错误信息:', errorInfo);
    }

    return {
      formRef,
      formState,
      onFinish,
      onFinishFailed,
      handleReset,
      handleSubmit,
    };
  }
})
</script>
