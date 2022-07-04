<template>
  <Button
    type="primary"
    :loading="loading"
    @click="onClick"
  >
    编辑
  </Button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Button } from 'ant-design-vue'

export default defineComponent({
  name: 'UpdateBtn',
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
    /** 点击编辑 */
    const onClick = () => {
      context.emit('click')
    }

    return {
      onClick
    }
  },
})
</script>
