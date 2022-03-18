<template>
  <BasicModal
    :visible="visible"
    title="修改密码"
    @handleCancel="toggle"
    @handleFinish="onFinish"
  >
    <BasicForm
      ref="formRef"
      type="create"
      :list="formData.list"
      :data="formData.data"
      @handleFinish="handleSubmit"
    />
  </BasicModal>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import BasicModal from '../Basics/BasicModal.vue'
import BasicForm from '../Basics/BasicForm.vue'
import type { IFormData, IFormList, IFormRule } from '@/types/form'
import { message } from 'ant-design-vue'
import type { IBasicForm } from '../Basics/model'

interface IData {
  data: IFormData;
  rules?: IFormRule[];
  list: IFormList[];
}

export default defineComponent({
  name: 'UpdatePassword',
  emits: ['handleCancel'],
  components: {
    BasicModal,
    BasicForm
  },
  setup(props, context) {
    const formRef = ref<IBasicForm>()
    const visible = ref(false)

    // 表单数据
    const formData = reactive<IData>({
      data: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
      list: [
        {
          title: '旧密码',
          key: 'oldPassword',
          component: 'Input',
          rules: [{
            required: true,
            message: '请输入旧密码'  
          }]
        },
        {
          title: '新密码',
          key: 'newPassword',
          component: 'Input',
          rules: [{
            required: true,
            message: '请输入新密码'  
          }]
        },
        {
          title: '重复密码',
          key: 'confirmPassword',
          component: 'Input',
          rules: [{
            required: true,
            message: '请输入重复密码'  
          }]
        },
      ]
    })

    /** 外部调内部切换开关方法 */
    const toggle = () => {
      visible.value = !visible.value
    }

    /** 点击确认 */
    const onFinish = () => {
      formRef.value?.handleSubmit()
    }

    /**
     * 提交表单
     * @param values - 表单数据
     */
    const handleSubmit = (values: IFormData) => {
      // 密码不一致不通过
      if (values.newPassword !== values.confirmPassword) {
        return message.warning({ content: '重复密码不一致!', key: 'password' })
      }

      console.log('修改密码：', values)
    }

    return {
      visible,
      formRef,
      formData,
      toggle,
      onFinish,
      handleSubmit
    }
  },
})
</script>
