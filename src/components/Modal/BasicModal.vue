<template>
  <Modal
    :visible="visible"
    :width="width"
    :layout="layout"
    :mask-closable="false"
    @cancel="onCancel"
  >
    <template #title>
      <span class="select-none text-lg">
        {{ title }}
      </span>
    </template>

    <slot></slot>

    <template #footer>
      <Button @click="onCancel">取消</Button>
      <Button
        v-if="isPermission"
        type="primary"
        @click="onFinish"
      >
        确认
      </Button>
    </template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, nextTick, watch } from 'vue'
import { Modal, Button } from 'ant-design-vue'
import { useModalDragMove } from './hooks/useModalDrag'

export default defineComponent({
  name: 'BasicModal',
  emits: ['handleCancel', 'handleFinish'],
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    width: {
      type: [String, Number],
      default: 520
    },
    layout: {
      type: Object,
      required: false,
      // default: 
    },
    title: {
      type: String,
      required: true
    },
    // 权限控制
    isPermission: {
      type: Boolean,
      default: true
    },
  },
  components: {
    Modal,
    Button
  },
  setup(props, context) {
    /** 点击关闭 */
    const onCancel = () => {
      context.emit('handleCancel')
    }

    /** 点击确认 */
    const onFinish = () => {
      context.emit('handleFinish')
    }

    watch(() => props.visible, async (value) => {
      if (value) {
        await nextTick()
        useModalDragMove()
      }
    })

    return {
      onCancel,
      onFinish
    }
  }
})
</script>
