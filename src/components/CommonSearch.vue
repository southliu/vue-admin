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
      <FormItem
        label="用户名"
        name="username"
      >
        <Input v-model:value="formState.username" />
      </FormItem>

      <FormItem
        label="名字"
        name="name"
      >
        <Input v-model:value="formState.name" />
      </FormItem>

      <FormItem>
        <Button type="primary" html-type="submit">搜索</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue'
  import {
    Form,
    FormItem,
    Input,
    Button
  } from 'ant-design-vue'

  interface FormState {
    username: string;
    name: string;
  }
  export default defineComponent({
    components: {
      Form,
      FormItem,
      Input,
      Button
    },
    setup() {
      const formState = reactive<FormState>({
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