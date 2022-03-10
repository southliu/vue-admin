<template>
  <div>
    <Form
      layout="inline"
      name="basic"
      :model="formState"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      
      <FormItem
        v-for="item in list"
        :key="item.key"
        :name="item.key"
        :label="item.title"
      >
        <template v-if="item.type === 'string'">
          <Input v-model:value="formState[item.key]" />
        </template>
    
        <template v-if="item.type === 'number'">
          <InputNumber v-model:value="formState[item.key]" />
        </template>

        <template v-if="item.type === 'select'">
          <Select
            v-model:value="formState[item.key]"
            :options="item.selectList"
          />
        </template>
      </FormItem>

      <FormItem v-if="list.length > 0">
        <Button
          type="primary"
          html-type="submit"
        >
          搜索
        </Button>
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
  Select,
  Button,
  DatePicker
} from 'ant-design-vue'
import type { ISearchData, ISearchList } from '@/types/search';
import type { ValidateErrorEntity } from 'ant-design-vue/lib/form/interface';

export default defineComponent({
  props: {
    data: {
      type: Object,
      required: true
    },
    list: {
      type: Array as PropType<ISearchList[]>,
      required: true
    }
  },
  components: {
    Form,
    FormItem,
    Input,
    InputNumber,
    Button,
    Select,
    DatePicker
  },
  setup(props) {
    const formState = reactive(props.data)

    // 提交处理
    const onFinish = (values: ISearchData) => {
      console.log('Success:', values);
    };

    // 错误处理
    const onFinishFailed = (errorInfo: ValidateErrorEntity<string>) => {
      console.log('Failed:', errorInfo);
    };

    return {
      formState,
      onFinish,
      onFinishFailed,
    };
  }
})
</script>
