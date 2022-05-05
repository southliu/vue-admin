<template>
  <Button
    type="primary"
    @click="onClick"
  >
    <template #icon>
      <Icon class="w-1rem h-1rem" icon="ant-design:copy-outlined" />
    </template>
    {{ text }}
  </Button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Button } from 'ant-design-vue'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import Icon from '@/components/Icon/index.vue'

export default defineComponent({
  name: 'CopyBtn',
  components: {
    Button,
    Icon
  },
  props: {
    text: {
      type: String
    },
    value: {
      type: String,
      required: true
    }
  },
  setup(props) {
    /** 点击编辑 */
    const onClick = () => {
      useCopyToClipboard(props.value)
    }

    return {
      onClick
    }
  },
})
</script>
