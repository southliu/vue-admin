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
import { defineComponent, createVNode, PropType } from 'vue'
import { Button, Modal } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  components: {
    Button
  },
  props: {
    handleDelete: {
      type: Function as PropType<() => void>,
      required: true
    }
  },
  setup(props) {
    // 点击删除
    const onClick = () => {
      Modal.confirm({
        title: '提示',
        icon: createVNode(ExclamationCircleOutlined),
        content: '确定要删除吗?',
        okText: '确认',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          props.handleDelete()
        }
      });
    }

    return {
      onClick
    }
  },
})
</script>
