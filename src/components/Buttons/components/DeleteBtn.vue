<template>
  <Button
    type="primary"
    danger
    :loading="loading"
    @click="onClick"
  >
    删除
  </Button>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, createVNode } from 'vue'
import { Button, Modal } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'

const emit = defineEmits(['click'])

defineProps({
  loading: {
    type: Boolean,
    required: false,
    default: false
  }
})

/** 点击删除 */
const onClick = () => {
  Modal.confirm({
    title: '提示',
    icon: createVNode(ExclamationCircleOutlined),
    content: '确定要删除吗?',
    okText: '确认',
    okType: 'danger',
    cancelText: '取消',
    onOk() {
      emit('click')
    }
  })
}
</script>
