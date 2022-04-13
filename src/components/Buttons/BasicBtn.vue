<template>
  <Button
    type="primary"
    @click="onClick"
  >
    {{ content }}
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
    content: {
      type: String,
      required: true
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
