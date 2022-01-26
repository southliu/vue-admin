<template>
  <nav class="menu box-border">
    Menu
  </nav>
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

.menu {
  position: fixed;
  top: @layout_top;
  bottom: 0;
  width: @layout_left;
  border-right: 1px solid gray;
}
</style>