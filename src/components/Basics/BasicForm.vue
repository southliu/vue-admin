<template>
  <div>
    <Form
      ref="formRef"
      scrollToFirstError
      :layout="type === 'search' ? 'inline' : 'horizontal'"
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

      <FormItem v-if="isSearch">
        <Button
          type="primary"
          html-type="submit"
          :loading="loading"
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
          :loading="loading"
          @click="onCreate"
        >
          <template #icon>
            <PlusOutlined />
          </template>
          <span>新增</span>
        </Button>
      </FormItem>

      <slot name="otherBtn"></slot>
    </Form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { Form, FormItem, Button } from 'ant-design-vue'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { useDebounceFn } from '@vueuse/core'
import type { PropType } from 'vue'
import type { FormInstance } from 'ant-design-vue'
import type { IFormData, IFormList } from '@/types/form'
import type { ColProps } from 'ant-design-vue'
import type { ValidateErrorEntity } from 'ant-design-vue/lib/form/interface'
import BasicComponents from './BasicComponents.vue';

type IFinishFun = (values: IFormData) => void

export default defineComponent({
  name: 'BasicForm',
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
    type: {
      type: String as PropType<'create' | 'search'>,
      required: true
    },
    labelCol: {
      type: Object as PropType<Partial<ColProps>>,
      required: false,
      default: () => {
        return { span: 6 }
      }
    },
    wrapperCol: {
      type: Object as PropType<Partial<ColProps>>,
      required: false,
      default: () => {
        return { span: 18 }
      }
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

    /** 外部调内部提交方法 */
    const handleSubmit = useDebounceFn(() => {
      formRef.value && formRef.value
        .validateFields()
        .then(values => {
          context.emit('handleFinish', values)
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
      context.emit('handleFinish', values)
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
      onCreate,
      onFinish,
      onFinishFailed,
      handleReset,
      handleSubmit,
    };
  }
})
</script>
