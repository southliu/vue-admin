<template>
  <div class="h-full bg px-2 py-3 box-border">
    <div id="container" class="h-full bg-white relative overflow-auto">
      <div id="top">
        <slot name="top"></slot>
      </div>

      <div id="content" class="p-5 overflow-auto">
        <slot></slot>
      </div>

      <div id="footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '@/assets/css/default.less';

.bg {
  background-color: @bg;
}
</style>
