<template>
  <Button
    type="primary"
    :loading="globalLoading"
    @click="onClick"
  >
    编辑
  </Button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Button } from 'ant-design-vue'
import { useLoadingStore } from '@/stores/loading'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'UpdateBtn',
  emits: ['click'],
  components: {
    Button
  },
  setup(props, context) {
    const loadingStore = useLoadingStore()
    const { globalLoading } = storeToRefs(loadingStore)

    /** 点击编辑 */
    const onClick = () => {
      context.emit('click')
    }

    return {
      globalLoading,
      onClick
    }
  },
})
</script>
