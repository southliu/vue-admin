<template>
  <div class="bg-white pt-6 px-5">
    <Form
      layout="inline"
      name="basic"
      :model="formState"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      
      <!-- <template #[`header-${column.dataIndex}`] v-for="(column, index) in columns" :key="index">
        <HeaderCell :column="column" />
      </template> -->
      <FormItem name="date-picker" label="时间">
        <DatePicker
          v-model:value="formState['date-picker']"
          value-format="YYYY-MM-DD"
        />
      </FormItem>

      <FormItem
        label="用户名"
        name="username"
      >
        <Input
          v-model:value="formState.username"
          :allowClear="true"
        />
      </FormItem>

      <FormItem
        label="名字"
        name="name"
      >
        <Input
          v-model:value="formState.username"
          :allowClear="true"
        />
      </FormItem>

      <FormItem>
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
    Button,
    DatePicker
  } from 'ant-design-vue'

  interface FormState {
    'date-picker': string;
    username: string;
    name: string;
  }
  export default defineComponent({
    props: {
      data: {
        type: Array as PropType<any[]>,
        required: true
      },
      columns: {
        type: Array as PropType<any[]>,
        required: true
      }
    },
    components: {
      Form,
      FormItem,
      Input,
      Button,
      DatePicker
    },
    setup() {
      const formState = reactive<FormState>({
        'date-picker': '',
        username: '',
        name: ''
      });
      
      const onFinish = (values: any) => {
        console.log('Success:', values);
      };

      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
      return {
        formState,
        onFinish,
        onFinishFailed,
      };
    },
  });
</script>