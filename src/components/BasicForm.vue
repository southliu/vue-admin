<template>
  <div>
    <Form
      name="basic"
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
        <template v-if="item.type === 'customize'">
          <slot name="customize"></slot>
        </template>

        <!-- 输入框 -->
        <template v-if="item.type === 'string'">
          <Input
            v-model:value="formState[item.key]"
            class="min-w-100px"
            placeholder="请输入"
            :allow-clear="!item.isNotClear"
          />
        </template>
    
        <template v-if="item.type === 'number'">
          <InputNumber
            v-model:value="formState[item.key]"
            class="min-w-100px"
            placeholder="请输入"
          />
        </template>
    
        <template v-if="item.type === 'text'">
          <Textarea
            v-model:value="formState[item.key]"
            class="min-w-100px"
            placeholder="请输入"
          />
        </template>

        <!-- 下拉框 -->
        <template v-if="item.type === 'select'">
          <Select
            v-model:value="formState[item.key]"
            class="min-w-100px"
            placeholder="请选择"
            :options="item.selectList"
            :loading="item.isSelectLoading"
            :allow-clear="!item.isNotClear"
            :multiple="!!item.isMultiple"
            @change="item.handleSelectChange"
          />
        </template>
        
        <template v-if="item.type === 'treeSelect'">
          <TreeSelect
            v-model:value="formState[item.key]"
            class="min-w-100px"
            placeholder="请选择"
            :options="item.selectList"
            :loading="item.isSelectLoading"
            :allow-clear="!item.isNotClear"
            :multiple="!!item.isMultiple"
            @change="item.handleSelectChange"
          />
        </template>

        <!-- 单选框 -->
        <template v-if="item.type === 'radio'">
          <RadioGroup
            v-model:checked="formState[item.key]"
            class="min-w-100px"
            :options="item.radioList"
          />
        </template>

        <template v-if="item.type === 'switch'">
          <Switch
            v-model:checked="formState[item.key]"
            class="min-w-100px"
          />
        </template>

        <!-- 复选框 -->
        <template v-if="item.type === 'checkbox'">
          <Checkbox
            v-model:checked="formState[item.key]"
            class="min-w-100px"
          >
            {{ item.checkboxName || '' }}
          </Checkbox>
        </template>

        <template v-if="item.type === 'checkboxGroup'">
          <CheckboxGroup
            v-model:checked="formState[item.key]"
            class="min-w-100px"
            :options="item.checkboxList"
          />
        </template>

        <!-- 时间类 -->
        <template v-if="item.type === 'date'">
          <DatePicker
            v-model:value="formState[item.key]"
            class="min-w-100px"
            :picker="item.datePicker"
          />
        </template>
        
        <template v-if="item.type === 'dateRange'">
          <RangePicker
            v-model:value="formState[item.key]"
            class="min-w-100px"
            :picker="item.datePicker"
            :show-time="!!item.isShowTime"
          />
        </template>
      </FormItem>

      <FormItem v-if="list.length > 0">
        <Button
          type="primary"
          html-type="submit"
        >
          <template #icon>
            <SearchOutlined />
          </template>
          <span>搜索</span>
        </Button>
        <slot name="otherBtn"></slot>
      </FormItem>
    </Form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import type { PropType } from 'vue'
import {
  Form,
  FormItem,
  Input,
  InputNumber,
  Textarea,
  Select,
  TreeSelect,
  Button,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  Switch,
  DatePicker,
  RangePicker
} from 'ant-design-vue'
import { SearchOutlined } from '@ant-design/icons-vue'
import type { IFormData, IFormList } from '@/types/form';
import type { ValidateErrorEntity } from 'ant-design-vue/lib/form/interface';
import { IFromCol } from '@/types/form';

type IFinish = (values: IFormData) => void

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
      type: Object as PropType<Partial<IFromCol>>,
      required: false,
      default: () => {
        return { span: 6 }
      }
    },
    wrapperCol: {
      type: Object as PropType<Partial<IFromCol>>,
      required: false,
      default: () => {
        return { span: 18 }
      }
    },
    handleFinish: {
      type: Function as PropType<IFinish>
    }
  },
  components: {
    SearchOutlined,
    Form,
    FormItem,
    Input,
    InputNumber,
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
    const formState = reactive(props.data)

    // 提交处理
    const onFinish: IFinish = values => {
      console.log('Success:', values);
    };

    // 错误处理
    const onFinishFailed = (errorInfo: ValidateErrorEntity<string>) => {
      console.log('错误信息:', errorInfo);
    };

    return {
      formState,
      onFinish,
      onFinishFailed,
    };
  }
})
</script>
