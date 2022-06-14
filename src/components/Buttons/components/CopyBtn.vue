<template>
  <Button
    type="primary"
    :loading="globalLoading"
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
import { useLoadingStore } from '@/stores/loading'
import { storeToRefs } from 'pinia'
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
    const loadingStore = useLoadingStore()
    const { globalLoading } = storeToRefs(loadingStore)

    /** 点击编辑 */
    const onClick = () => {
      useCopyToClipboard(props.value)
    }

    return {
      globalLoading,
      onClick
    }
  },
})
</script>
