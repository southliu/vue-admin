<template>
  <div id="content" class="h-full bg px-2 py-4 box-border ">
    <div class="h-full bg-white relative overflow-y-auto">
      <slot name="top"></slot>

      <div class="pt-6 px-5 overflow-y-auto">
        <slot></slot>
      </div>

      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '@/assets/css/default.less';

.bg {
  background-color: @bg;
}
</style>
