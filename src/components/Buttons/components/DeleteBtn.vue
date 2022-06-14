<template>
  <Button
    type="primary"
    danger
    :loading="globalLoading"
    @click="onClick"
  >
    删除
  </Button>
</template>

<script lang="ts">
import { defineComponent, createVNode } from 'vue'
import { Button, Modal } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { useLoadingStore } from '@/stores/loading'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'DeleteBtn',
  emits: ['click'],
  components: {
    Button
  },
  setup(props, context) {
    const loadingStore = useLoadingStore()
    const { globalLoading } = storeToRefs(loadingStore)

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
      globalLoading,
      onClick
    }
  },
})
</script>
