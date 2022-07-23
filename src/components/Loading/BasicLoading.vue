<template>
  <div class="mt-20px text-center">
    <Spin />
    <p>加载中...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Spin } from 'ant-design-vue'

export default defineComponent({
  name: 'BasicLoading',
  components: {
    Spin
  }
})
</script>
