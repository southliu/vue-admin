<template>
  <div class="bg-white pt-6 px-5">
    <a-form
      layout="inline"
      name="basic"
      :model="formState"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="用户名"
        name="username"
      >
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item
        label="名字"
        name="name"
      >
        <a-input v-model:value="formState.name" />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit">搜索</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

interface FormState {
  username: string;
  name: string;
}
export default defineComponent({
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