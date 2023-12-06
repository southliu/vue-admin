<template>
  <BasicModal
    :isOpen="isOpen"
    title="修改密码"
    :width="450"
    :isLoading="isLoading"
    @handleCancel="handleCancel"
    @handleFinish="onFinish"
  >
    <Form
      ref="formRef"
      :model="formState"
      name="horizontal_login"
      :labelCol="{ span: 5 }"
      :wrapper-col="{ span: 19 }"
    >
      <FormItem
        name="oldPassword"
        label="旧密码"
        :rules="[
          { required: true, message: '请输入旧密码' },
          PASSWORD_RULE
        ]"
      >
        <InputPassword
          v-model:value="formState.oldPassword"
          placeholder="请输入"
          allowClear
          autoComplete="current-password"
          @pressEnter="onFinish"
        />
      </FormItem>

      <FormItem
        name="newPassword"
        label="新密码"
        :rules="[
          { required: true, message: '请输入新密码' },
          PASSWORD_RULE
        ]"
      >
        <PasswordStrength
          v-model:value="formState.newPassword"
          autoComplete="new-password"
          allowClear
          @pressEnter="onFinish"
        />
      </FormItem>

      <FormItem
        name="confirmPassword"
        label="重复密码"
        :rules="[
          { required: true, message: '请输入重复密码' },
          PASSWORD_RULE
        ]"
      >
        <InputPassword
          v-model:value="formState.confirmPassword"
          placeholder="请输入"
          allowClear
          autoComplete="confirm-password"
          @pressEnter="onFinish"
        />
      </FormItem>
    </Form>
  </BasicModal>
</template>

<script lang="ts" setup>
/**
 * @description: 修改密码组件
 */
import type { FormInstance } from 'ant-design-vue';
import type { FormData } from '#/form';
import { ref } from 'vue';
import { Form, FormItem, InputPassword, message } from 'ant-design-vue';
import { PASSWORD_RULE } from '@/utils/verify';
import { useDebounceFn } from '@vueuse/core';
import BasicModal from '../Modal/BasicModal.vue';
import PasswordStrength from '../PasswordStrength/index.vue';

interface CurrentFormData {
  oldPassword: string,
  newPassword: string,
  confirmPassword: string
}

interface DefineEmits {
  (e: 'handleCancel'): void;
  (e: 'handleSubmit', value: FormData): void;
}

const emit = defineEmits<DefineEmits>();

interface DefineProps {
  isLoading?: boolean;
  isOpen: boolean;
}

withDefaults(defineProps<DefineProps>(), {
  isLoading: false,
});

const formRef = ref<FormInstance>();

const initFormState = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
};

// 表单数据
const formState = ref<CurrentFormData>({ ...initFormState });

/** 关闭弹窗 */
const handleCancel = () => {
  emit('handleCancel');
};

/** 点击确认 */
const onFinish = useDebounceFn(() => {
  formRef.value
    ?.validateFields()
    .then(values => {
      // 密码不一致不通过
      if (values.newPassword !== values.confirmPassword) {
        return message.warning({ content: '重复密码不一致', key: 'password' });
      }

      emit('handleSubmit', values);
    });
});

/** 重置数据 */
const handleInit = () => {
  formState.value = { ...initFormState };
};

defineExpose({
  handleInit
});
</script>
