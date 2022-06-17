<template>
  <div>Test</div>

  <BasicModal
    v-if="visible"
    v-model:visible="visible"
    title="Test"
    @handleFinish="handleCancel"
    @handleCancel="handleCancel"
  >
    Test
  </BasicModal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BasicModal from '@/components/Modal/BasicModal.vue'

export default defineComponent({
  emits: ['toggle'],
  components: {
    BasicModal
  },
  props: {
    visible: {
      type: Boolean
    }
  },
  setup(props, { emit }) {
    const handleCancel = () => {
      emit('toggle')
    }
    
    return {
      handleCancel
    }
  }
})
</script>