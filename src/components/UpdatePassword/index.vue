<template>
  <BasicModal
    :visible="visible"
    title="修改密码"
    :width="450"
    @handleCancel="toggle"
    @handleFinish="onFinish"
  >
    <Form
      ref="formRef"
      :model="formState"
      name="horizontal_login"
      autocomplete="on"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 19 }"
    >
      <FormItem
        name="oldPassword"
        label="旧密码"
        :rules="[
          { required: true, message: '请输入旧密码!' },
          passwordRule
        ]"
      >
        <Input v-model:value="formState.oldPassword" placeholder="请输入" />
      </FormItem>

      <FormItem
        name="newPassword"
        label="新密码"
        :rules="[
          { required: true, message: '请输入新密码!' },
          passwordRule
        ]"
      >
        <Input v-model:value="formState.newPassword" placeholder="请输入" />
      </FormItem>

      <FormItem
        name="confirmPassword"
        label="重复密码"
        :rules="[
          { required: true, message: '请输入重复密码!' },
          passwordRule
        ]"
      >
        <Input v-model:value="formState.confirmPassword" placeholder="请输入" />
      </FormItem>
    </Form>
  </BasicModal>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import BasicModal from '../Basics/BasicModal.vue'
import { Form, FormItem, Input, message } from 'ant-design-vue'
import type { FormInstance } from 'ant-design-vue'
import { passwordRule } from '@/utils/config'

interface IFormData {
  oldPassword: string,
  newPassword: string,
  confirmPassword: string
}

export default defineComponent({
  name: 'UpdatePassword',
  emits: ['handleCancel'],
  components: {
    BasicModal,
    Input,
    Form,
    FormItem,
  },
  setup(props, context) {
    const formRef = ref<FormInstance>()
    const visible = ref(false)

    // 表单数据
    const formState = reactive<IFormData>({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    })

    /** 外部调内部切换开关方法 */
    const toggle = () => {
      visible.value = !visible.value
    }

    /** 点击确认 */
    const onFinish = () => {
      formRef.value
        ?.validateFields()
        .then(values => {
          // 密码不一致不通过
          if (values.newPassword !== values.confirmPassword) {
            return message.warning({ content: '重复密码不一致!', key: 'password' })
          }

          console.log('修改密码：', values)
        })
    }

    return {
      visible,
      formRef,
      formState,
      passwordRule,
      toggle,
      onFinish
    }
  },
})
</script>
