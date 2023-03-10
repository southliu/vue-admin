<template>
  <div class='
    bg-white
    fixed
    flex
    justify-end
    left-0
    right-0
    bottom-0
    py-5px
    px-30px
    box-border
    shadow
    shadow-gray-500
  '>
    <Button
      danger
      class="mr-10px"
      @click="goBack"
    >
      返回
    </Button>
    <Button
      type="primary"
      @click="handleSubmit"
    >
      提交
    </Button>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { Button } from 'ant-design-vue'

defineProps({
  isLoading: {
    type: Boolean,
    required: false,
    default: false
  },
  goBack: {
    type: Function as PropType<() => void>,
    required: true
  },
  handleSubmit: {
    type: Function as PropType<() => void>,
    required: true
  }
})
</script>