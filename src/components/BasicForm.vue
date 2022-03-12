<template>
  <div>
    <Form
      ref="formRef"
      :layout="type === 'search' ? 'inline' : 'horizontal'"
      :model="formState"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :scrollToFirstError="true"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <FormItem
        v-for="item in list"
        :key="item.key"
        :name="item.key"
        :label="item.title"
      >
        <!-- 自定义 -->
        <template v-if="item.component === 'customize'">
          <slot name="customize"></slot>
        </template>

        <!-- 输入框 -->
        <template v-if="item.component === 'Input'">
          <Input
            v-model:value="formState[item.key]"
            class="min-w-100px"
            placeholder="请输入"
            :allow-clear="!item?.componentProps?.isNotClear"
          />
        </template>

        <template v-if="item.component === 'InputPassword'">
          <InputPassword
            v-model:value="formState[item.key]"
            class="min-w-100px"
            placeholder="请输入"
            :allow-clear="!item?.componentProps?.isNotClear"
          />
        </template>
    
        <template v-if="item.component === 'InputNumber'">
          <InputNumber
            v-model:value="formState[item.key]"
            class="min-w-100px"
            placeholder="请输入"
          />
        </template>
    
        <template v-if="item.component === 'AutoComplete'">
          <AutoComplete
            v-model:value="formState[item.key]"
            class="min-w-100px"
            placeholder="请输入"
          />
        </template>
    
        <template v-if="item.component === 'Textarea'">
          <Textarea
            v-model:value="formState[item.key]"
            class="min-w-100px"
            placeholder="请输入"
          />
        </template>

        <!-- 下拉框 -->
        <template v-if="item.component === 'Select'">
          <Select
            v-model:value="formState[item.key]"
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
            v-model:value="formState[item.key]"
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
            v-model:checked="formState[item.key]"
            class="min-w-100px"
            :options="item?.componentProps?.options"
          />
        </template>

        <template v-if="item.component === 'Switch'">
          <Switch
            v-model:checked="formState[item.key]"
            class="min-w-100px"
          />
        </template>

        <!-- 复选框 -->
        <template v-if="item.component === 'Checkbox'">
          <Checkbox
            v-model:checked="formState[item.key]"
            class="min-w-100px"
          >
            {{ item?.componentProps?.name || '' }}
          </Checkbox>
        </template>

        <template v-if="item.component === 'CheckboxGroup'">
          <CheckboxGroup
            v-model:checked="formState[item.key]"
            class="min-w-100px"
            :options="item?.componentProps?.options"
          />
        </template>

        <!-- 时间类 -->
        <template v-if="item.component === 'DatePicker'">
          <DatePicker
            v-model:value="formState[item.key]"
            class="min-w-100px"
            :picker="item?.componentProps?.picker"
          />
        </template>
        
        <template v-if="item.component === 'RangePicker'">
          <RangePicker
            v-model:value="formState[item.key]"
            class="min-w-100px"
            :picker="item?.componentProps?.picker"
            :show-time="!!item?.componentProps?.showTime"
          />
        </template>
      </FormItem>

      <FormItem v-if="isSearch">
        <Button
          type="primary"
          html-type="submit"
          :loading="isLoading"
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
          :loading="isLoading"
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
import type { PropType } from 'vue'
import {
  Form,
  FormItem,
  Input,
  InputNumber,
  InputPassword,
  AutoComplete,
  Textarea,
  Select,
  TreeSelect,
  Button,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  Switch,
  DatePicker,
  RangePicker,
} from 'ant-design-vue'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons-vue'
import type { FormInstance } from 'ant-design-vue'
import type { IFormData, IFormList } from '@/types/form';
import type { ColProps } from 'ant-design-vue';
import type { ValidateErrorEntity } from 'ant-design-vue/lib/form/interface';

type ICreateFun = (event: MouseEvent) => void
type IFinishFun = (values: IFormData) => void

export type IBasicForm = {
  handleReset: () => void;
  handleSubmit: () => void;
}

export default defineComponent({
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
    isLoading: {
      type: Boolean
    },
    isSearch: {
      type: Boolean
    },
    isCreate: {
      type: Boolean
    },
    onCreate: {
      type: Function as PropType<ICreateFun>
    },
    handleFinish: {
      type: Function as PropType<IFinishFun>
    }
  },
  components: {
    SearchOutlined,
    PlusOutlined,
    Form,
    FormItem,
    Input,
    InputNumber,
    InputPassword,
    AutoComplete,
    Textarea,
    Button,
    Select,
    TreeSelect,
    Checkbox,
    CheckboxGroup,
    RadioGroup,
    Switch,
    DatePicker,
    RangePicker
  },
  setup(props) {
    const formRef = ref<FormInstance>()
    const formState = reactive(props.data)

    // 外部调内部提交方法
    const handleSubmit = () => {
      formRef.value && formRef.value
        .validateFields()
        .then(values => {
          const { handleFinish } = props
          handleFinish && handleFinish(values)
        })
        .catch(info => {
          console.log('错误信息:', info);
        });
    }

    // 外部调内部重置方法
    const handleReset = () => {
      formRef.value?.resetFields();
    }

    // 提交处理
    const onFinish: IFinishFun = values => {
      const { handleFinish } = props
      handleFinish && handleFinish(values)
    };

    // 错误处理
    const onFinishFailed = (errorInfo: ValidateErrorEntity<string>) => {
      console.log('错误信息:', errorInfo);
    };

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
