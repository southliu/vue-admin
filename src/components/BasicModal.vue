<template>
  <Modal
    :visible="visible"
    :title="title"
    :width="width"
    :layout="layout"
    :mask-closable="false"
    @cancel="handleCancel"
  >
    <slot></slot>
    <template #footer>
      <Button @click="handleCancel">取消</Button>
      <Button
        v-if="isPermission"
        type="primary"
        @click="handleFinish"
      >
        确认
      </Button>
    </template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { Modal, Button } from 'ant-design-vue'

type IFunction = (e: MouseEvent) => void

export default defineComponent({
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
    handleCancel: {
      type: Function as PropType<IFunction>,
      required: true
    },
    handleFinish: {
      type: Function as PropType<IFunction>,
      required: true
    }
  },
  components: {
    Modal,
    Button
  },
  setup() {
  }
})
</script>
