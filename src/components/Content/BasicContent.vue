<template>
  <div class="h-full bg px-2 py-4 box-border ">
    <div id="container" class="h-full bg-white relative overflow-y-auto">
      <div id="top">
        <slot name="top"></slot>
      </div>

      <div id="content" class="pt-6 px-5 overflow-y-auto">
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
