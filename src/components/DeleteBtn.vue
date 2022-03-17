<template>
  <Button
    type="primary"
    danger
    @click="onClick"
  >
    删除
  </Button>
</template>

<script lang="ts">
import { defineComponent, createVNode } from 'vue'
import { Button, Modal } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  name: 'DeleteBtn',
  emits: ['handleDelete'],
  components: {
    Button
  },
  setup(props, context) {
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
          context.emit('handleDelete')
        }
      });
    }

    return {
      onClick
    }
  },
})
</script>
