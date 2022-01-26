<template>
  <header class="header flex px-8 box-border">
    <div class="logo">Logo</div>
    <div class="nav">nav</div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    
  }
})
</script>

<style lang="less" scoped>
@import '@/assets/css/default.less';

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: @layout_top;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid gray;
}
</style>