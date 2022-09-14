<template>
  <Button
    type="primary"
    :loading="isLoading"
    @click="onClick"
  >
    编辑
  </Button>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { Button } from 'ant-design-vue'

const emit = defineEmits(['click'])

defineProps({
  isLoading: {
    type: Boolean,
    required: false,
    default: false
  }
})

/** 点击编辑 */
const onClick = () => {
  emit('click')
}
</script>
