<template>
  <div class="flex items-center text-dark-50">
    <span class="mr-14px flex items-center">
      <Icon class="icon text-20px p-2px mr-5px" icon="ant-design:enter-outlined" />
      <span>确认</span>
    </span>
    <span class="mr-14px flex items-center">
      <Icon class="icon text-20px p-2px mr-5px" icon="mdi-arrow-up-thin" />
      <Icon class="icon text-20px p-2px mr-5px" icon="mdi-arrow-down-thin" />
      <span>切换</span>
    </span>
    <span class="flex items-center">
      <Icon class="icon text-20px p-2px mr-5px" icon="mdi:keyboard-esc" />
      <span>关闭</span>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '@/components/Icon/index.vue'

export default defineComponent({
  name: 'SearchFooter',
  components: {
    Icon
  }
})
</script>

<style lang="less" scoped>
.icon {
  box-shadow: inset 0 -2px #cdcde6, inset 0 0 1px 1px #fff, 0 1px 2px 1px #1e235a66;
}
</style>
