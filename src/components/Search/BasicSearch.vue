<template>
  <div id="searches" class="bg-white pt-4 pb-1 px-5">
    <Form
      ref="formRef"
      labelAlign="left"
      scrollToFirstError
      layout="inline"
      :model="formState"
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
        :label-col="{ style: { width: `${ item.labelCol }px` } }"
        :wrapper-col="{ style: { width: `${ item.wrapperCol }px` } }"
      >
        <BasicComponents
          :item="item"
          class="min-w-100px"
          v-model:value="formState[item.key]"
        />
      </FormItem>

      <FormItem v-if="isSearch">
        <Button
          type="primary"
          html-type="submit"
          :loading="globalLoading || loading"
        >
          <template #icon>
            <SearchOutlined />
          </template>
          <span>搜索</span>
        </Button>
      </FormItem>

      <FormItem v-if="isCreate">
        <Button
          v-if="isCreate"
          type="primary"
          :loading="globalLoading || loading"
          @click="onCreate"
        >
          <template #icon>
            <PlusOutlined />
          </template>
          <span>新增</span>
        </Button>
      </FormItem>

      <slot name="other"></slot>
    </Form>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import type { FormInstance } from 'ant-design-vue'
import type { IFormData, IFormList } from '@/types/form'
import type { ColProps } from 'ant-design-vue'
import type { ValidateErrorEntity } from 'ant-design-vue/lib/form/interface'
import { defineComponent, reactive, ref } from 'vue'
import { Form, FormItem, Button } from 'ant-design-vue'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { useDebounceFn } from '@vueuse/core'
import { useLoadingStore } from '@/stores/loading'
import { storeToRefs } from 'pinia'
import BasicComponents from '../Form/BasicComponents.vue'
import { filterEmptyValue } from '@/utils/utils'

type IFinishFun = (values: IFormData) => void

export default defineComponent({
  name: 'BasicSearch',
  emits: ['handleFinish', 'onCreate'],
  props: {
    data: {
      type: Object,
      required: true
    },
    list: {
      type: Array as PropType<IFormList[]>,
      required: true
    },
    wrapperCol: {
      type: Object as PropType<Partial<ColProps>>,
      required: false,
    },
    loading: {
      type: Boolean
    },
    isSearch: {
      type: Boolean
    },
    isCreate: {
      type: Boolean
    }
  },
  components: {
    SearchOutlined,
    PlusOutlined,
    BasicComponents,
    Form,
    FormItem,
    Button
  },
  setup(props, context) {
    const formRef = ref<FormInstance>()
    const formState = reactive(props.data)
    const loadingStore = useLoadingStore()
    const { globalLoading } = storeToRefs(loadingStore)

    /** 外部调内部提交方法 */
    const handleSubmit = useDebounceFn(() => {
      formRef.value
        ?.validateFields()
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

    /** 点击新增 */
    const onCreate = () => {
      context.emit('onCreate')
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
      globalLoading,
      formRef,
      formState,
      onCreate,
      onFinish,
      onFinishFailed,
      handleReset,
      handleSubmit,
    };
  }
})
</script>

<style>
#searches .ant-form-inline .ant-form-item {
  padding-bottom: 4px !important;
}
</style>