<template>
  <Modal
    v-model:visible="visible"
    :title="type === 'create' ? '新增' : `编辑${name ? `(${name})` : ''}`"
    @ok="handleFinish"
  >
    <slot></slot>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { Modal } from 'ant-design-vue'

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    type: {
      type: String as PropType<'create' | 'update'>,
      required: true
    },
    name: {
      type: String,
      required: false
    },
    handleFinish: {
      type: Function as PropType<(e: MouseEvent) => void>,
      required: true
    }
  },
  components: {
    Modal
  },
  setup() {
  },
})
</script>
