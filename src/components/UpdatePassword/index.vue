<template>
  <BasicModal
    :visible="visible"
    title="修改密码"
    :width="450"
    :loading="loading"
    @handleCancel="handleCancel"
    @handleFinish="onFinish"
  >
    <Form
      ref="formRef"
      :model="formState"
      name="horizontal_login"
      autocomplete="on"
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
        <InputPassword v-model:value="formState.oldPassword" placeholder="请输入" />
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
        <InputPassword v-model:value="formState.confirmPassword" placeholder="请输入" />
      </FormItem>
    </Form>
  </BasicModal>
</template>

<script lang="ts" setup>
/**
 * @description: 修改密码组件
 */
import type { FormInstance } from 'ant-design-vue'
import { defineProps, reactive, ref } from 'vue'
import { Form, FormItem, InputPassword, message } from 'ant-design-vue'
import { PASSWORD_RULE } from '@/utils/config'
import { useDebounceFn } from '@vueuse/core'
import BasicModal from '../Modal/BasicModal.vue'
import PasswordStrength from '../PasswordStrength/index.vue'

interface IFormData {
  oldPassword: string,
  newPassword: string,
  confirmPassword: string
}

const emit = defineEmits(['handleCancel', 'handleSubmit'])

defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  loading: {
    type: Boolean,
    required: true
  }
})

const formRef = ref<FormInstance>()

// 表单数据
const formState = reactive<IFormData>({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

/** 关闭弹窗 */
const handleCancel = () => {
  emit('handleCancel')
}

/** 点击确认 */
const onFinish = useDebounceFn(() => {
  formRef.value
    ?.validateFields()
    .then(values => {
      // 密码不一致不通过
      if (values.newPassword !== values.confirmPassword) {
        return message.warning({ content: '重复密码不一致', key: 'password' })
      }

      emit('handleSubmit', values)
      console.log('修改密码：', values)
    })
})
</script>
