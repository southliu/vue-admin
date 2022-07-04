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

<script lang="ts">
import { defineComponent, createVNode } from 'vue'
import { Button, Modal } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  name: 'DeleteBtn',
  emits: ['click'],
  components: {
    Button
  },
  props: {
    loading: {
      type: Boolean,
      required: false,
      default: false
    }
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
          context.emit('click')
        }
      });
    }

    return {
      onClick
    }
  },
})
</script>
